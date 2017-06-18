import React, {Component} from 'react';

export default class Login extends Component {

  handleSubmit(e){
    e.preventDefault();
    const {loginEmail, loginPassword} = this.refs;
    Meteor.loginWithPassword(loginEmail.value, loginPassword.value, function(error) {
      if (error) {
        console.log("There was an error:" + error.reason);
      } else {
        const redirect = Session.get('redirectAfterLogin');
        if(redirect)
          FlowRouter.go(redirect);
        else FlowRouter.go('home');
      }
    });
  }

  render(){
    return (
      <form className="form-signin" onSubmit={this.handleSubmit.bind(this)}>
        <h2 className="form-signin-heading">Please sign in</h2>
        <input type="email" ref="loginEmail" className="form-control" placeholder="Email address" required autoFocus/>
        <input type="password" ref="loginPassword" className="form-control" placeholder="Password" required/>
        <div className="checkbox">
          <label>
            <input type="checkbox" value="remember-me"/> Remember me
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
    )
  }
}
