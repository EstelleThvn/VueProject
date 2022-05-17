<template>
  <div v-if="showAnswer" class="character-card">
    <h1>{{characterData.name}}</h1>
    <CharacterDetail detailName="Race" :detailInfo="characterData.race" />

    <div v-show="showDetails" class="details-character">
      <CharacterDetail detailName="Height" :detailInfo="characterData.height" />
      <CharacterDetail detailName="Birth" :detailInfo="characterData.birth" />
      <CharacterDetail detailName="Death" :detailInfo="characterData.death" />
    </div>

    <DetailsButton :showDetails="showDetails" v-on:click.native="showDetails = !showDetails"/>
  </div>

</template>

<script>
import CharacterDetail from '@/components/game/CharacterDetail.vue'
import DetailsButton from '@/components/common/DetailsButton.vue'

export default {
  name: 'CharacterCard',
  components: {
        CharacterDetail,
        DetailsButton,
  },
  props: {
      characterData: [],
      showAnswer: Boolean,
  },
  data() {
      return {
        showDetails: false,
      }
  },
}
</script>


<style scoped>
  .character-card {
    background-color: var(--light-color);
    box-shadow: 0px 0px 32px rgba(100, 104, 140, .32);
    width: 100%;
    max-width: 440px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 64px;

  }

  .details-character {
    width: 100%;
    transition: .2s ease;
  }

  h1 {
    text-align: center;
    margin-bottom: 16px;
    text-transform: capitalize;
    font-size: 2.25rem;
    line-height: 3.25rem;
  }

/* ------------- */
/* MEDIA QUERIES */
/* ------------- */
@media (max-width: 575.98px) {
    .character-card {
      padding: 24px 40px;
    }
    h1 {
        font-size: 2rem;
        line-height: 3rem;
    }
}
</style>
