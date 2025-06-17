require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const baseRouter = require('./routes');
const morgan = require('morgan');
const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Define allowed origins
const allowedOrigins = [
  process.env.APP_URL, // https://vouchersel-ler-movie-zone.vercel.app
  "http://localhost:5173",
];

// Set up CORS
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
      callback(null, true);
    } else {
      console.warn("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Base test route
app.get("/", (req, res) => {
  res.json("Welcome to movie app web service...");
});

// Routes
app.use("/api", baseRouter);

module.exports = app;
