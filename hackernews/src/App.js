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

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list,
    }
  }

  onDismiss = id => {
    const updatedList = this.state.list.filter(item => item.objectID !== id)
    this.setState({list: updatedList})
  }

  render() {
    return (
      <div className="App">
        {this.state.list.map(item =>
          <div key={item.objectID}>
            <span><a href={item.url}>{item.title}</a></span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button
                type="button"
                onClick={() => this.onDismiss(item.objectID)}
                >Dismiss</button>
            </span>
          </div>,
        )}
      </div>
    )
  }
}


export default App
