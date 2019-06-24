export default function (state = {}, action) {
    switch (action.type) {
       case 'GET_STORIES':
            return {...state,stories:action.payload}
        case 'MAKE_POST':
            return {...state,newPost:action.payload}
        case 'POST_BY_USER':
            return {...state,userStories:action.payload}
        case 'EDIT_POST':
            return {...state,editStory:action.payload}
        case 'UPDATE_POST':
            return {...state,updatedStory:action.payload}
        case 'DELETE_STORY':
            return {...state,deleteStory:action.payload}
        case 'CLEAR_DEL_BOOK':
            return {
                ...state,
                story: action.payload.story,
                updatedStory: action.payload.updatedStory,
                deleteStory: action.payload.deleteStory,
                editStory:action.payload.editStory
            }
        default:
            return state;
    }
}