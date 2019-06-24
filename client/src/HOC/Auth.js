import React, { Component } from 'react'
import {connect} from 'react-redux';
import {auth} from './../actions/index'
export default function(ComposedClass,reload){
 class Auth extends Component {
     state={
         loading:true,
     }
     componentWillMount(){
         this.props.dispatch(auth())
     }
     componentWillReceiveProps(nextProps) {
         this.setState({
             loading: false
         })
         // console.log(nextProps.user)
         if (!nextProps.user.login.isAuth) {
             if (reload === true) {
                 this.props.history.push('/login');
             }

         } else {
             if (reload === false) {
                 this.props.history.push('/');
             }
         }
     }
    render() {
            if(this.state.loading){
                return <div className="loader"> loading....</div>
            }
            return(
                <div>
                    <ComposedClass {...this.props} user={this.props.user}/>
                </div>
            )
        }

    
}
const mapStateToProps = (state) => {
    // console.log(state)
    return {
        user: state.user
    }
}
return connect(mapStateToProps)(Auth);
}

