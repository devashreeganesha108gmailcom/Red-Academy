import React, { Component } from 'react'
import axios from 'axios'
import { Button, Icon } from 'react-materialize'

class Home extends Component {
    constructor(){
        super()
        this.state = {
            username : '',
            cart : []
        }
    }
    
    componentDidMount(){
        let username = localStorage.getItem('username')
        axios.get('http://localhost:8080/file')
            .then( (response) => {
                console.log('response.data',response.data);
            })
            .catch( (error) => {
                console.log(error)
            });
        
    }
    render() {
        let totalPrice = 0
        let cart = [] 
        cart = this.props.shoppingCart.map((element) => {
            totalPrice += element.price
            return (
                <div class="col s12 m6">
                    <h6>{element.name}</h6>
                    <h6>Price : {element.price}</h6>
                    <img src={element.picture} /><br />
                    <Button onClick={(e) => this.props.removeItem(element.itemKey)} class="center-align" waves='light'>Remove Item</Button>
                </div>
            )
        })
        
        let displayName
        if(this.props.userName === ''){
            displayName = localStorage.getItem('username') !== undefined ? localStorage.getItem('username') : ''
        }
        
        return (
            <div>
                <h5>Welcome {displayName} </h5>
                <form method="get" onSubmit={this.props.formHandler}>
                    <div class="row">
                        <div class="input-field col s6 offset-s3">
                            <div>
                                <input onKeyUp={this.props.updateUsername} type="text" class="center-align validate"/>
                                <label class="center-align">Enter Your Name</label>
                            </div>
                        </div>
                    </div>
                    <Button waves='light'>Clear List<Icon left>clear</Icon></Button>
                </form>
                <h5>Total Price : {totalPrice}</h5>
                <div class="row">{cart}</div>
            </div>
        )
    }
}

export default Home