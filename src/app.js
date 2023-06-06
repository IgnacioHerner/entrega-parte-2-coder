import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'

import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'
import viewsRouter from './routes/view.routes.js'

mongoose.set('strictQuery', false)
const app = express()

const uri = "mongodb+srv://Igna:1234@cluster0.xjrvhsd.mongodb.net/"

// JSON SETUP
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//handlebars setup
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')

// Router setup
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.use('/products', viewsRouter)

//Mongoose and server
try {
    await mongoose.connect(uri, 
         { dbName: "backend-coder" 
     })
     console.log('DB connected')
    app.listen(8080, () => console.log('Server up'))
} catch (err) {
     console.log('connection failed')
}