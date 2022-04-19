<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
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

:root {
  --dark-color: #12172C;
  --light-color: #FEFEFF;
  --primary-color: #64688C;
  --secondary-color: #953B54;
  --tertiary-color: #EA823B;
  --text-font: noto-sans, sans-serif;
  --title-font: "Aniron Bold", sans-serif;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: var(--light-color);
}
::-webkit-scrollbar-thumb {
  background: var(--dark-color);
  border-radius: 8px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--primary-color);
}

#app {
  font-family: var(--text-font);
  font-weight: 400;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--dark-color);
  background-color: var(--light-color);
  font-size: 1.25rem;
}

h1 {
  font-family: var(--title-font);
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
