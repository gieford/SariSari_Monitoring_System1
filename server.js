var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
const serverinit = require('./serverinit')

var port = serverinit.PORT

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

console.log(port)

var Users = require('./routes/Users')
var ApplyStoreOwners = require('./routes/ApplyStoreOwners')
var Products = require('./routes/Products')
var StoreProducts = require('./routes/StoreProducts')
var Auths = require('./routes/Auths')
var UserAuths = require('./routes/UserAuths')
var RoleAuths = require('./routes/RoleAuths')
var Stores = require('./routes/Stores')
var Messages = require('./routes/Messages')
var Orders = require('./routes/Orders')
var OrderProducts = require('./routes/OrderProducts')

app.use('/users', Users)
app.use('/products', Products)
app.use('/auths', Auths)
app.use('/userauths', UserAuths)
app.use('/roleauths', RoleAuths)
app.use('/applystoreowners', ApplyStoreOwners)
app.use('/stores', Stores)
app.use('/storeproducts', StoreProducts)
app.use('/messages', Messages)
app.use('/orders', Orders)
app.use('/orderproducts', OrderProducts)



app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})
