import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Button } from 'react-materialize'

class Hats extends Component {
    
    render() {
        let hatsArray = this.props.hats
        hatsArray = hatsArray.map((element) =>{
            return (
                <div class="col s12 m6">
                    <h6>{element.name}</h6>
                    <h6>Price : {element.price}</h6><br/>
                    <img src={element.picture}/>
                    <br />
                    <Button onClick={() => { this.props.addProduct(element.name, element.price, element.picture, element.type, element.itemKey) }} class="center-align" waves='light'>Select Product</Button>
                </div>
            )
        })
        return (
            <div class="row">
                {hatsArray}
            </div>
        )
    }
}

export default Hats