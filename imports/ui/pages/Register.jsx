import React, {Component} from 'react';

export default class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      passwordMatch : false
    }
  }

  handleSubmit(e){
    e.preventDefault();
    const {registerEmail, registerPassword} = this.refs;
    Accounts.createUser(
      {
        email: registerEmail.value,
        password: registerPassword.value
      },
      function(error) {
        if (error) {
          console.log("there was an error: " + error.reason);
        } else {
          FlowRouter.go('/');
        };
      }
    );
  }

  handlePasswordCheck(){
    let {registerPassword, registerConfirmPassword} = this.refs;
    registerPassword = registerPassword.value;
    registerConfirmPassword = registerConfirmPassword.value;
    if(registerPassword && registerConfirmPassword && (registerPassword === registerConfirmPassword)){
      this.setState({
        passwordMatch: true
      });
    } else {
      this.setState({
        passwordMatch: false
      });
    }
  }

  render(){
    return (
      <form className="form-signin" onSubmit={this.handleSubmit.bind(this)}>
        <h2 className="form-signin-heading">Please sign in</h2>
        <input type="email" ref="registerEmail" className="form-control" placeholder="Email address" required autoFocus/>
        <input type="password" ref="registerPassword" className="form-control" onChange={this.handlePasswordCheck.bind(this)} placeholder="Password" required/>
        <input type="password" ref="registerConfirmPassword" onChange={this.handlePasswordCheck.bind(this)} className="form-control" placeholder="Confirm Password" required/>
        <div className="checkbox">
          <label>
            <input type="checkbox" value="remember-me"/> Remember me
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" disabled={!this.state.passwordMatch} type="submit">Sign in</button>
      </form>
    )
  }
}
