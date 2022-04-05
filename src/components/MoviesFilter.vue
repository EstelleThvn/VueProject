<template>
    <div class="filter-movies">
        <div><p>Quotes from movie:</p></div>
        <div>
            <select v-model="moviesFilter" @input="onMoviesFilterChange">
                <option value="5cd95395de30eff6ebccde5c">1</option>
                <option value="5cd95395de30eff6ebccde5b">2</option>
                <option value="5cd95395de30eff6ebccde5d">3</option>
                <option value="0">All</option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
  name: 'MoviesFilter',
  data() {
    return {
        moviesFilter: localStorage.getItem("moviesFilter") || "0", //0 -> All movies
    }
  },
    watch: {
		moviesFilter: function(newMoviesFilter) {
			localStorage.setItem("moviesFilter", newMoviesFilter)
            console.log('Change moviesFilter in Storage', newMoviesFilter)
		},
	},
    methods: {
		onMoviesFilterChange(event) {
            // console.log('event target value filter change',event.target.value)
            this.$emit("moviesFilterChange", event.target.value)
		},
	}
}
</script>


<style scoped>
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