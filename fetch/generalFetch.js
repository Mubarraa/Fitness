import { 
    getPOSTParams, 
    getGETParams, 
    getPATCHParams, 
    getDELETEParams,
    getAPATCHParams
} from './params'

async function makeNewPost(url, post) {
    // create new item through post
    let res = null;
    try {
        const params = await getPOSTParams(post)
        res = await fetch(url, params)
        res = await res.json()
        return res
    } catch (err) {
        console.log("newPostError", err);
    }
}

async function getObject(url) {
    // get items given url
    let res = null;
    try {
        const params = await getGETParams()
        console.log("getting object", url, params)
        res = await fetch(url, params)
        res = await res.json()
        return res
    } catch (err) {
        console.log("getObjectError", err);
    }
}

async function patch(url, newValue) {
    // update specific field (field given in url)
    let res = null;
    try {
        const params = await getPATCHParams(newValue)
        res = await fetch(url, params)
        res = await res.json()
        return res
    } catch (err) {
        console.log("patchError", err);
    }
}
async function patchAchievement(url, achieved, num) {
    // update achievement of object(habit/goal)
    const patchUrl = url + "/achieve"
    let res = null;
    try {
        const params = await getAPATCHParams(achieved, num)
        res = await fetch(patchUrl, params)
        res = await res.json()
        return res
    } catch (err) {
        console.log("patchAchievementError", err);
    }
}

async function deleteObject(url) {
    // delete object given url
    let res = null;
    try {
        const params = await getDELETEParams()
        res = await fetch(url, params)
        res = await res.json()
        return res
    } catch (err) {
        console.log("deleteObjectError", err);
    }
}

async function getObjectAchievement(url) {
    // get items
    let res = null;
    try {
        // get object achievement
        const params = await getGETParams()
        res = await fetch(url, params)
        res = await res.json()
        if (res.dateAchieved) {
            // get achievements (from habits/goals)
            const lastAchieved = new Date(res.dateAchieved)
            const today = new Date(Date.now())
            // if same day, show progress today
            if (sameDay(lastAchieved, today)) {
                return res.completion;
            }
        } else if (res > 0) {
            return res
        }
    } catch (err) {
        console.log("getObjectAchievementError", err);
    }
    return 0
}

function sameDay(day1, day2) {
    return day1.toDateString() === day2.toDateString()
}

export { 
    makeNewPost, 
    getObject, 
    patch, 
    deleteObject, 
    getObjectAchievement,
    patchAchievement
}