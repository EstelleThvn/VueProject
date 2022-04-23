<template>
  <div class="scores">
    <div><img src="@/assets/images/current-score.svg"><p>{{currentScore}}</p></div>
    <div><img src="@/assets/images/highest-score.svg"><p>{{highestScore}}</p></div>
</div>
</template>

<script>
export default {
  name: 'Scores',
  props: {
      currentScore: Number,
      highestScore: Number,
  }, 
}
</script>


<style scoped>
.scores {
    width: fit-content;
    background-color: var(--light-color);
    box-shadow: 0px 0px 32px rgb(100 104 140 / 32%);
    padding: 8px 12px;
    width: 100%;
    max-width: 144px;
    position: relative;
}
.scores div > p {
    color: var(--secondary-color);
    font-weight: bold;
    font-size: 1.25rem;
}
.scores div {
    display: flex;
    align-items: center;
    padding: 8px;
    justify-content: space-between;
}
.scores > div:before {
    padding: 2px 8px;
    background-color: var(--primary-color);
    font-size: 0.75rem;
    position: absolute;
    color: var(--light-color);
    left: calc(100% + 8px);
    opacity: 0;
    transition: 0.2s ease;
    width: fit-content;
    pointer-events: none;
}
.scores > div:first-child:before {
    content: "Current score"; 
}
.scores > div:last-child:before {
    content: "Highest score"; 
}
.scores:hover > div:before {
    opacity: 0.87;
}
.scores img {
    height: 32px;
    width: 40px;
}
.scores p {
    margin-left: 16px;
}

/* ------------- */
/* MEDIA QUERIES */
/* ------------- */
@media (max-width: 991.98px) {
    .scores {
        margin-top:24px;
    }
}
@media (max-width: 767.98px) {
    .scores {
        margin-top:32px;
    }
}
@media (max-width: 575.98px) {
    .scores {
        align-self: center;
    }
    .scores > div:before {
        display: none;
    }
}
</style>