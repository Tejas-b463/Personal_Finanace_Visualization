import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import transactionRoutes from './routes/transactionRoutes.js';
import connectDB from './config/db.js';

dotenv.config();

// Set up __dirname for ES modules
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:5173',
        'https://personal-finanace-visualization.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Connect to MongoDB
connectDB().catch((error) => {
    console.error("MongoDB connection error:", error);
});

// API Routes
app.use('/api/transactions', transactionRoutes);

// Test route to check dynamic parameters
app.get('/test/:id', (req, res) => {
    const { id } = req.params;
    res.send(`Test route hit with ID: ${id}`);
});

// Serve static files if in production
if (process.env.NODE_ENV === "production") {
    const clientBuildPath = path.join(__dirname, "../client/dist");
    app.use(express.static(clientBuildPath));

    // 👇 Exclude API routes from being caught by this wildcard
    app.get(/^\/(?!api).*/, (req, res) => {
        res.sendFile(path.resolve(clientBuildPath, "index.html"));
    });
}


// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});