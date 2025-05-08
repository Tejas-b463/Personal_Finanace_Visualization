import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import transactionRoutes from './routes/transactionRoutes.js';
import connectDB from './config/db.js';

dotenv.config();

// Set up proper __dirname equivalent for ES modules
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes - with explicit router options
app.use('/api/transactions', transactionRoutes);

// MongoDB connection
connectDB().catch((error) => {
    console.error("MongoDB connection error:", error);
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
    // Ensure static assets are served correctly
    app.use(express.static(path.join(__dirname, "../client/dist")));

    // Send index.html for any unknown routes in production
    app.get("/*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"));
    });
}

// Error handling middleware (general errors)
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
});

// 404 handler for unknown routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});