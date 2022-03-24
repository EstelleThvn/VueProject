<template>
    <div id="game">
        <Header :moviesFilter.sync="moviesFilter" v-on:moviesFilterChange="newQuotePartyOnMoviesFilterChange"/>

        <div class="quote-infos-container">

            <h3 class="quote">"{{this.chosenQuote.dialog}}"</h3>

            <div v-show="!showAnswer" class="choices" ref="choicesContainer" v-bind:class="{unselectableChoices: playerClicked, visible:toggleAnimChoices, invisible:!toggleAnimChoices}">
                <Choice ref="choice" v-for="(character,index) in allChosenCharacters" :key="index" @click.native="revealAnswer(character._id, index)" :characterName="character.name" :characterId="character._id"/>
            </div>
            <!-- use of v-if instead of v-show for the answer so that we can't see the name of the correct character in the code before answering -->
            <div v-if="showAnswer" class="answer" v-bind:class="{visible:toggleAnimAnswer, invisible:!toggleAnimAnswer}">
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
import Choice from '@/components/Choice.vue'
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
        Choice,
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
            chosenQuote: [],
            chosenCharacter: [],
            OtherRandomCharacters: [],
            allChosenCharacters: [],

            //For styling purposes
            showAnswer: false,
            playerClicked: false,
            toggleAnimChoices: true, //true : appearing, false: disappearing
            // toggleAnimAnswer: false, //true : appearing, false: disappearing
            toggleAnimAnswer: true,

            //filters
            moviesFilter: localStorage.getItem("moviesFilter") || "0", //0 -> All movies

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

                this.filterQuotesData(this.moviesFilter)
                this.chooseQuoteAndCharacters()
            },
            newQuotePartyOnNextQuote(){
                // this.toggleAnimAnswer=false
                // setTimeout(()=>{
                    this.initChoices()
                    this.chooseQuoteAndCharacters()
                // },300);
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
            revealAnswer(id, index){
                this.playerClicked = true

                if(id == this.chosenCharacter._id) {
                    //the player has won
                    this.$refs.choice[index].$el.classList.add("winner")

                    this.updateScores(true)
                }
                else {
                    //the player has lost
                    this.$refs.choice[index].$el.classList.add("looser")

                    //give the correct answer the winner class
                    this.$refs.choice.find(el => el.characterId == this.chosenCharacter._id).$el.classList.add("winner")

                    this.updateScores(false)
                }

                // setTimeout(()=>{
                //     this.toggleAnimChoices=false
                // },1000);

                setTimeout(()=>{
                    // hide choices and show info character
                    this.showAnswer=true
                    // setTimeout(()=>{this.toggleAnimAnswer=true},200);
                },1300);
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
            initChoices(){ //reset the choices
                this.showAnswer = false
                //reset style of the choices
                this.playerClicked = false
                this.$refs.choice.forEach(el => {
                    el.$el.classList.remove('winner')
                    el.$el.classList.remove('looser')
                })
                // this.toggleAnimAnswer=false

                // setTimeout(()=>{
                //     this.toggleAnimChoices=true
                // },200);
                
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

.choices {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    padding: 0 80px;
}

.choices.invisible, .answer.invisible{
    transform: translateX(80px);
    opacity: 0;
    transition: 0.2s ease;
}
.choices.visible, .answer.visible{
    transform: translateX(0px);
    opacity: 1;
    transition: 0.2s ease;
}

.unselectableChoices {
    pointer-events: none;
}

.choices .choice-card:first-child {
    margin-top: 0;
}
.choices .choice-card:last-child {
    margin-bottom: 0;
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