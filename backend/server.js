import express from 'express'
import cors from 'cors'
import 'dotenv/config' 
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
<<<<<<< HEAD
import userRouter from './routes/userRoute.js'
=======
>>>>>>> f2a2abe875e847af356aace865bb7907cd153d0f

//app config
const app = express()
const port = process.env.PORT || 4001

//middleware
app.use(express.json())
app.use(cors())

async function startServer() {
    try {
        await connectDB()
        await connectCloudinary()

        // Import routes after DB connection is established
        const adminRouter = (await import('./routes/adminRoute.js')).default
        const doctorRouter = (await import('./routes/doctorRoute.js')).default

        //api endpoints
        app.use('/api/admin', adminRouter)
        app.use('/api/doctor', doctorRouter)
<<<<<<< HEAD
        app.use('/api/user',userRouter)
=======
>>>>>>> f2a2abe875e847af356aace865bb7907cd153d0f
        
        app.get('/', (req, res) => {
            res.send('API WORKING')
        })

        app.listen(port, () => console.log("Server started on port", port))
    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)
    }
}

startServer()
