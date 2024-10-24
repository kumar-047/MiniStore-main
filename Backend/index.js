const express=require("express")
const app=express()
const path = require("path")
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const port =process.env.PORT || 7000
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const cors= require('cors')
dotenv.config()

const allowedOrigins = [
    "http://localhost:3001",
    "http://localhost:4000"
    // "https://ministore-frontend-sxzm.onrender.com",
    // "https://ministore-admin.onrender.com" 
];

const UserRoutes=require("./Routes/Users")
const AdminRoutes=require("./Routes/AdminRoutes")
const ProductRoutes=require("./Routes/ProductRoutes")
const CartRoutes=require("./Routes/CartRoutes")
const PaymentRoutes=require("./Routes/paymentRoute")

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to database")
}).catch((err)=>{
    console.log(err)
})
app.use(cors({
    origin: function (origin, callback) {
        
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, 
})); 

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/user',UserRoutes)
app.use('/api/admin',AdminRoutes)
app.use('/api/products',ProductRoutes)
app.use('/api/cart',CartRoutes)
app.use('/api/payment',PaymentRoutes)

app.use(notFound);
app.use(errorHandler);




app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
