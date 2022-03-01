const getAllCharacters = async function() {
    const response = await fetch('https://the-one-api.dev/v2/character', {
        headers: {
            Authorization: `Bearer ${process.env.VUE_APP_API_KEY}`
        },
    })
    if(response.status == 200){
        return response.json();
    }
    else {
        new Error(response.statusText)
    }
}

const getCharacter = async function() {
    const response = await fetch('https://the-one-api.dev/v2/character/5cdbdecb6dc0baeae48cfa59', {
        headers: {
            Authorization: `Bearer ${process.env.VUE_APP_API_KEY}`
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
    const response = await fetch('https://the-one-api.dev/v2/quote', {
        headers: {
            Authorization: `Bearer ${process.env.VUE_APP_API_KEY}`
        },
    })
    if(response.status == 200){
        return response.json();
    }
    else {
        new Error(response.statusText)
    }
}

export {getAllCharacters, getCharacter, getAllQuotes}