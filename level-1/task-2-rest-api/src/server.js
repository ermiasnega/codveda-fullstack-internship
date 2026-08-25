const express = require("express");

const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Welcome route
app.get("/", (req, res) => {
  res.status(200).json({
      success: true,
          message: "Codveda Products REST API is running",
            });
            });

            // Product routes
            app.use("/api/products", productRoutes);

            // Handle unknown routes
            app.use((req, res) => {
              res.status(404).json({
                  success: false,
                      message: "Route not found",
                        });
                        });

                        // Global error handler
                        app.use(errorHandler);

                        app.listen(PORT, "0.0.0.0", () => {
                          console.log(`Server running on port ${PORT}`);
              });