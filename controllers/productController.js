const Product = require('../models/Product');

// Fetch all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//Create a new product
// exports.createProduct = async (req, res) => {
//     try {
//       const { name, price, category } = req.body;
//       const newProduct = new Product({ name, price, category });
//       await newProduct.save();
//       res.status(201).json({ message: "Product created successfully", product: newProduct });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   };
  
//   // Update a product by ID
//   exports.updateProduct = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { name, price, category } = req.body;
//       const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, category }, { new: true });
//       res.json({ message: "Product updated successfully", product: updatedProduct });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   };
  

exports.createProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;

    // Validate the category input (accepts only "P" or "S")
    if (!["P", "S"].includes(category)) {
      return res.status(400).json({ message: "Invalid category. Category must be either 'P' or 'S'" });
    }

    const newProduct = new Product({ name, price, category });
    await newProduct.save();
    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category } = req.body;

    // Validate the category input (accepts only "P" or "S")
    if (category && !["P", "S"].includes(category)) {
      return res.status(400).json({ message: "Invalid category. Category must be either 'P' or 'S'" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, category }, { new: true });
    res.json({ message: "Product updated successfully", product: updatedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

  // Delete a product by ID
  exports.deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProduct = await Product.findByIdAndDelete(id);
      res.json({ message: "Product deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
