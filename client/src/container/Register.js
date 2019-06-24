import React, { Component } from 'react';
import {connect} from 'react-redux';
import {registertheUser} from './../actions/index'

class Register extends Component {
    state={
        email:"",
        password:"",
        firstname:'',
        lastname:'',
        errorMsg:"",
        success:false
    }
    changeHandle(e){
        this.setState({
            [e.target.name]:e.target.value
        })
        this.validate(this.state.email, this.state.password, this.state.firstname, this.state.lastname)
      
    }
  
    submitForm(e){
    e.preventDefault();
    
      if(this.state.errorMsg.length>0){this.showError()}
        else{
            var data={
                "email":this.state.email,
                "password":this.state.password,
                "firstname": this.state.firstname,
                "lastname": this.state.lastname
            }
            this.props.dispatch(registertheUser(data))
            // console.log(data)
        }
    
    
    
        
    }
    componentWillReceiveProps(nextprops){
        // console.log(nextprops)
        if (nextprops.user.registerUser) {
            this.props.history.push('/')
        }
        else(this.showError(nextprops.user.registerUser.message))
    }

    showError(data = this.state.errorMsg) {
    document.getElementById('error').innerHTML = data}

      validate(email, pass,fname,lname) {
    //    console.log(pass.length)
       if ((email.length > 5) && (pass.length > 3) && (fname.length > 1) && (lname.length > 1)) {
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
  <div className="form-group">
    <label >First Name</label>
    <input type="text" name="firstname" className="form-control"  value={this.state.firstname}
    onChange={(e)=>{this.changeHandle(e)}} placeholder="firstname"/>
  </div>
  <div className="form-group">
    <label >Last Name</label>
    <input type="text" name="lastname" className="form-control"  value={this.state.lastname}
    onChange={(e)=>{this.changeHandle(e)}} placeholder="lastname"/>
  </div>
  <button type="submit" className="btn btn-primary">Sing Up</button>
</form> 



</div>
    );
  }
}
const mapStateToProps = (state) => {
    // console.log(state)l
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(Register);
