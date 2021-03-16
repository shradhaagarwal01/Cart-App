import Cart from './Cart'
import Navbar from './Navbar'
import React, { Component } from 'react';
import firebase from 'firebase/app'

class App extends Component {
  constructor(){
    super();
    this.state = {
        products: [],
        loading:true

    }
    this.db = firebase.firestore();
}

componentDidMount(){
  //first way of rendering products from database

  // firebase
  // .firestore()
  // .collection('products')
  // .get()
  // .then((snapshot) => {
  //   console.log(snapshot);
  //   snapshot.docs.map((doc) => {
  //     console.log(doc.data)
  //   });
  //   const products = snapshot.docs.map((doc) => {
  //     const data = doc.data()
  //     data['id'] = doc.id
  //     return data;
  //   })
  //   this.setState({
  //     products,
  //     loading: false
  //   })

  // })

  //attaching a listerner so that changes gets updated itself
  this.db
  .collection('products')
  //quering the data
   //.where('price', '>=', 1000 )
   //.where('title','==',"Laptop")
   //sort the data according to price
   .orderBy('price','desc')
  .onSnapshot((snapshot) => {
      console.log(snapshot);
      // eslint-disable-next-line
      snapshot.docs.map((doc) => {
        console.log(doc.data)
      });
      const products = snapshot.docs.map((doc) => {
        const data = doc.data()
        data['id'] = doc.id
        return data;
      })
      this.setState({
        products,
        loading: false
      })
    })
  }


/*handleIncreaseQuantity = (product) => {
    const {products} = this.state;
    const index = products.indexOf(product);
    products[index].qty +=1;
    this.setState({
        products
    })
}*/

handleIncreaseQuantity = (product) => {
  const {products} = this.state;
  const index = products.indexOf(product);
  const docRef = this.db.collection('products').doc(products[index].id)
  docRef
  .update({
    qty:products[index].qty+1
  })
  .then(() => {
    console.log('Document Updates Successdully')
  })
  .catch((err) => {
    console.log(err)
  })

}


/*handleDecreaseQuantity = (product) => {
    const {products} = this.state;
    const index = products.indexOf(product);
    if(products[index].qty>1){
        products[index].qty -=1;
    }
    this.setState({
        products
    })
}*/

handleDecreaseQuantity = (product) => {
  const {products} = this.state;
  const index = products.indexOf(product);
  const docRef = this.db.collection('products').doc(products[index].id)
  if (products[index].qty > 1){
  docRef
  .update({
    qty:products[index].qty-1
  })
  .then(() => {
    console.log('Document Updates Successdully')
  })
  .catch((err) => {
    console.log(err)
  })
}
}

/*handleDeleteProduct = (id) => {
    const {products} = this.state;
    const items = products.filter((item) => item.id!==id);
    this.setState({
        products:items
    })
}*/

handleDeleteProduct = (id) => {
  const docRef = this.db.collection('products').doc(id);
  docRef
  .delete()
  .then(() => {
    console.log("Deleted Successfully")
  })
  .catch((err) => {
    console.log(err)
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

addProduct = () => {
  this.db
  .collection('products')
  .add({
    img:'',
    price: 900,
    qty: 3,
    title:"Washing Machine"
  })
  .then((docRef) => {
    console.log(docRef)
  })
  .catch((e) => {
    console.log(e)
  })
}

  render() {
    const {products, loading} = this.state
    return (
      <div className="App">
      <Navbar count={this.getCartCount()}/>
      {/* <button style={{padding:20,fontSize:20}} onClick={this.addProduct} >Add Product</button> */}
      <Cart
      products = {products}
      onIncreaseQuantity = {this.handleIncreaseQuantity}
      onDecreaseQuantity = {this.handleDecreaseQuantity}
      onDeleteProduct = {this.handleDeleteProduct}
      />
      {loading && <h1>Loading Products...</h1>}
      <div style={{fontSize:20,padding:10}}>TOTAL: {this.getCartTotal()}</div>
    </div>
    );
  }
}

export default App;