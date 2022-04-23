<template>
  <div class="choice-card" v-bind:class="{winner: winner, looser: looser}">
      <p>{{characterName}}</p>
  </div>
</template>

<script>
export default {
  name: 'Choice',
  props: {
      characterName: String,
      characterId: String,
      winner: Boolean,
      looser: Boolean,
  }
}
</script>


<style scoped>
.choice-card {
  border: 2px solid var(--primary-color);
  transition: 0.2s ease;
  margin: 12px 0;
  text-align: center;
  width: 100%;
  max-width: 440px;
  position: relative;
  padding: 16px 40px;
}
.choice-card p {
  
}
.choice-card:hover {
  background-color: rgba(100, 104, 140,0.24);
  cursor: pointer;
}

.winner, .looser {
  pointer-events: none;
  color: var(--light-color);
}
.winner {
  background-color: var(--primary-color);
}
.winner:hover{
  background-color: var(--primary-color);
}
.looser {
  background-color: var(--secondary-color);
  border: 2px solid var(--secondary-color);
}
.looser:hover{
  background-color: var(--secondary-color);
}
.choice-card::before {
  content: "";
  position: absolute;
  width: 56px;
  height: 56px;
  background-size: 56px;
  top: 50%;
  right: -24px;
  transform: translate(100%, -50%);
  /*display: none;*/
  opacity:0;
  transition: 0.2s ease;
  pointer-events: none;
}
.winner::before {
  background-image: url("../../assets/images/check-mark.svg");
  opacity:1;
}
.looser::before {
  background-image: url("../../assets/images/cross.svg");
  opacity:1;
}


/* ------------- */
/* MEDIA QUERIES */
/* ------------- */
@media (max-width: 767.98px) {
    .choice-card {
      padding: 12px 40px;
    }
    .choice-card::before {
      width: 40px;
      height: 40px;
      background-size: 40px;
      top: 50%;
      right: -16px;
    }
}
@media (max-width: 575.98px) {
  .choice-card::before {
      width: 24px;
      height: 24px;
      background-size: 24px;
      top: 50%;
      right: 8px;
      transform: translate(0, -50%);
    }
    .winner::before {
      background-image: url("../../assets/images/check-mark-xs.svg");
    }
    .looser::before {
      background-image: url("../../assets/images/cross-xs.svg");
    }
}
</style>
