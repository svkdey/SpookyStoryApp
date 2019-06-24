import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loginUser} from './../actions/index'
import {Link} from 'react-router-dom';
class Login extends Component {
    state={
        email:"",
        password:"",
        errorMsg:"",
        success:false
    }
    changeHandle(e){
        this.setState({
            [e.target.name]:e.target.value
        })
        this.validate(this.state.email, this.state.password)
      
    }
  
    submitForm(e){
    e.preventDefault();
    
      if(this.state.errorMsg.length>0){this.showError()}
        else{
            var data={
                "email":this.state.email,
                "password":this.state.password
            }
            this.props.dispatch(loginUser(data))
        }
    
    
    
        
    }
    componentWillReceiveProps(nextprops){
        if(nextprops.user.loginUser.isAuth){
            this.props.history.push('/')
        }
        else(this.showError(nextprops.user.loginUser.message))
    }
    showError(data = this.state.errorMsg) {
    document.getElementById('error').innerHTML = data}

      validate(email, pass) {
    //    console.log(pass.length)
       if ((email.length > 5) && (pass.length > 3)) {
        //    console.log("hi")
           this.setState({
                errorMsg: "",
               success: true
           })
        
       } else {
        //    console.log("else")
           this.setState({
               errorMsg: "Check inputs",
               success: false
           })
       }
        
    }
  render() {
  
    return (
        
      <div className="container"
      style={{padding:"20%"}}>
      <div id="error" style={{color:'red'}}></div>
      <div>
          <h2>Log In</h2>
      </div>
       <form onSubmit={(e)=>{this.submitForm(e)}}>
  <div className="form-group">
    <label >Email address</label>
    <input type="email" name="email" className="form-control" id="exampleInputEmail1" value={this.state.email}
    onChange={(e)=>{this.changeHandle(e)}} placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label >Password (Must be of length greater than 5)</label>
    <input type="password" name="password" className="form-control" id="exampleInputPassword1" value={this.state.password}
    onChange={(e)=>{this.changeHandle(e)}} placeholder="Password"/>
  </div>
  <button type="submit" className="btn btn-primary">Log in</button>
</form> 
<div style={{
    fontStyle:"bold",
    padding:"10px"
}}>
       <Link to="/register"> Click Here to Sign up </Link>   
      </div>


</div>
    );
  }
}
const mapStateToProps = (state) => {
    // console.log(state)
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(Login);
