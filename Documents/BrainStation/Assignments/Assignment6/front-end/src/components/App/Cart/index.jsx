import React, { Component } from 'react'
import { Button } from 'react-materialize'

class Cart extends Component {
    constructor(){
        super()
    }
    render() {
        let cart = this.props.shoppingCart
        let totalPrice = 0
        let finalCart = cart.map((element)=>{
            totalPrice += element.price
            return (
                <div class="col s12 m6">
                    <h6>{element.name}</h6>
                    <h6>Price : {element.price}</h6>
                    <img src={element.picture} /><br/>
                    <Button onClick={(e) => this.props.removeItem(element.itemKey)} class="center-align" waves='light'>Remove Item</Button>
                </div>
            )
        })
        return (
            <div class="row">
                <h5>This is your shopping cart {localStorage.getItem("username")}</h5>
                <h5>Total Price : {totalPrice}</h5>
                {finalCart}
            </div>
        )
    }
}

export default Cart