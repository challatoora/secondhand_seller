import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

// Connect to MongoDB
connectDB()

const app = express()

// Middleware
app.use(express.json())

// API Routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/uploads', uploadRoutes)

// Cloudinary configuration
app.get('/api/config/cloudinary', (req, res) => {
    res.send(process.env.CLOUDINARY_URL)
})

app.get('/api/config/cloudinarypreset', (req, res) => {
    res.send(process.env.CLOUDINARY_UPLOAD_PRESET)
})

// Static uploads
const __dirname = path.resolve()

app.use(
    '/uploads',
    express.static(path.join(__dirname, 'uploads'))
)

// Backend health check
app.get('/', (req, res) => {
    res.send('API is running...')
})

// Error handler
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode

    res.status(statusCode).json({
        message: err.message,
        stack:
            process.env.NODE_ENV === 'production'
                ? null
                : err.stack,
    })
})

// Start server
const PORT = process.env.PORT || 5000

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`)
})