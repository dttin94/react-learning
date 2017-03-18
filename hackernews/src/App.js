import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

const isSearched = (searchTerm) => (item) =>
  !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase())
  || item.author.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list,
      searchTerm: '',
    }

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id) {
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({ list: updatedList });
  }

  render() {
    const {list, searchTerm } = this.state;
    return (
      <div className="App">
        <Search value={searchTerm} onChange={this.onSearchChange}/>
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    );
  }
}

class Search extends Component {
  render() {
    const { value, onChange } = this.props;

    return (
      <form>
        <input type="text" value={searchTerm} onChange={this.onSearchChange}/>
      </form>
    )
  }
}

class Table extends Component {
  render() {
    const { list, pattern, onDismiss } = this.props;
    return (
      { list.filter(isSearched(searchTerm)).map(item => {
        return (
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button onClick={() => this.onDismiss(item.objectID)} type="button">Dismiss</button>
            </span>
          </div>
          );
      })}
    )
  }
}


/*const items = []

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialItems: [
        "Apples",
        "Broccoli",
        "Chicken",
        "Duck",
        "Eggs",
        "Fish",
        "Granola",
        "Hash Browns"
      ],
      items
    }

    this.filterList = this.filterList.bind(this)
  }

  componentWillMount() {
    this.setState({ items: this.state.initialItems });
  }

  filterList(event) {
    const updatedList = this.state.initialItems.filter(
      (item) => item.toLowerCase().includes(event.target.value.toLowerCase()));
    this.setState({ items: updatedList });
  }

  render () {
    const { items } = this.state;

    return (
      <div className="filter-list">
        <input type="text" placeholder="Search" onChange={this.filterList}/>
        <List items={items}/>
      </div>
    );
  }
}

class List extends Component {
  render () {
    return (
      <ul>
        { this.props.items.map(item => <li key={item}>{item}</li>) }
      </ul>
    )
  }
}*/

export default App;
