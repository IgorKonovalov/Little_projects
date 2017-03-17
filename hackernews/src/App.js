import React, {Component} from 'react'
import './App.css'

const list = [
  {
    title: 'React',
    url: 'http://igorkonovalov.github.io',
    author: 'igorkonovalov',
    // eslint-disable-next-line
    num_comments: '1',
    points: '2',
    objectID: 1,
  },
  {
    title: 'React2',
    url: 'http://igorkonovalov.github.io2',
    author: 'igorkonovalov',
    // eslint-disable-next-line
    num_comments: '1',
    points: '2',
    objectID: 3,
  }]

const isSearched = searchTerm => item =>
 !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase())


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list,
      searchTerm: '',
    }
  }

  onDismiss = id => {
    const updatedList = this.state.list.filter(item => item.objectID !== id)
    this.setState({list: updatedList})
  }

  onSearchChange = event => {
    this.setState({searchTerm: event.target.value})
  }

  render() {
    //eslint-disable-next-line
    const {searchTerm, list} = this.state
    return (
      <div className="App">
        <Search value={searchTerm} onChange={this.onSearchChange}>
          <b>Search:</b>
        </Search>
        <Table
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    )
  }
}

class Search extends Component {
  render() {
    const {value, onChange, children} = this.props
    return (
      <form>
        <span>{children} </span>
        <input
          type="text"
          value={value}
          onChange={onChange}
        />
      </form>
    )
  }
}

class Table extends Component {
  render() {
    //eslint-disable-next-line
    const {list, pattern, onDismiss} = this.props
    return (
      <div>
        {list.filter(isSearched(pattern)).map(item =>
          <div key={item.objectID}>
            <span><a href={item.url}>{item.title}</a></span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button
                type="button"
                onClick={() => onDismiss(item.objectID)}
                >Dismiss</button>
            </span>
          </div>,
        )}
    </div>
    )
  }
}




export default App
