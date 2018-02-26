import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Shop from './Shop'
import Nav from './Nav'
import logo from './logo.svg'
import Cart from './Cart'
import axios from 'axios'
import './App.css'
import '../../css/styles.css'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      shoppingCart: [],
      userName: ''
    }
    this.addProduct = this.addProduct.bind(this);
    this.formHandler = this.formHandler.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }
  
  addProduct(name, price, picture, type, itemKey) {
    let productToBeAdded = { name, price, picture, type, itemKey}
    let tempCart = this.state.shoppingCart.concat(productToBeAdded)
    localStorage.setItem('shoppingcart',tempCart)
      console.log('tempCart',tempCart)

    this.setState({
      shoppingCart: tempCart
    })
  }

  removeItem(key){
    let newShoppingCart = this.state.shoppingCart.filter((element)=>
      element.itemKey !== key
    )
    //axios.post('http://localhost:8080/shoppingcart', { cart: newShoppingCart, username: this.state.userName })
    this.setState({
      shoppingCart : newShoppingCart
    })
  }

  updateUsername(event){
    localStorage.setItem('username', event.target.value)
    this.setState({
      userName : event.target.value
    })
  }

  componentDidMount() {
    
  }

  componentDidUpdate() {
    
    let tempShoppingCart = this.state.shoppingCart
    let tempUsername = this.state.userName === '' ? localStorage.getItem('username')  : this.state.username
    console.log('tempShoppingCart',tempShoppingCart)
    console.log('tempUsername', tempUsername)
    axios.post('http://localhost:8080/shoppingcart', {
      cart: tempShoppingCart,
      username: tempUsername
    })
    
  }

  formHandler(event){
    event.preventDefault()
    this.setState({
      shoppingCart: []
    })
  }
  
  render() {
    console.log(this.state.shoppingCart)
    console.log(this.state.userName)
    let cart = localStorage.getItem('username')
    return (
      <div className="App">
        <header className="jumbotron">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Shopping Centre</h1>
        </header>
        
        <Nav />
        <Switch>
          <Route exact path='/' render={()=>{
            return <Home 
                         shoppingCart={this.state.shoppingCart} 
                         clearStateShoppingCart={this.clearStateShoppingCart} 
                         updateUsername={this.updateUsername} 
                         formHandler={this.formHandler} 
                         removeItem={this.removeItem}
                         userName={this.state.userName}/>
          }} />
          <Route path='/shop' render={()=>{
            return <Shop addProduct={this.addProduct} />
          }} />
          <Route path='/cart' render={() => {
            return <Cart removeItem={this.removeItem} shoppingCart={this.state.shoppingCart} />
          }} />
        </Switch>
      </div>
    );
  }
}

export default App;
