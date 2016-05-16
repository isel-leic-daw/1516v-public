import React from 'react';
import ReactDom from 'react-dom';

import {createStore, combineReducers, applyMiddleware} from 'redux';

import {Provider, connect} from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import fetch from 'universal-fetch';

const INC = 'INC';
const DEC = 'DEC';
const PUSH_MESSAGE = 'PUSH_MESSAGE';
const GET_REPOS_START = 'GET_REPOS_START';
const GET_REPOS_COMPLETE = 'GET_REPOS_COMPLETE';
const GET_REPOS_ERROR = 'GET_REPOS_ERROR';

function actionInc(){
  return {type: INC};
}

function actionDec(){
  return {type: DEC};
}

function actionPushMessage(msg){
  return {type: PUSH_MESSAGE, msg: msg};
}

function actionGetReposError(error){
  return {type: GET_REPOS_ERROR, error: error};
}

function actionGetReposComplete(resp){
  return {type: GET_REPOS_COMPLETE, resp: resp};
}

function actionGetReposStart(user){
  return dispatch => {
    dispatch({type:GET_REPOS_START, user:user});
    fetch(`https://api.github.com/users/${user}/repos`)
    .then(resp => {     
      if(resp.status !== 200){
        throw new Error(resp.status);
      }else{
        return resp.json();
      }
    })
    .then(body => {
      dispatch(actionGetReposComplete(body));
    })
    .catch(error => {
      dispatch(actionGetReposError(error));
    });
  }
}

function reposReducer(state = {user: null, error: null, repos:[], fetching:false}, action){  
  switch(action.type){
    case GET_REPOS_START:     
      return {user:action.user, fetching: true, error:null, repos:[]};

    case GET_REPOS_ERROR:     
      return Object.assign({}, state, {fetching:false, error: action.error.message});

    case GET_REPOS_COMPLETE:              
      return Object.assign({}, state, {fetching: false, error: null, repos: action.resp});

    default:
      return state;
  }
}

function counterReducer(state = {counter:0}, action){
  switch(action.type){
    case INC:
      return Object.assign({}, state, {counter: state.counter+1});

    case DEC:
      return Object.assign({}, state, {counter: state.counter-1});
    
    default:
      return state;
  }
}

function messageReducer(state = {messages:[]}, action){
  switch(action.type){
    case PUSH_MESSAGE:
      var newState = Object.assign({}, state);
      newState.messages.push(action.msg);
      return newState;

    default:
      return state;
  }
} 

const reducer = combineReducers({
  repos: reposReducer,
  counter: counterReducer,
  messages: messageReducer
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

const mapStateToProps = state => {
  return {
    counter: state.counter.counter
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onUpClick: () => {dispatch(actionInc());},
    onDownClick: () => {dispatch(actionDec());}
  }
}


const Counter = ({counter, onUpClick, onDownClick}) => {  
  return (
    <span>
      <button onClick={onDownClick}>Down</button>
      {counter}
      <button onClick={onUpClick}>Up</button>
    </span>
  );
}

const ConnectedCounter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);

const RepoControl = ({user, error, fetching, repos, onClick}) => {
  let input;
  return (
    <div>
      <input ref={node => {input = node}} />
      <button onClick={()=>onClick(input.value)}>Fetch</button>
      <RepoList user={user} error={error} fetching={fetching} repos={repos}/>
    </div>
  );
}

const RepoList = ({user, error, fetching, repos}) => {
  if(!user) return <p>no user</p>
  if(fetching) return <p>fetching...</p>
  if(error){
    return (
      <div>
        <p>{user}</p>      
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div>
      <p>{user}</p>      
      <ul>{repos.map(repo => <li key={repo.id} >{repo.name}</li>)}</ul>
    </div>
  );
}

const ConnectedRepoControl = connect(
  state => state.repos,
  dispatch => ({onClick: user => dispatch(actionGetReposStart(user))})
)(RepoControl);  


store.subscribe(() => console.log(store.getState()));
store.dispatch(actionInc());

setTimeout(() => store.dispatch(actionInc()), 1000);
setTimeout(() => store.dispatch(actionGetReposStart('pmhsfelix')), 2000);

ReactDom.render(
  <Provider store={store}>
    <ConnectedRepoControl />    
  </Provider>,
  document.getElementById('placeholder')
);

