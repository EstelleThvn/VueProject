<template>
  <div id="app">
    <Home />
    <Game />
  </div>
</template>

<script>
import Home from '@/components/Home.vue'
import Game from '@/components/Game.vue'

export default {
  name: 'App',
  components: {
    Game,
    Home,
  },
}
</script>

<style>
@font-face {
 font-family: "Aniron Bold";
 src: url("./assets/fonts/aniron/anirm___.ttf") format("truetype");
}
@font-face {
 font-family: "Aniron Regular";
 src: url("./assets/fonts/aniron/anirb___.ttf") format("truetype");
}

#app {
  font-family: noto-sans, sans-serif;
  font-weight: 400;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #132443;
  background-color: #FEFEFF;
  font-size: 1.25rem;
}

h1 {
  font-family: "Aniron Bold", sans-serif;
  font-weight: 400;
  font-size: 2.5rem;
  line-height: 3.5rem;
}
p{
  line-height: 1.75rem;
  font-size: 1.125rem;
}


/* ------------- */
/* MEDIA QUERIES */
/* ------------- */
@media (max-width: 767.98px) {
  h1 {
    font-size: 2.25rem;
    line-height: 3.25rem;
  }
}

@media (max-width: 575.98px) {
  h1 {
    font-size: 2rem;
    line-height: 3rem;
  }
}
</style>
