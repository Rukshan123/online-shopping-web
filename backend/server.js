import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import productRouter from './routers/productRouter.js'
import userRouter from './routers/userRouter.js'

//use secure the token
dotenv.config()
const app = express()

//parsing data in the body of request
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//innitialize and connect db
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/shopping', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
})

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.get('/', (req, res) => {
  res.send('Server is ready')
})

app.use((err, req, res) => {
  res.status(500).send({ message: err.message })
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
