import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Hats from './Hats'
import Shoes from './Shoes'
import { Button, Icon } from 'react-materialize'

class Shop extends Component {
    constructor(){
        super()
        let shoe1 = { name: 'Oxford', price: 15, picture: '/images/shoes/oxford.jpeg', type: 'shoe', itemKey: 1 } 
        let shoe2 = { name: 'Huarache', price: 25, picture: '/images/shoes/huarache.jpeg', type: 'shoe', itemKey: 2 } 
        let shoe3 = { name: 'Jazz', price: 10, picture: '/images/shoes/jazz.jpeg', type: 'shoe', itemKey: 3 } 
        let shoe4 = { name: 'Kitten', price: 30, picture: '/images/shoes/kitten.jpeg', type: 'shoe', itemKey: 4 } 

        let hat1 = { name: 'Baseball', price: 45, picture: '/images/hats/baseball.jpeg', type: 'hat', itemKey: 5 }
        let hat2 = { name: 'Beanie', price: 15, picture: '/images/hats/beanie.jpeg', type: 'hat', itemKey: 6 } 
        let hat3 = { name: 'Beret', price: 35, picture: '/images/hats/beret.jpeg', type: 'hat', itemKey: 7 } 
        let hat4 = { name: 'Boater', price: 25, picture: '/images/hats/boater.jpeg', type: 'hat', itemKey: 8 }  
        
        this.state = {
            hats : [hat1,hat2,hat3,hat4],
            shoes : [shoe1,shoe2,shoe3,shoe4],
        }
    }
    
    render() {
        return (
            <div>
                <h5>Welcome to the store {localStorage.getItem("username")}</h5>
                <Link to="/shop/shoes">
                    <Button id="shoesButton" class="center-align" waves='light'>SHOES</Button>
                </Link>&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/shop/hats">
                    <Button id="hatsButton" class="center-align" waves='light'>HATS</Button>
                </Link>
                <Switch>
                    <Route path="/shop/hats" render={()=>{
                        return <Hats addProduct={this.props.addProduct} hats={this.state.hats} />
                    }}/>
                    <Route path="/shop/shoes" render={()=>{
                        return <Shoes addProduct={this.props.addProduct} shoes={this.state.shoes} />
                    }}/>
                </Switch>
            </div>
        ) 
    }
}

export default Shop