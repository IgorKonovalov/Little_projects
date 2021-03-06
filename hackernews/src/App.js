import React, {Component, PropTypes} from 'react'
import {sortBy} from 'lodash'
import classNames from 'classnames'
import './App.css'

const DEFAULT_QUERY = 'react'
const DEFAULT_PAGE = 0
const DEFAULT_HPP = 10

const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search'
const PARAM_SEARCH = 'query='
const PARAM_PAGE = 'page='
const PARAM_HPP = 'hitsPerPage='

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      isLoading: false,
    }
  }

  componentDidMount() {
    const {searchTerm} = this.state
    this.setState({searchKey: searchTerm})
    this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE)
  }

  needsToSearchTopStories = searchTerm => !this.state.results[searchTerm]

  onSearchSubmit = event => {
    const {searchTerm} = this.state
    this.setState({searchKey: searchTerm})
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE)
    }
    event.preventDefault()
  }

  setSearchTopstories = result => {
    const {hits, page} = result
    this.setState(prevState => {
      const {searchKey, results} = this.state
      const oldHits = results && results[searchKey] ? results[searchKey].hits : []
      const updatedHits = [...oldHits, ...hits]
      return {
        results: {
          ...results,
          [searchKey]: {hits: updatedHits, page},
        },
        isLoading: false,
      }
    })
  }


  fetchSearchTopStories = (searchTerm, page) => {
    this.setState({isLoading: true})

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result))
  }


  onSearchChange = event => this.setState({searchTerm: event.target.value})

  onDismiss = id => {
    this.setState(prevState => {
      const {searchKey, results} = this.state
      const {hits, page} = results[searchKey]
      const updatedHits = hits.filter(item => item.objectID !== id)
      return {
        results: {
          ...results,
          [searchKey]: {hits: updatedHits, page},
        },
      }
    })
  }

  render() {

    const {
      searchTerm,
      results,
      searchKey,
      isLoading,
    } = this.state

    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page
    ) || 0

    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || []

    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>
            <b>Search</b>
          </Search>
        </div>
        <Table
          list={list}
          onDismiss={this.onDismiss}
        />
        <div className="interactions">
          <ButtonWithLoading isLoading={isLoading} onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
            GIMME MORE!
          </ButtonWithLoading>
        </div>
      </div>
    )
  }
}


// font-awesome here
const Loading = () =>
  <i className="fa fa-spinner fa-pulse fa-3x fa-fw" style={{padding: '40px'}}></i>

const Button = ({onClick, className = '', children}) =>
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>

Button.PropTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

// HOC
// eslint-disable-next-line
const withLoading = Component => ({isLoading, ...rest}) => isLoading ? <Loading /> : <Component {...rest} />

const ButtonWithLoading = withLoading(Button)

const Search = ({value, onChange, onSubmit, children}) =>
  <form onSubmit={onSubmit}>
    <input
      type="text"
      value={value}
      onChange={onChange}
    />
    <button type="submit">
      {children}
    </button>
  </form>

Search.PropTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  children: PropTypes.node.isRequired,
}

class Table extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sortKey: 'NONE',
      isSortReverse: false,
    }
  }

  onSort = sortKey => {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse
    this.setState({sortKey, isSortReverse})
  }

  PropTypes = {
    list: PropTypes.arrayOf(
      PropTypes.shape({
        objectID: PropTypes.string.isRequired,
        title: PropTypes.string,
        author: PropTypes.string,
        // eslint-disable-next-line
        num_comments: PropTypes.number,
        points: PropTypes.number,
      })).isRequired,
    sortKey: PropTypes.string,
    onSort: PropTypes.func,
    onDismiss: PropTypes.func.isRequired,
  }

  render() {
    const {list, onDismiss} = this.props
    const {sortKey, isSortReverse} = this.state
    const sortedList = SORTS[sortKey](list)
    const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList
    return (
      <div className="table">
        <div className="table-header">
          <span style={{width: '40%'}}>
            <Sort sortKey={'TITLE'} onSort={this.onSort} activeSortKey={sortKey}>Title</Sort>
          </span>
          <span style={{width: '30%'}}>
            <Sort sortKey={'AUTHOR'} onSort={this.onSort} activeSortKey={sortKey}>Author</Sort>
          </span>
          <span style={{width: '10%'}}>
            <Sort sortKey={'COMMENTS'} onSort={this.onSort} activeSortKey={sortKey}>Comments</Sort>
          </span>
          <span style={{width: '10%'}}>
            <Sort sortKey={'POINTS'} onSort={this.onSort} activeSortKey={sortKey}>Points</Sort>
          </span>
          <span style={{width: '10%'}}>
            Archive
          </span>
        </div>
        {reverseSortedList.map(item =>
          <div key={item.objectID} className="table-row">
            <span style={{width: '40%'}}><a href={item.url} target="_blank">{item.title}</a></span>
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
    )
  }
}

const Sort = ({sortKey, activeSortKey, onSort, children}) => {
  const sortClass = classNames('button-inline', {'button-active': sortKey === activeSortKey})
  return (
    <Button onClick={() => onSort(sortKey)} className={sortClass}>{children}</Button>
  )
}

export default App

export {Button, Search, Table}
