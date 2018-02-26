
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.argv[2] || 8080
const fs = require('fs');


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let userShoppingCart = {
}

var str = fs.readFileSync('database.json', 'utf8');
app.post('/shoppingcart', (req, res) => {
    let tempUsername = req.body.username
    let tempCart = req.body.cart

    userShoppingCart = { cart: tempCart, username: tempUsername }

    app.get('/shoppingcart', (req, res) => {
        res.json(userShoppingCart)
        fs.appendFile('database.json', JSON.stringify(userShoppingCart))
    })
})

app.get('/file', (req,res)=>{
    res.json(strObj)
})

app.listen(port, () => { console.log(`Back End Server Running at Port ${port}`) })



