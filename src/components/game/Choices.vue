<template>
  <div class="choices-container" v-bind:class="{unselectableChoices: playerClicked}">
      <Choice ref="choice" v-for="(character,index) in characterChoicesData" :key="index" @click.native="revealAnswer(character._id, index)" :characterName="character.name" :characterId="character._id" :winner="character.winner" :looser="character.looser"/>
  </div>
</template>

<script>
import Choice from '@/components/game/Choice.vue'

export default {
  name: 'Choices',
  components: {
        Choice,
    },
  props: {
      allChosenCharacters: Array,
      chosenCharacter: Object,
      playerClicked: Boolean,
  },
  watch: {
    playerClicked() {
      if(!this.playerClicked){
          this.characterChoicesData.forEach(el => {
                    el.looser = false
                    el.winner = false
            })
      }
    }
  },
  computed: {
        //allChosenCharacters with winning and loosing states
		characterChoicesData: function() {
            let data = this.allChosenCharacters
            data.forEach(character => {
                    character.winner = false
                    character.looser = false
            })
            console.log('TEST', data)
            return data
        }
    },
  methods: {
      revealAnswer(id, index){
            this.$emit('update:playerClicked', true) 

            if(id == this.chosenCharacter._id) {
                //the player has won
                this.characterChoicesData[index].winner = true

                this.$emit("updateScores", true)
            }
            else {
                //the player has lost
                this.characterChoicesData[index].looser = true

                //give the correct answer the winner class
                this.characterChoicesData.find(el => el._id == this.chosenCharacter._id).winner = true

                this.$emit("updateScores", false)
            }

            setTimeout(()=>{
                // hide choices and show info character
                this.$emit("update:showAnswer", true)
            },1300);
        },
  },
}
</script>


<style scoped>
.choices-container  {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    padding: 0 80px;
}

.choice-card:first-child {
    margin-top: 0;
}
.choice-card:last-child {
    margin-bottom: 0;
}

.unselectableChoices {
    pointer-events: none;
}

/* ------------- */
/* MEDIA QUERIES */
/* ------------- */
@media (max-width: 767.98px) {
    .choices-container {
        padding: 0 56px;
    }
}
@media (max-width: 575.98px) {
    .choices-container {
        padding: 0;
    }
}
</style>