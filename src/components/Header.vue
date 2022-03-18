<template>
    <header>
        <router-link to="/" class="home-btn">
            <img src="../assets/images/home-logo.svg">
            <p>Home</p>
        </router-link>

        <div class="filter-movies">
            <div><p>Quotes from movie:</p></div>
            <div>
                <select :value="moviesFilter" @input="onMoviesFilterChanged">
                    <option value="5cd95395de30eff6ebccde5c">1</option>
                    <option value="5cd95395de30eff6ebccde5b">2</option>
                    <option value="5cd95395de30eff6ebccde5d">3</option>
                    <option value="0">All</option>
                </select>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
    name: 'Header',
    props: {
        moviesFilter: String,
    },
    watch: {
		moviesFilter: function(newMoviesFilter) {
			localStorage.setItem("moviesFilter", newMoviesFilter)
            console.log('CHANGE STORAGE MOVIEFILTER')
		},
	},
    methods: {
		onMoviesFilterChanged(event) {
			this.$emit('update:MoviesFilter', event.target.value) 
            this.$emit('updateMoviesFilter', event.target.value) 
		},
	}
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

    .home-btn{
        display: flex;
        align-items: center;
        color: var(--secondary-color);
        padding: 8px 16px;
        width: fit-content;
        transition:0.2s ease;
    }
    .home-btn:hover{
        background-color: rgba(100, 104, 140,0.20);
    }
    .home-btn p {
        font-weight: bold;
        margin-left: 16px;
        text-transform: uppercase;
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
        padding: 0px 24px;
    }
    .filter-movies > div:first-child {
        margin-right: 16px;
    }
    .filter-movies select {
        padding: 4px 0;
    }
}
</style>