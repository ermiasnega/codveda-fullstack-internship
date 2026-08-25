const products = require("../data/products");

// GET /api/products
const getProducts = (req, res) => {
  res.status(200).json({
    success: true,
    count: products.length,
    data: products,
    });
  };

    // GET /api/products/:id
    const getProduct = (req, res) => {
      const id = Number(req.params.id);

         const product = products.find((product) => product.id === id);

              if (!product) {
                    return res.status(404).json({
                            success: false,
                            message: "Product not found",
                              });
                            }

                                  res.status(200).json({
                                        success: true,
                                        data: product,
                                    });
                                };

                                // POST /api/products
                                    const createProduct = (req, res) => {
                                      const { name, price, category } = req.body;

                                        if (!name || price === undefined || !category) {
                                            return res.status(400).json({
                                                success: false,
                                                message: "Name, price and category are required",
                                                });
                                              }

                                                                 if (Number(price) < 0) {
                                                                    return res.status(400).json({
                                                                        success: false,
                                                                        message: "Price cannot be negative",
                                                                         });
                                                                       }

                                                                const newProduct = {
                                                                        id: products.length > 0
                                                                            ? Math.max(...products.map((product) => product.id)) + 1
                                                                                                        : 1,
                                                                                                        name,
                                                                                                        price: Number(price),
                                                                                                        category,
                                                                                                        };

                                                                                                                                            products.push(newProduct);

                                                                                                                                              res.status(201).json({
                                                                                                                                                  success: true,
                                                                                                                                                      message: "Product created successfully",
                                                                                                                                                          data: newProduct,
                                                                                                                                                            });
                                                                                                                                                            };

                                                                                                                                                            // PUT /api/products/:id
                                                                                                                                                            const updateProduct = (req, res) => {
                                                                                                                                                              const id = Number(req.params.id);

                                                                                                                                                                const product = products.find((product) => product.id === id);

                                                                                                                                                                  if (!product) {
                                                                                                                                                                      return res.status(404).json({
                                                                                                                                                                            success: false,
                                                                                                                                                                            message: "Product not found",
                                                                                                                                                                              });
                                                                                                                                                                                        }

                                                                                                                                                                                          const { name, price, category } = req.body;

                                                                                                                                                                                            if (name !== undefined) product.name = name;
                                                                                                                                                                                              if (price !== undefined) {
                                                                                                                                                                                                  if (Number(price) < 0) {
                                                                                                                                                                                                        return res.status(400).json({
                                                                                                                                                                                                                success: false,
                                                                                                                                                                                                                message: "Price cannot be negative",
                                                                                                                                                                                                                  });
                                                                                                                                                                                                             }

                                                                                                                                                                                                                                      product.price = Number(price);
                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                          if (category !== undefined) product.category = category;

                                                                                                                                                                                                                                            res.status(200).json({
                                                                                                                                                                                                                                                success: true,
                                                                                                                                                                                                                                                    message: "Product updated successfully",
                                                                                                                                                                                                                                                    data: product,
                                                                                                                                                                                                                                                  });
                                                                                                                                                                                                                                              };

                                                                                                                                                                                                                                                          // DELETE /api/products/:id
                                                                                                                                                                                                                                                          const deleteProduct = (req, res) => {
                                                                                                                                                                                                                                                            const id = Number(req.params.id);

                                                                                                                                                                                                                                                              const productIndex = products.findIndex(
                                                                                                                                                                                                                                                                  (product) => product.id === id
                                                                                                                                                                                                                                                                    );

                                                                                                                                                                                                                                                                      if (productIndex === -1) {
                                                                                                                                                                                                                                                                          return res.status(404).json({
                                                                                                                                                                                                                                                                                success: false,
                                                                                                                                                                                                                                                                                message: "Product not found",
                                                                                                                                                                                                                                                                              });
                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                              const deletedProduct = products.splice(productIndex, 1);

                                                                                                                                                                                                                                                                                                res.status(200).json({
                                                                                                                                                                                                                                                                                                    success: true,
                                                                                                                                                                                                                                                                                                    message: "Product deleted successfully",
                                                                                                                                                                                                                                                                                                    data: deletedProduct[0],
                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                  };

                                                                                                                                                                                                                                                                                                module.exports = {
                                                                                                                                                                                                                                                                                                                getProducts,
                                                                                                                                                                                                                                                                                                                getProduct,
                                                                                                                                                                                                                                                                                                                createProduct,
                                                                                                                                                                                                                                                                                                                updateProduct,
                                                                                                                                                                                                                                                                                                                deleteProduct,
                                                                                                                                                                                                                                                                                                              };