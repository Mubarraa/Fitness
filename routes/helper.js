// get objects in the list ('objects') with the given value of
// the 'deleted' property
function getDeleted(deleted, objects) {
    let arr = []
    for (index in objects) {
        if (objects[index].deleted == deleted) {
            arr.push(objects[index])
        }
    }
    return arr
}

// get object given object id in a list
function getObject(objectId, objects) {
    for (num in objects) {
        if (objectId == objects[num]._id) {
            return objects[num]
        }
    }
    return null
}

// true if same day, false if not
function sameDay(day1, day2) {
    return day1.toDateString() === day2.toDateString()
}

// get achievement given a relationId
function getAchievement(relationId, objects) {
    console.log(relationId)
    for (num in objects) {
        if (relationId == objects[num].relationId) {
            return objects[num]
        }
    }
    return null
}

// get all objects
function getAll(objects) {
    let arr = []
    for (index in objects) {
            arr.push(objects[index])
    }
    return arr
}

// get first object
function getFirst(objects) {
    objects.sort(function(a,b){
        return new Date(b.dateAdded) - new Date(a.dateAdded)
      })
    return objects[0];
}

module.exports = {getDeleted, getObject, sameDay, getAchievement,getAll,getFirst};
