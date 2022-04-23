<template>
  <div class="character-card">
    <h1>{{characterData.name}}</h1>
    <div>
      <p>Race: </p>
      <p>{{characterData.race}}</p>
    </div>
    <div>
      <p>Height: </p>
      <p>{{characterData.height}}</p>
    </div>
    <div>
      <p>Birth: </p>
      <p>{{characterData.birth}}</p>
    </div>
    <div>
      <p>Death: </p>
      <p>{{characterData.death}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterCard',
  props: {
      characterData: [],
  }
}
</script>


<style scoped>
  .character-card {
    background-color: var(--light-color);
    box-shadow: 0px 0px 32px rgba(100,104,140,.32);
    width: 100%;
    max-width: 440px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 64px;
  }

  .character-card > div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 6px 0;
  }

  .character-card > div p:first-child{
    color: #9F9FAA;
    margin-right: 16px;
  }
  .character-card > div p:last-child{
    text-align: right;
    text-overflow: ellipsis;
    overflow: hidden; 
    white-space: nowrap;
  }

  h1{
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
