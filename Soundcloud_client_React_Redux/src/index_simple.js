/*eslint-disable func-style, default-case*/
import React from 'react'
import ReactDOM from 'react-dom'
import {createLogger} from 'redux-logger'
import {createStore, combineReducers, applyMiddleware, bindActionCreators} from 'redux'

const greetingReducer = (state = '', action) => {
  switch (action.type) {
    case 'SAY_HELLO': return 'Hello '
    case 'SAY_GOODBYE': return 'Goodbye '
  }
  return state
}

const nameReducer = (state = 'John', action) => {
  switch (action.type) {
    case 'CHANGE_NAME': return 'Joel'
  }
  return state
}

const actionLogger = ({dispatch, getState}) => next => action => { // использую вместо этого createLogger()
  console.log(action)
  return next(action)
}

const reducers = combineReducers({
  greeting: greetingReducer,
  name: nameReducer,
})

const middleware = applyMiddleware(createLogger())
const store = createStore(reducers, {greeting: '(Roll over me) '}, middleware)

const changeName = () => {
  return {type: 'CHANGE_NAME'}
}
const hello = () => {
  return {type: 'SAY_HELLO'}
}
const goodbye = () => {
  return {type: 'SAY_GOODBYE'}
}

const Hello = props =>
  <div
    onMouseOver={props.hello}
    onMouseOut={props.goodbye}
    onClick={props.changeName}>
    {props.greeting}{props.name}
  </div>

const render = () => {
  ReactDOM.render(
    <Hello
      greeting={store.getState().greeting}
      name={store.getState().name}
      {...bindActionCreators({changeName, hello, goodbye}, store.dispatch)}
    />,
    document.getElementById('root'),
  )
}

render()
store.subscribe(render)
