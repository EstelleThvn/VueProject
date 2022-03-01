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

        <div class="choices" v-for="character in allChosenCharacters" :key="character._id">
            <Choice @click.native="revealAnswer(character._id)" :characterName="character.name"/>
        </div>

        <div class="answer">
            <CharacterCard :characterData="chosenCharacter" />
            <div>
                <Button @click.native="chooseQuote" text="next quote" class="next-btn" />
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
            //chooses one quote from all the possible quotes
            chooseQuote() {
                let possiblyChosenQuote = this.allQuotesData.docs[Math.floor(Math.random() * this.allQuotesData.docs.length)]

                //if the quote is too long or too short, we choose another one
                while(possiblyChosenQuote.dialog.length<20 || possiblyChosenQuote.dialog.length>100){
                    possiblyChosenQuote = this.allQuotesData.docs[Math.floor(Math.random() * this.allQuotesData.docs.length)]
                }

                this.chosenQuote = possiblyChosenQuote
                console.log(this.chosenQuote)

                this.getchosenCharacter()
                this.getRandomCharacters(3)

                
                this.allChosenCharacters = this.OtherRandomCharacters
                this.allChosenCharacters.push(this.chosenCharacter)
                console.log(this.allChosenCharacters)
            },
            getchosenCharacter(){
                //character associated to the quote
                this.chosenCharacter = this.allCharactersData.docs.find(character => character._id === this.chosenQuote.character)
                console.log(this.chosenCharacter)
            },
            getRandomCharacters(numberCharacters) {
                this.OtherRandomCharacters = [];
                for(let i=0; i< numberCharacters; i++){
                    const quote = this.allQuotesData.docs[Math.floor(Math.random() * this.allQuotesData.docs.length)]
                    this.OtherRandomCharacters.push(this.allCharactersData.docs.find(character => character._id === quote.character));
                }
                
                console.log(this.OtherRandomCharacters)
            },
            async getQuoteParty(){
                await this.retrieveAllQuotes()
                await this.retrieveAllCharacters()
                this.chooseQuote()
            },
            revealAnswer(id){
                console.log(id)
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