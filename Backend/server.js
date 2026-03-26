import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./DB/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";

dotenv.config();

const app = express();

// Connect to the database asynchronously (for serverless, this will connect on cold start)
ConnectDB().then(() => {
  console.log("Connected to the database");
}).catch((error) => {
  console.error("Error connecting to the database:", error);
});

const allowedOrigins = [
  "https://candid-kringle-d5677f.netlify.app",
  "https://melodic-crisp-d33907.netlify.app",
];
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

// Enable CORS
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));



// Parse JSON requests
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "Server is running successfully",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    message: "Everything is working perfectly!"
  });
});

// Routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/checkout", checkoutRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to the Pizza Ordering API');
});
// For local development
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`),);

export default app;
