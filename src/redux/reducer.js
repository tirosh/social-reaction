// src/redux/reducer.js
export default function reducer(state = {}, action) {
    if (action === 'RECEIVE_FRIENDS_WANNABES') {
        // should clone the global state, and add to it a property called
        // friendsWannabes whose value is the array of friends and wannabes
    }
    if (action === 'ACCEPT_FRIEND_REQUEST') {
        //  should clone the global state, and the clone should have all the
        //  properties of the old state except one of the objects in the
        //  friendsWannabes array should have their accepted property set to
        //  true. All done immutably :)
    }
    if (action === 'UNFRIEND') {
        // should clone the global state, and the clone should have all the
        // properties of the old state except the user whose friendship was
        // ended should be removed from the friendsWannabes array. All done
        // immutably :)
    }

    return state;
}
