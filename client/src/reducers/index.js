import {combineReducers} from 'redux';
import story from './story_reducers';
import user from './user_reducers';
const rootReducer=combineReducers({
    story, user

})

export default rootReducer;