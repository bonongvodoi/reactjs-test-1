import React, { Component}  from 'react';
import Tasklist from './components/Tasklist';



function LimitApi (limit, page) {
  return `http://localhost:3000/api/products?_limit=${limit}&_page=${page}`
}

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      products: [],
      limit: 30,
      currentPage: 1,
      isLoading: false,
      noMore: false
    }
  }

  // handleSort (sort) {
  //   fetch(`http://localhost:3000/api/products?_sort=${sort}`)
  //     .then(data => data.json())
  //     .then(result => this.setState({ products: result }))
  //     .catch(error => console.log(error))
  // }


  fetchProducts () {
    this.setState({ isLoading: true })
    fetch(LimitApi(this.state.limit, this.state.currentPage))
      .then(data => data.json())
      .then(result => this.setState({
        products: [...this.state.products,...result],
        isLoading: false,
        noMore: Object.keys(result).length === 0
      }))
      .catch(error => this.setState({ isLoading: false }))
  }

  onScroll() {
    if (!this.state.isLoading && !this.state.noMore && window.innerHeight + window.scrollY > document.body.offsetHeight + 10 ) {
      this.setState(({currentPage}) => ({ currentPage: currentPage + 1}), this.fetchProducts)
    }
  }

  componentDidMount() {
    this.fetchProducts()
    window.addEventListener('scroll', this.onScroll.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('scroll')
  }

  render() {
    return (
      <div>
        <Tasklist 
          products={this.state.products}
          isLoading={this.state.isLoading}
          noMore={this.state.noMore}
          // handleSort={this.handleSort.bind(this)}
        />
      </div>
    );
  }
}

export default App;