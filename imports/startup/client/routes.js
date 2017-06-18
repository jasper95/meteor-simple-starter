import React from 'react';
import { mount } from 'react-mounter';
import MainLayout  from '../../ui/layouts/MainLayout.jsx';
import {Home, About, Login, Register} from '../../ui/pages';

const adminRoutes = FlowRouter.group({
    name: 'admin',
    triggersEnter: [function(context, redirect){
      if(Meteor.loggingIn() || Meteor.userId()){
        let route = FlowRouter.current();
        if(['login', 'register'].indexOf(route.route.name) < 0) {
          Session.set('redirectAfterLogin', route.path)
        }
      } else FlowRouter.go('login');
    }],
});

const exposedRoutes = FlowRouter.group({
  triggersEnter : [function(context, redirect){
    if(Meteor.userId())
      redirect('/')
  }]
});

adminRoutes.route('/', {
  name : 'home',
  action: function(){
    mount ( MainLayout, {
      content: ( <Home />)
    })
  }
});

adminRoutes.route('/about', {
  name: 'about',
  action: function(){
    mount ( MainLayout, {
      content: ( <About />)
    })
  }
});

exposedRoutes.route('/login', {
  name : 'login',
  action: function(){
    mount ( MainLayout, {
      content: ( <Login />)
    })
  }
});

exposedRoutes.route('/register', {
  name: 'register',
  action: function(){
    mount ( MainLayout, {
      content: ( <Register />)
    })
  }
});
