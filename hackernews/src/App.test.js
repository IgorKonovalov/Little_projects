/* eslint-disable no-undef, prefer-const, camelcase */
import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme'
import App, {Search, Button, Table} from './App'

// eslint-disable-next-line
describe('App', () => {

  it('renders', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
  })

  test('snapshots', () => {
    const component = renderer.create(<App />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

})

describe('Search', () => {

  it('renders', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Search>Search</Search>, div)
  })

  test('snapshots', () => {
    const component = renderer.create(<Search>Search</Search>)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

})

describe('Button', () => {

  it('renders', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Button>GIMME MORE!</Button>, div)
  })

  test('snapshots', () => {
    const component = renderer.create(<Button>GIMME MORE!</Button>)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render to static HTML', () => {
    const element = shallow(<Button>GIMME MORE!</Button>)
    expect(element.text()).toEqual('GIMME MORE!')
  })

})

describe('Table', () => {

  const props = {
    list: [
      {title: '1', author: '1', num_comments: 1, points: 1, objectID: 'y'},
      {title: '2', author: '2', num_comments: 2, points: 2, objectID: 'z'},
    ],
    sortKey: 'TITLE',
    isSortReverse: 'false',
  }

  it('renders', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Table {...props} />, div)
  })

  test('snapshots', () => {
    const component = renderer.create(<Table {...props} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  // enzyme shallow - renders component without children
  // https://github.com/vjwilson/enzyme-example-jest/blob/master/src/__tests__/Foo-test.js
  it('shows two items in list', () => {
    const element = shallow(<Table {...props} />)
    expect(element.find('div.table-row').length).toBe(2)
  })

})
