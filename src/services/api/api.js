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

const getCharacter = async function() {
    const response = await fetch('https://the-one-api.dev/v2/character/5cdbdecb6dc0baeae48cfa59', {
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
    const response = await fetch('https://the-one-api.dev/v2/quote', {
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

export {getAllCharacters, getCharacter, getAllQuotes}