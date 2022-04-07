<template>
  <div class="choices-container" v-bind:class="{unselectableChoices: playerClicked}">
      <Choice ref="choice" v-for="(character,index) in allChosenCharacters" :key="index" @click.native="revealAnswer(character._id, index)" :characterName="character.name" :characterId="character._id"/>
  </div>
</template>

<script>
import Choice from '@/components/Choice.vue'

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
          this.$refs.choice.forEach(el => {
                    el.$el.classList.remove('winner')
                    el.$el.classList.remove('looser')
            })
      }
    }
  },
  methods: {
      revealAnswer(id, index){
            this.$emit('update:playerClicked', true) 

            if(id == this.chosenCharacter._id) {
                //the player has won
                this.$refs.choice[index].$el.classList.add("winner")

                this.$emit("updateScores", true)
            }
            else {
                //the player has lost
                this.$refs.choice[index].$el.classList.add("looser")

                //give the correct answer the winner class
                this.$refs.choice.find(el => el.characterId == this.chosenCharacter._id).$el.classList.add("winner")

                this.$emit("updateScores", false)
            }

            setTimeout(()=>{
                // hide choices and show info character
                this.$emit("showAnswer")
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