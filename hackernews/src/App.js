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
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            <b>Search:</b>
          </Search>
        </div>
        <Table
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    )
  }
}

const Search = ({value, onChange, children}) =>
  <form>
    <span>{children} </span>
    <input
      type="text"
      value={value}
      onChange={onChange}
    />
  </form>

//eslint-disable-next-line
const Table = ({list, pattern, onDismiss}) =>
  <div className="table">
    {list.filter(isSearched(pattern)).map(item =>
      <div key={item.objectID} className="table-row">
        <span style={{width: '40%'}}><a href={item.url}>{item.title}</a></span>
        <span style={{width: '30%'}}>{item.author}</span>
        <span style={{width: '10%'}}>{item.num_comments}</span>
        <span style={{width: '10%'}}>{item.points}</span>
        <span style={{width: '10%'}}>
          <Button onClick={() => onDismiss(item.objectID)} className="button-inline">
            Dismiss
          </Button>
        </span>
      </div>,
    )}
  </div>

const Button = ({onClick, className = '', children}) =>
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>

export default App
