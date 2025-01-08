import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "./middlewares/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
const corsOptions = {
  origin: [
    "https://string-ventures-assignment.vercel.app/",
    "http://localhost:5173",
  ],
  credentials: true,
  allowedHeaders: ["Content-type", "Accept", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/stats", statsRoutes);
app.use("/api/v1/transactions", transactionRoutes);

// Error Handling middleware
app.use(errorHandler);

// Connecting to DB and Starting Server
connectDB();
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
