import express from 'express'
const app = express ();
const port = 8090;
import cors from 'cors'
import Connection  from './config/db.js'  //connectToDb function

Connection()

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('welcome home')
})

import userRoutes from './routes/userRoutes.js'

app.use('/users', userRoutes)



app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})