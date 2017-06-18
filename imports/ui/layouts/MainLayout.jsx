import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class MainLayout extends Component {
  handleLogout(){
    Meteor.logout(() => {
      FlowRouter.go('/login');
    })
  }

  render(){
    return (
      <div id="main-layout">
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/">Project name</a>
            </div>
            <div id="navbar" className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                {this.props.currentUser ?
                  <li><a onClick={this.handleLogout.bind(this)} href="#">Logout</a></li> :
                  <li><a href="/login">Login</a></li>
                }
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="starter-template">
            {this.props.content}
          </div>
        </div>
      </div>
    )
  }
}
export default createContainer( () =>{
  return {
      currentUser: Meteor.user(),
  }
}, MainLayout);
