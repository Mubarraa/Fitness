import {HeaderWithVeification} from '../components/header_types'
// get header from file
async function getHeader() {
    const header = await HeaderWithVeification();
    console.log("here", header)
    return header
}
// GET paramaters
async function getGETParams() {
    return({
        "method": "GET",
        "headers": await getHeader()
    })
}

// POST parameters to create a new post (habit/goal)
async function getPOSTParams(post) {
    return({
        "method": "POST",
        "headers": await getHeader(),
        "body": JSON.stringify({
            "post": post
        })
    })
}

// PATCH parameters to update remove
async function getPATCHParams(patch) {
    return({
        "method": "PATCH",
        "headers": await getHeader(),
        "body": JSON.stringify({
            "patch": patch
        })
    })
}

// DELETE parameters to delete goal/habit/achievement
async function getDELETEParams() {
    return({
        "method": "DELETE",
        "headers": await getHeader()
    })
}

// PATCH parameters to update goal/habit completion rate
async function getAPATCHParams(achieved, num) {
    return ({
        "method": "PATCH",
        "headers": await getHeader(),
        "body": JSON.stringify({
            "patch": achieved,
            "completion": num
        })
    })
}

export { 
    getGETParams, 
    getPOSTParams, 
    getPATCHParams, 
    getDELETEParams, 
    getAPATCHParams
}