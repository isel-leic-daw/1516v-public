import React from 'react';
import ReactDom from 'react-dom';

import {UserManager} from 'oidc-client'
var settings = {
  authority: 'https://id.example.com/',
  client_id: 'js.tokenmanager',
  redirect_uri: 'http://localhost:5000/index.html',
  popup_redirect_uri: 'http://localhost:5000/index.html',
  post_logout_redirect_uri: 'http://localhost:5000/user-manager-sample.html',
  response_type: 'id_token token',
  scope: 'openid email',
  silent_redirect_uri: 'http://localhost:5000/user-manager-sample-silent.html',
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true
};
const mgr = new UserManager(settings);
mgr.signinPopupCallback();

class ApiRequestComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      response: undefined
    }
  }
 
  getToken(){
    return mgr.getUser()
    .then(user => {
      if(user){
        return user.access_token
      }else{
        return mgr.signinPopup()
        .then(user => user.access_token)
      }
    })  
  }
  
  doRequest(){
    this.getToken()
    .then(token => {
      let headers = new Headers()
      headers.append('Authorization','Bearer '+token);
      fetch('https://app1.example.com/api/resource', {
        headers: headers
      })
      .then( resp => resp.json() )
      .then( body => {
        this.setState({
          response: JSON.stringify(body, null, 2)
        })
      })
    })
  };
  
  render(){
    return (<div>
      <button onClick={this.doRequest.bind(this) }>Do Request</button>
      <pre>
        {this.state.response}
      </pre>
    </div>)
  }
}

class UserComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    }
  }

  doGetUser() {
    mgr.getUser()
      .then(user => {
        if (user) {
          this.setState({ user: JSON.stringify(user.profile, null, 2) })
        } else {
          mgr.signinPopup()
            .then(user => {
              console.log(user);
              this.setState({ user: JSON.stringify(user.profile, null, 2) })
            })
        }
      })
  }
  
  render() {
    return (<div>
      <button onClick={this.doGetUser.bind(this) }>Get User</button>
      <pre>
        {this.state.user}
      </pre>
    </div>)
  }
}

const App = (props) => (
  <div>
    <ApiRequestComponent />
    <UserComponent />
  </div>
)

ReactDom.render(<App/>, document.getElementById('placeholder'));

