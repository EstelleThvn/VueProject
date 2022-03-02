<template>
    <div id="game">
        <div class="filter-movies">
            <div><p>Quotes from movie:</p></div>
            <div>
                <div class="choice-movie"><p>1</p></div>
                <div class="choice-movie"><p>2</p></div>
                <div class="choice-movie"><p>3</p></div>
                <div class="choice-movie"><p>All</p></div>
            </div>
        </div>

        <h3 class="quote">"{{this.chosenQuote.dialog}}"</h3>


        <div v-if="!showAnswer" class="choices" ref="choicesContainer">
                <Choice ref="choice" v-for="character in allChosenCharacters" :key="character._id" @click.native="revealAnswer(character._id, $event)" :characterName="character.name"/>
        </div>
        <div v-else class="answer">
            <CharacterCard :characterData="chosenCharacter" />
            <div>
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
    data() {
        return {
            allQuotesData: [],
            allCharactersData: [],

            chosenQuote: [],
            chosenCharacter: [],
            OtherRandomCharacters: [],
            allChosenCharacters: [],

            showAnswer: false,
        }
    },
    created: function() {
        this.getQuoteParty()
	},
    methods: {
			async retrieveAllQuotes() {
                this.allQuotesData = await getAllQuotes()
                console.log(this.allQuotesData)
			},
            async retrieveAllCharacters() {
                this.allCharactersData = await getAllCharacters()
                console.log(this.allCharactersData)
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
                let possiblyChosenQuote = this.allQuotesData.docs[Math.floor(Math.random() * this.allQuotesData.docs.length)]
                let possiblyChosenQuoteChar = this.allCharactersData.docs.find(character => character._id === possiblyChosenQuote.character)
                //if the quote is too long or too short or if the character is a minor Character, we choose another one
                while(possiblyChosenQuote.dialog.length<20 || possiblyChosenQuote.dialog.length>100 || possiblyChosenQuoteChar.name == "MINOR_CHARACTER"){
                    possiblyChosenQuote = this.allQuotesData.docs[Math.floor(Math.random() * this.allQuotesData.docs.length)]
                    possiblyChosenQuoteChar = this.allCharactersData.docs.find(character => character._id === possiblyChosenQuote.character)
                }

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
                    while(this.chosenCharacter._id == character._id || this.OtherRandomCharacters.find(chara => chara._id === character._id) || character.name == "MINOR_CHARACTER") {
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
            revealAnswer(id, event){
                this.$refs.choicesContainer.style.pointerEvents = "none";
                if(id == this.chosenCharacter._id) {
                    // console.log("gg!")
                    event.target.parentNode.classList.add("winner")
                }
                else {
                    // console.log("too bad")
                    event.target.parentNode.classList.add("looser")
                    //give the correct answer the winner class
                    this.$refs.choice.forEach(el => {
                        if(el.characterName == this.chosenCharacter.name){
                            el.$el.classList.add("winner")
                        }
                    })
                }

                setTimeout(()=>{
                    console.log('hide choices and show info on character')
                    this.showAnswer=true
                    this.$refs.choicesContainer.style.pointerEvents = "unset";
                },2000);
            },
            initChoices(){
                this.showAnswer = false
                //re initialize style of the choices
                // this.$refs.choicesContainer.style.pointerEvents = "unset";
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
    color: #EA823B;
    text-align: center;
    margin-top: 40px;
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
}

/* ------------- */
/* MEDIA QUERIES */
/* ------------- */
@media (max-width: 767.98px) {
    .quote {
        font-size: 1.25rem;
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
}
</style>