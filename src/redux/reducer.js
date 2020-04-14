// src/redux/reducer.js
export default function reducer(state = {}, action) {
    if (action.type === 'RECEIVE_FRIENDS_WANNABES') {
        return { ...state, friendsWannabes: action.friendsWannabes };
    }
    if (action.type === 'ACCEPT_FRIEND_REQUEST') {
        console.log('action', action);
        return {
            ...state,
            friendsWannabes: state.friendsWannabes.map((friend) =>
                friend.id === action.id ? { ...friend, accepted: true } : friend
            ),
        };
    }
    if (action.type === 'UNFRIEND') {
        console.log('action', action);
        return {
            ...state,
            friendsWannabes: state.friendsWannabes.filter(
                (friend) => friend.id !== action.id
            ),
        };
    }
    return state;
}
