<template>
    <div class="statistics-container">
    <Header :moviesFilter.sync="moviesFilter"/>

    <section class="main-container">
        <div>
            <h2>The top 10 most talkative characters </h2>
            <BarChart :chartData="speakingCharactersOrganizedData"/>
        </div>
        
        <div>
            <h2>The words that come up most often </h2>
            <Wordcloud :defaultWords="QuoteWordsData" />
        </div>
    </section>

    <Footer />

    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Wordcloud from '@/components/Wordcloud.vue'
import BarChart from '@/components/CharacterQuotesChart.vue'

import {getAllCharacters, getAllQuotes} from '@/services/api/api.js'

export default {
  name: 'Stats',
  components: {
        Header,
        Footer,
        Wordcloud,
        BarChart,
    },
  computed: {
		speakingCharactersOrganizedData: function() {
            let quotes;
            if(this.moviesFilter != "0" && this.allQuotesData.docs){
                quotes = this.allQuotesData.docs.filter((quote) => quote.movie == this.moviesFilter).filter((quote) => quote.character != "5cdbe49b7ed9587226e794a0")
            }
            else {
                quotes = this.allQuotesData.docs
            }
            
            // console.log('FILTERED QUOTES', quotes)

            let speakingCharacters = [];

            if(quotes != undefined ){
                quotes.forEach(quote => {
                    let character = speakingCharacters.find(character => character._id === quote.character)

                    if(character){
                        character.numberOfQuotes++
                    }
                    else {
                        character = this.allCharactersData.docs.find(character => character._id === quote.character)
                        character.numberOfQuotes=1
                        speakingCharacters.push(character)
                    }
                })
            }
            

            console.log('speaking Characters', speakingCharacters)

            speakingCharacters.sort((a, b) => (a.numberOfQuotes > b.numberOfQuotes) ? -1 : 1)
            if(speakingCharacters.length > 10 ) speakingCharacters = speakingCharacters.filter((character,index) => index < 10)



            const labels = [];
            speakingCharacters.forEach(character => labels.push(character.name))
            // organizedData.labels = labels

            const dataValues = [];
            speakingCharacters.forEach(character => dataValues.push(character.numberOfQuotes))
            // organizedData.datasets.data = dataValues

            let organizedData =  {
                labels: labels,
                datasets: [{
                    label: 'Number of quotes',
                    backgroundColor: '#64688C',
                    data: dataValues
                    }]
                };

            console.log(organizedData)
            
			return organizedData
		},
        QuoteWordsData: function() {
            let quotes;
            if(this.moviesFilter != "0" && this.allQuotesData.docs){
                quotes = this.allQuotesData.docs.filter((quote) => quote.movie == this.moviesFilter)
            }
            else {
                quotes = this.allQuotesData.docs
            }

            let totalwords = [];

            if(quotes != undefined){
                quotes.forEach(quote => {
                    const wordsInQuote = quote.dialog.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").split(' ').filter(word => word.length > 2);

                    wordsInQuote.forEach(wordInQuote => {
                        wordInQuote= wordInQuote.toLowerCase()

                        if(totalwords.find(word => word.name === wordInQuote)){
                            totalwords.find(word => word.name === wordInQuote).value++
                        }
                        else {
                            let newWord = new Object();
                            newWord.name = wordInQuote
                            newWord.value=1
                            totalwords.push(newWord)
                        }
                    })
                })

                totalwords.sort(function(a, b){return a.value - b.value}).reverse()
                totalwords = totalwords.filter(word => word.value > 1)
                if(totalwords.length > 200 ) totalwords = totalwords.filter((word,index) => index < 200)
            }
            
            console.log('TOTAL WORDS', totalwords)
            
			return totalwords
		}
	},
  data() {
        return {
            //Data retrieved from the API
            allQuotesData: [],
            allCharactersData: [],

            //movies filter
            moviesFilter: localStorage.getItem("moviesFilter") || "0", //0 -> All movies
        }
    },
    created: function() {
        this.retrieveAllQuotes()
        this.retrieveAllCharacters()
	},
    methods: {
        async retrieveAllQuotes() {
            this.allQuotesData = await getAllQuotes()
            // console.log(this.allQuotesData)
        },
        async retrieveAllCharacters() {
            this.allCharactersData = await getAllCharacters()
            // console.log(this.allCharactersData)
        },
	}
}
</script>


<style scoped>
    .statistics-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .main-container {
        padding: 40px;
        padding-top: 72px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    h2 {
        font-family: var(--text-font);
        font-weight: bold;
        font-size: 2rem;
        line-height: 3.5rem;
        color: var(--secondary-color);
        margin-top: 40px;
        margin-bottom: 16px;
    }

    /* ------------- */
    /* MEDIA QUERIES */
    /* ------------- */
    @media (max-width: 767.98px) {
        .main-container {
            padding: 32px;
            padding-top: 64px;
        }
        h2 {
            font-size: 1.75rem;
            line-height: 2.75rem;
            margin-bottom: 12px;
        }
    }
</style>