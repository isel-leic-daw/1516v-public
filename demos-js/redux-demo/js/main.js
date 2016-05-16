import React from 'react';
import ReactDom from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {connect, Provider} from 'react-redux';
import fetch from 'universal-fetch';

const INC = 'INC';
const DEC = 'DEC';
const RESET = 'RESET';

function createActionInc(){
  return {type: INC};
}

function createActionDec(){
  return {type: DEC};
}

function createActionReset(value){
  return {type: RESET, value:value};
}

function counterReducer(state={counter:0}, action){

  switch(action.type){
    case INC:
      return {counter: state.counter+1};

    case DEC:
      return {counter: state.counter-1};

    case RESET:
      return {counter: action.value};

    default:
      return state;
  }
}

//-- repos
// state
// - array of repositories, where each element has the repo info
// - user name
// - error
// - isFetching

const GET_REPOS_START = 'GET_REPOS_START';
const GET_REPOS_COMPLETE = 'GET_REPOS_COMPLETE';
const GET_REPOS_ERROR = 'GET_REPOS_ERROR';

function createActionGetReposStart(user){
  return {type:GET_REPOS_START, user:user}
}

function createActionGetReposComplete(repos){
  return {type: GET_REPOS_COMPLETE, repos:repos }
}

function createActionGetReposError(error){
  return {type: GET_REPOS_ERROR, error:error}
}

function doFetch(user, dispatch){
  dispatch(createActionGetReposStart(user));
  fetch(`https://api.github.com/users/${user}/repos`)
  .then(resp => {
    if(resp.status !== 200){
      throw new Error(resp.status)
    }else{
      return resp.json()
    }
  })
  .then(body => {
    dispatch(createActionGetReposComplete(body));
  })
  .catch(error => {
    dispatch(createActionGetReposError(error.message));
  });
}

function getReposReducer( state = {
  isFetching: false,
  user: undefined,
  repos: undefined,
  error: undefined
}, action){

  switch(action.type){
    case GET_REPOS_START:
      return {isFetching: true, user:action.user, repos:undefined, error:undefined};

    case GET_REPOS_ERROR:
      return Object.assign({}, state, {isFetching: false, error: action.error});
    
    case GET_REPOS_COMPLETE:
      return Object.assign({}, state, {isFetching: false, repos: action.repos});

    default:
      return state;
  }
}

const RepoList = ({repos=[]}) => (
  <ul>
    {repos.map(repo => <li key={repo.id}>{repo.name}</li>)}
  </ul>
)

const IsFetching = () => (<span>fetching...</span>)
const FetchError = ({error}) => (<span>Error: {error}</span>)

const RepoListComponent = ({user, isFetching, error, repos, onFetch}) => {
  let body = isFetching ? 
    <IsFetching /> : 
    error ?
      <FetchError error={error} /> : 
      <RepoList repos={repos} />;
  let input;
  return (
    <div>
      <div>
        <input ref={node => input=node}/>
        <button onClick={() => onFetch(input.value)}>Fetch</button> 
      </div>
      <div>{user}</div>
      {body}
    </div>
  );
};

const ConnectedRepoListComponent = connect(
  ({reposState: state}) => ({user:state.user, isFetching:state.isFetching, error: state.error, repos:state.repos}),
  dispatch => ({onFetch: user => doFetch(user, dispatch)})
)(RepoListComponent);


const store = createStore(
  combineReducers({
    counterState: counterReducer,
    reposState: getReposReducer
  }));  
store.subscribe(()=>console.log(store.getState()));


//store.dispatch(createActionReset(13));
//setTimeout(()=>store.dispatch(createActionInc()), 2000);
//setTimeout(()=>store.dispatch(createActionInc()), 4000);
//setTimeout(()=>store.dispatch(createActionDec()), 6000);

//setTimeout(()=>store.dispatch(createActionGetReposStart('pmhsfelix')), 2000);
//setTimeout(()=>store.dispatch(createActionGetReposComplete(
//    [{id:1, name:'repo 1'}, {id:2, name:'repo 2'}]
//  )), 4000);

// Representational components
const Counter = ({counter, onDown, onUp}) => (
  <div>
    <button onClick={onDown}>down</button>
    <span>{counter}</span>
    <button onClick={onUp}>up</button>
  </div>
)

const ConnectedCounter = connect(
  state => ({counter: state.counterState.counter}),
  dispatch => ({
    onDown: ()=>dispatch(createActionDec()),
    onUp: ()=>dispatch(createActionInc())
  })
)(Counter);

ReactDom.render(
  <Provider store={store}>
    <div>
      <ConnectedCounter />
      <ConnectedRepoListComponent />
    </div>
  </Provider>
, document.getElementById('placeholder'));





















