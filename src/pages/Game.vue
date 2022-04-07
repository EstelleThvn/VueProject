<template>
    <div id="game">
        <Header v-on:moviesFilterChange="newQuotePartyOnMoviesFilterChange"/>

        <div class="quote-infos-container">
            <h3 class="quote">"{{this.chosenQuote.dialog}}"</h3>

            <Choices v-show="!showAnswer" :allChosenCharacters="allChosenCharacters" :chosenCharacter="chosenCharacter" :playerClicked.sync="playerClicked" v-on:updateScores="updateScores" v-on:showAnswer="showAnswer=true" />
            <!-- use of v-if instead of v-show for the answer so that we can't see the name of the correct character in the code before answering -->
            <div v-if="showAnswer" class="answer">
                <CharacterCard :characterData="chosenCharacter" />
                <Button @click.native="newQuotePartyOnNextQuote" text="next quote" class="next-btn" />
            </div>

            <Scores :currentScore="currentScore" :highestScore="highestScore" />
        </div>

        <Footer />
    </div>
</template>

<script>
import CharacterCard from '@/components/CharacterCard.vue'
import Choices from '@/components/Choices.vue'
import Scores from '@/components/Scores.vue'
import Button from '@/components/Button.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

import {getAllCharacters, getAllQuotes} from '@/services/api/api.js'

