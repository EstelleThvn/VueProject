<template>
    <header>
        <div class="links">
        <router-link to="/" class="home-btn">
            <img src="@/assets/images/home-logo.svg">
            <p>Home</p>
        </router-link>
        <router-link to="/game">
            <p>Game</p>
        </router-link>
        <router-link to="/statistics">
            <p>Stats</p>
        </router-link>
        </div>

        <MoviesFilter v-bind="$props" v-on="$listeners" />
    </header>
</template>

<script>
    import MoviesFilter from '@/components/common/MoviesFilter.vue'

    export default {
    name: 'Header',
    props: {
        moviesFilter: String,
    },
    components: {
        MoviesFilter,
    },
    }
</script>

<style scoped>
header {
    background-color: var(--light-color);
    box-shadow: 0px 0px 32px rgba(100,104,140,.32);
    padding: 8px 24px;
    padding-right:40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    z-index: 1;
    width: 100%;
}

.links{
    display: flex;
    align-items: center;
}
.links a {
    color: var(--secondary-color);
    padding: 8px 16px;
    height: 100%;
    width: fit-content;
    transition:0.2s ease;
    margin: 0 8px;
}
.links a p {
    font-weight: bold;
    text-transform: uppercase;
}
.links a:first-child {
    margin-left: 0;
}
.links a:last-child  {
    margin-right: 0;
}
.links a:hover{
    background-color: rgba(100, 104, 140,0.20);
}

.home-btn{
    display: flex;
    align-items: center;
}
.home-btn p {
    margin-left: 8px;
}
.home-btn img{
    height: 40px;
}

.filter-movies {
    display:flex;
    align-items: center;
}
.filter-movies > div:first-child {
    color: #9F9FAA;
    margin-right: 24px;
    text-align: right;
}
.filter-movies > div:last-child {
    display: flex;
}

.filter-movies select {
    border: none;
    background-color: var(--primary-color);
    border-radius: 0;
    padding: 4px;
    color: var(--light-color);
    font-size: 1rem;
}


/* ------------- */
/* MEDIA QUERIES */
/* ------------- */
@media (max-width: 767.98px) {
    .home-btn p {
        display: none;
    }
    header {
        padding: 0;
    }
    .home-btn {
        padding: 12px 24px;
    }
    .filter-movies {
        padding: 8px 16px;
    }
    .filter-movies > div:first-child {
        margin-right: 16px;
    }
    .filter-movies select {
        padding: 4px 0;
    }
}

@media (max-width: 575.98px) {
    /*.links{
        flex-direction: column;
    }*/
    .links a {
        margin: 0;
        padding: 8px 8px;
    }
    .links a:first-child, .filter-movies {
        padding: 8px 16px;
    }
}
</style>