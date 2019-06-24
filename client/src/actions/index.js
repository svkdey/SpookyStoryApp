import axios from 'axios'

export function getStories(
    limit=6,
    skip=0,
    order="desc",
    list=""
){
    
   const request = axios.get(`api/getStories?skip=${skip}&limit=${limit}&order=${order}`)
   .then(res=>{
       if(list){
           return [...list,...res.data]}
        else {
            return res.data
        }})
   .catch(e=>console.log(e))
//    console.log(request)
    return {
        type: 'GET_STORIES',
        payload: request
    }
}

export function loginUser(datatoLogin){
    // console.log(datatoLogin)
    const request = axios.post('/api/login', datatoLogin)
        .then(res => res.data)
        .catch(e => console.log(e))

   return {
        type: 'USER_LOGIN',
        payload: request

    }
}
export function registertheUser(datatoRegister) {
    // console.log(datatoRegister)
    const request = axios.post('/api/registerUser', datatoRegister)
        .then(res => res.data)
        .catch(e => console.log(e))
    return {
        type: 'USER_Register',
        payload: request

    }
}

export function postStory(storyToPost){
    const request = axios.post('/api/postStories',storyToPost)
                        .then(res=>res.data)
                        .catch(e=>console.log(e))
    return {
        type: 'MAKE_POST',
        payload: request

    }
}

export function auth() {

    const request = axios.get('/api/auth')
        .then(res => res.data)

    return {
        type: 'USER_AUTH',
        payload: request
    }
}
export function getStoriesOfUser(id){
    const request = axios.get(`/api/getStoryByUser?id=${id}`)
                    .then(res=>res.data)
                    .catch(e=>console.log(e))
    return {
        type:'POST_BY_USER',
        payload:request
    }
}

export function getStory(id){
    const request=axios.get(`/api/getStory?id=${id}`)
                        .then(res=>res.data)
                        .catch(e=>console.log(e))
     return {
         type: 'EDIT_POST',
         payload: request
     }
}

export function postUpdatedStory(data){
    const request = axios.post('/api/Story_update',data)
                        .then(res=>res.data)
                        .catch(e=>console.log(e))

    return {
        type:'UPDATE_POST',
        payload:request
    }
}

export function deleteStoryAction(id){
    // console.log("deleteStoryAction")
    const request = axios.delete(`/api/Story_delete?id=${id}`)
                        
                     
    return {
        type:"DELETE_STORY",
        payload:request
    }
}

export function clearState(){
    return {
        type: 'CLEAR_DEL_BOOK',
        payload: {
            story: null,
            updatedStory: false,
            deleteStory: false,
            editStory:null,
        }
    }
}