import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, NavItem, Row, Col } from 'react-materialize'
class Nav extends Component {
    render() {
        return (
            <div class="blue darken-1">
                <Row>
                    <Col s={4} className='grid-example'><Link to="/"><span class="white-text"> HOME </span></Link></Col>
                    <Col s={4} className='grid-example'><Link to="/shop"><span class="white-text"> SHOP </span></Link></Col>
                    <Col s={4} className='grid-example'><Link to="/cart"><span class="white-text"> CART </span></Link></Col>
                </Row>
            </div>
        )
    }
}

export default Nav