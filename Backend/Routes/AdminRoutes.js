const Router = require("express").Router()
const {registerAdmin,authAdmin,updateAdmin,getAllCustomers,getAllOrders} = require("../Controller/adminController")
const protect = require("../middleware/authMiddleware")




Router.post('/register',registerAdmin)
Router.post('/login',authAdmin)
Router.get('/getcustomers',getAllCustomers)
Router.get('/getorders',getAllOrders)
Router.put('/profile/:id',protect,updateAdmin)



module.exports=Router