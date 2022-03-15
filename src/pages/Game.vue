<template>
    <div id="game">
        <div class="filter-movies">
            <div><p>Quotes from movie:</p></div>
            <div>
                <div class="choice-movie" value="1"><p>1</p></div>
                <div class="choice-movie" value="2"><p>2</p></div>
                <div class="choice-movie" value="3"><p>3</p></div>
                <div class="choice-movie" value="All"><p>All</p></div>

                <!--<select v-model="moviesFilter">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="All">All</option>
                </select>-->
            </div>
        </div>

        <div class="quote-infos-container">
            <h3 class="quote">"{{this.chosenQuote.dialog}}"</h3>

            <div v-if="!showAnswer" class="choices" ref="choicesContainer" v-bind:class="{unselectableChoices: playerClicked}">
                <Choice ref="choice" v-for="(character,index) in allChosenCharacters" :key="character._id" @click.native="revealAnswer(character._id, index)" :characterName="character.name" :characterId="character._id"/>
            </div>
            <div v-else class="answer">
                <CharacterCard :characterData="chosenCharacter" />
                <Button @click.native="nextQuote" text="next quote" class="next-btn" />
            </div>
        </div>
    </div>
</template>

<script>
import CharacterCard from '@/components/CharacterCard.vue'
import Choice from '@/components/Choice.vue'
import Button from '@/components/Button.vue'

import {getAllCharacters, getAllQuotes} from '@/services/api/api.js'

export default {
    name: 'Game',
    components: {
        CharacterCard,
        Button,
        Choice,
    },
    computed: {
		quotesFilteredData: function() {
            //if the quote is too short or too long or if the character associated to the quote is a minor character
            let data = this.allQuotesData.docs.filter((quote) => quote.dialog.length>10 && quote.dialog.length<100 && quote.character != "5cdbe49b7ed9587226e794a0")
			return data
		},
        // charactersFilteredData: function() {
        //     let data = this.allCharactersData.docs.filter((character) => character.name == "MINOR_CHARACTER")
		// 	return data
		// }
	},
    data() {
        return {
            allQuotesData: [],
            allCharactersData: [],

            chosenQuote: [],
            chosenCharacter: [],
            OtherRandomCharacters: [],
            allChosenCharacters: [],

            showAnswer: false,
            playerClicked: false,

            //moviesFilter: "All",
        }
    },
    created: function() {
        this.getQuoteParty()
	},
    methods: {
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
            async getQuoteParty(){
                await this.retrieveAllData()
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
                // console.log('filtered data', this.quotesFilteredData)
                let possiblyChosenQuote = this.quotesFilteredData[Math.floor(Math.random() * this.quotesFilteredData.length)]

                this.chosenQuote = possiblyChosenQuote
                console.log(this.chosenQuote)
            },
            getchosenCharacter(){
                //character associated to the quote
                this.chosenCharacter = this.allCharactersData.docs.find(character => character._id === this.chosenQuote.character)
                console.log(this.chosenCharacter)
            },
            chooseRandomCharacters(numberCharacters) {
                this.OtherRandomCharacters = [];
                for(let i=0; i< numberCharacters; i++){ 
                    let quote = this.allQuotesData.docs[Math.floor(Math.random() * this.allQuotesData.docs.length)]
                    let character = this.allCharactersData.docs.find(character => character._id === quote.character)

                    //if the character was already chosen or if it is a minor character we chose another one
                    while(this.chosenCharacter._id == character._id || this.OtherRandomCharacters.find(chara => chara._id === character._id) || character.name === "MINOR_CHARACTER") {
                        quote = this.allQuotesData.docs[Math.floor(Math.random() * this.allQuotesData.docs.length)]
                        character = this.allCharactersData.docs.find(character => character._id === quote.character)
                    }

                    this.OtherRandomCharacters.push(character);
                }
                
                console.log(this.OtherRandomCharacters)
            },
            shuffleAllChosenCharacters(){
                this.allChosenCharacters = this.OtherRandomCharacters
                this.allChosenCharacters.push(this.chosenCharacter)
                //change the order of the choices
                this.allChosenCharacters = this.allChosenCharacters.sort(() => 0.5 - Math.random());
                console.log(this.allChosenCharacters)
            },
            revealAnswer(id, index){
                this.playerClicked = true

                if(id == this.chosenCharacter._id) {
                    this.$refs.choice[index].$el.classList.add("winner")
                }
                else {
                    this.$refs.choice[index].$el.classList.add("looser")

                    //give the correct answer the winner class
                    this.$refs.choice.find(el => el.characterId == this.chosenCharacter._id).$el.classList.add("winner")
                }

                setTimeout(()=>{
                    this.$refs.choice.forEach(el => {
                        el.$el.style.transform="translateX(80px)"
                        el.$el.style.opacity="0"
                        // console.log(el)
                    })
                    // this.$refs.choicesContainer.style.transform="translateX(80px)"
                },1100);

                setTimeout(()=>{
                    console.log('hide choices and show info character')
                    this.showAnswer=true
                    this.playerClicked = false
                },1500);
            },
            initChoices(){
                this.showAnswer = false
                //re initialize style of the choices
                this.playerClicked = false
                this.$refs.choice.forEach(el => {
                    el.$el.classList.remove('winner')
                    el.$el.classList.remove('looser')
                })
            },
            nextQuote(){
                this.initChoices()
                this.chooseQuoteAndCharacters()
            }
	},
}
</script>

<style scoped>
#game{
    width: 100%;
    min-height: 100vh;
    padding: 40px;
    display: flex;
    flex-direction: column;
}
.quote-infos-container {
    padding-top: 40px;
    flex-grow: 1;
}

.answer {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.answer .next-btn {
    margin-top: 64px;
}

.quote {
    color: var(--tertiary-color);
    text-align: center;
    
    margin-bottom: 64px;
    font-size: 1.5rem;
}


.filter-movies {
    display:flex;
    justify-content: flex-end;
}
.filter-movies > div:first-child {
    color: #9F9FAA;
    margin-right: 40px;
}
.filter-movies > div:last-child {
    display: flex;
}
.filter-movies .choice-movie {
    padding: 0px 12px;
    margin: 0px 8px;
    transition:0.2s ease;
    height: fit-content;
}
.filter-movies .choice-movie:hover {
    background-color: rgba(100, 104, 140,0.24);
    /*color: #fefeff;*/
    cursor: pointer;
}

.choices {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    padding: 0 80px;
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
@media (max-width: 767.98px) {
    .quote {
        font-size: 1.25rem;
        margin-bottom: 40px;
    }
    #game{
        padding: 32px;
    }
    .choices {
        padding: 0 56px;
    }
}
@media (max-width: 575.98px) {
    .filter-movies {
        flex-direction: column;
    }
    .filter-movies > div:first-child {
        text-align: center;
        margin-right: 0px;
    }
    .filter-movies>div:last-child {
        margin-top: 8px;
        justify-content: center;
    }
    
    .choices {
        padding: 0;
    }

    .answer .next-btn {
        margin-top: 48px;
    }
}
</style>