export default {
    name: 'Game',
    components: {
        CharacterCard,
        Button,
        Choices,
        Scores,
        Header,
        Footer,
    },
    watch: {
		currentScore: function(newCurrentScore) {
			localStorage.setItem("currentScore", newCurrentScore)
		},
        highestScore: function(newHighestScore) {
			localStorage.setItem("highestScore", newHighestScore)
		},
	},
    data() {
        return {
            //Data retrieved from the API
            allQuotesData: [],
            allCharactersData: [],

            //Filtered Data
            quotesFilteredData: [],

            //Selected Data for a quote party
            chosenQuote: {},
            chosenCharacter: {},
            OtherRandomCharacters: [],
            allChosenCharacters: [],

            //For styling purposes
            showAnswer: false,
            playerClicked: false,

            //scores
            currentScore: Number(localStorage.getItem("currentScore")) || 0,
            highestScore: Number(localStorage.getItem("highestScore")) || 0,
        }
    },
    created: function() {
        this.firstQuoteParty()
	},
    methods: {
            filterOutMinorCharacterQuotes: function(quotes){
                //filter out quotes said by a minor character
                return quotes.filter((quote) => quote.character != "5cdbe49b7ed9587226e794a0")
            },
            filterByQuoteLength: function(quotes){
                //filter out the quotes that are too short or too long
                return quotes.filter((quote) => quote.dialog.length>20 && quote.dialog.length<100)
            },
            filterByMovieId: function(quotes, movieId){
                // if movieId =  0 we don't filter the data
                return (movieId == 0 ? quotes : quotes.filter((quote) => quote.movie == movieId))
            },
            filterQuotesData(movieId) {
                this.quotesFilteredData = this.filterByMovieId(this.filterByQuoteLength(this.filterOutMinorCharacterQuotes(this.allQuotesData.docs)), movieId)
            },
			async retrieveAllQuotes() {
                this.allQuotesData = await getAllQuotes()
                console.log(this.allQuotesData)
                // console.log('quotesfiltereddata', this.quotesFilteredData)
			},
            async retrieveAllCharacters() {
                this.allCharactersData = await getAllCharacters()
                // console.log(this.allCharactersData)
			},
            async retrieveAllData() {
                await this.retrieveAllQuotes()
                await this.retrieveAllCharacters()
            },
            async firstQuoteParty(){
                await this.retrieveAllData()

                //we need to get the filter from the local storage for the first party
                let moviesFilterFirstParty = (localStorage.getItem("moviesFilter") ? localStorage.getItem("moviesFilter") : "0");
                this.filterQuotesData(moviesFilterFirstParty)
                this.chooseQuoteAndCharacters()
            },
            newQuotePartyOnNextQuote(){
                    this.initChoices()
                    this.chooseQuoteAndCharacters()
            },
            newQuotePartyOnMoviesFilterChange(movieId){
                this.initChoices()
                this.filterQuotesData(movieId)
                // console.log('moviesFilter in game component',this.moviesFilter)
                this.chooseQuoteAndCharacters()
            },
            chooseQuoteAndCharacters(){
                this.chooseQuote()
                this.getchosenCharacter()
                this.chooseRandomCharacters(3)

                this.shuffleAllChosenCharacters()
            },
            //chooses one quote from all the possible quotes
            chooseQuote() {
                console.log('filtered data', this.quotesFilteredData)
                this.chosenQuote = this.quotesFilteredData[Math.floor(Math.random() * this.quotesFilteredData.length)]
                console.log('chosen quote : ', this.chosenQuote)
            },
            getchosenCharacter(){
                //character associated to the chosen quote
                this.chosenCharacter = this.allCharactersData.docs.find(character => character._id === this.chosenQuote.character)
                console.log('chosen character : ', this.chosenCharacter)
            },
            chooseRandomCharacters(numberCharacters) {
                // console.log("filtered quotes",this.quotesFilteredData)
                this.OtherRandomCharacters = [];
                for(let i=0; i< numberCharacters; i++){ 
                    let quote = this.quotesFilteredData[Math.floor(Math.random() * this.quotesFilteredData.length)]
                    let character = this.allCharactersData.docs.find(character => character._id === quote.character)

                    //if the character was already chosen before, we choose another one
                    while(this.chosenCharacter._id == character._id || this.OtherRandomCharacters.find(chara => chara._id === character._id)) {
                        quote = this.quotesFilteredData[Math.floor(Math.random() * this.quotesFilteredData.length)]
                        character = this.allCharactersData.docs.find(character => character._id === quote.character)
                    }

                    this.OtherRandomCharacters.push(character);
                }
                // console.log('not shuffled characters', this.OtherRandomCharacters)
            },
            shuffleAllChosenCharacters(){
                this.allChosenCharacters = [];
                this.allChosenCharacters = this.OtherRandomCharacters
                this.allChosenCharacters.push(this.chosenCharacter)
                //change the order of the choices
                this.allChosenCharacters.sort(() => 0.5 - Math.random());
                console.log('shuffled allChosenCharacters : ', this.allChosenCharacters)
            },
            updateScores(playerHasWon){//true : won , false : lost
                if(playerHasWon){
                    if(this.highestScore==this.currentScore){
                        this.highestScore++
                    }
                    this.currentScore++
                }
                else {
                    this.currentScore = 0
                }
            },
            initChoices(){
                this.showAnswer = false
                //reset style of the choices
                this.playerClicked = false
            },
	},
}
</script>

<style scoped>
#game{
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.quote-infos-container {
    padding: 40px;
    padding-top: 72px;
    flex-grow: 1;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.quote {
    color: var(--tertiary-color);
    text-align: center;
    margin-bottom: 24px;
    font-size: 1.5rem;
    margin-top: 6vh;
}

.answer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top:32px;
}
.answer .next-btn {
    margin-top: 56px;
}

/* ------------- */
/* MEDIA QUERIES */
/* ------------- */
@media (max-width: 991.98px) {
    .scores {
        margin-top:24px;
    }
}
@media (max-width: 767.98px) {
    .quote {
        font-size: 1.25rem;
        margin-bottom: 16px;
    }
    .quote-infos-container{
        padding: 32px;
        padding-top: 64px;
    }
    .choices {
        padding: 0 56px;
    }
}
@media (max-width: 575.98px) {
    .choices {
        padding: 0;
    }

    .answer .next-btn {
        margin-top: 48px;
    }
}
</style>