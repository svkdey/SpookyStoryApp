import React from 'react'
import axios from 'axios'
function Logout(props) {
    let request=axios.get('/api/logout')
    .then(req=>{
        setTimeout(()=>{
            props.history.push('/')
        },2000)
    })
    return (
        <div className="container" style={{
            padding:"25%"
        }}>
            <h1>
                Bye Bye
            </h1>
        </div>
    )
}

export default Logout
