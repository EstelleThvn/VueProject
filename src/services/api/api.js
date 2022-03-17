const authorization = `Bearer ${process.env.VUE_APP_API_KEY}`

const getAllCharacters = async function() {
    const response = await fetch('https://the-one-api.dev/v2/character', {
        headers: {
            Authorization: authorization
        },
    })
    if(response.status == 200){
        return response.json();
    }
    else {
        new Error(response.statusText)
    }
}

const getAllQuotes = async function() {
    const response = await fetch('https://the-one-api.dev/v2/quote?limit=3000', {
        headers: {
            Authorization: authorization
        },
    })
    if(response.status == 200){
        return response.json();
    }
    else {
        new Error(response.statusText)
    }
}

/*const getQuotesFromMovie = async function(idMovie) {
    const response = await fetch(`https://the-one-api.dev/v2/movie/${idMovie}/quote`, {
        headers: {
            Authorization: authorization
        },
    })
    if(response.status == 200){
        return response.json();
    }
    else {
        new Error(response.statusText)
    }
}*/

const getMovies = async function() {
    const response = await fetch(`https://the-one-api.dev/v2/movie`, {
        headers: {
            Authorization: authorization
        },
    })
    if(response.status == 200){
        return response.json();
    }
    else {
        new Error(response.statusText)
    }
}

export {getAllCharacters, getAllQuotes, getMovies}