import Cart from './Cart'
import Navbar from './Navbar'
import React, { Component } from 'react';

class App extends Component {
  constructor(){
    super();
    this.state = {
        products: [
            {
                id:1,
                price: 1425,
                title: 'Watch',
                qty: 1,
                img: 'https://bit.ly/3tdH82A'
            },
            {
                id:2,
                price: 9876,
                title: 'Mobile Phone',
                qty: 2,
                img: 'https://bit.ly/3eB5tLy'
            },
            {
                id:3,
                price: 8827,
                title: 'Laptop',
                qty: 4,
                img: 'https://bit.ly/3qIU5Ql'
            }
        ]
    }
}

handleIncreaseQuantity = (product) => {
    const {products} = this.state;
    const index = products.indexOf(product);
    products[index].qty +=1;
    this.setState({
        products:products
    })
}

handleDecreaseQuantity = (product) => {
    const {products} = this.state;
    const index = products.indexOf(product);
    if(products[index].qty>1){
        products[index].qty -=1;
    }
    this.setState({
        products:products
    })
}

handleDeleteProduct = (id) => {
    const {products} = this.state;
    const items = products.filter((item) => item.id!==id);
    this.setState({
        products:items
    })
}

getCartCount = () => {
  const {products} = this.state;
  let count = 0;
  products.forEach(product => {
    count = product.qty+count
  });
  return count
}

getCartTotal = () => {
  const {products} = this.state;
  let cartTotal = 0;
  products.forEach((product) => {
    cartTotal = cartTotal+(product.qty*product.price)
  })
  return cartTotal;
}

  render() {
    const {products} = this.state
    return (
      <div className="App">
      <Navbar count={this.getCartCount()}/>
      <Cart
      products = {products}
      onIncreaseQuantity = {this.onIncreaseQuantity}
      onDecreaseQuantity = {this.onDecreaseQuantity}
      onDeleteProduct = {this.onDeleteProduct}
      />
      <div style={{fontSize:20,padding:10}}>TOTAL: {this.getCartTotal()}</div>
    </div>
    );
  }
}

export default App;