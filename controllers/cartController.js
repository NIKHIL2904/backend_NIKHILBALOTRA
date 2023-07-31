const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');

// Add an item to the cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Check if the user and product exist
    const userExists = await User.findById(userId);
    const productExists = await Product.findById(productId);

    if (!userExists || !productExists) {
      return res.status(404).json({ message: "User or Product not found" });
    }

    // Check if the product is already in the cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, product: {productId:productId,quantity:quantity}});
    }
    else{
      cart.product.push({
        productId:productId,
        quantity:quantity
      })
      await Cart.findOneAndUpdate({ user: userId },{product:cart.product});
    }


    // Save the updated cart to the database
    // await cart.save();

    res.status(201).json({ message: "Item added to cart successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Remove an item from the cart
// exports.removeFromCart = async (req, res) => {
//   try {
//     const { userId, productId } = req.body;

//     // Check if the user and product exist
//     const userExists = await User.findById(userId);
//     const productExists = await Product.findById(productId);

//     if (!userExists || !productExists) {
//       return res.status(404).json({ message: "User or Product not found" });
//     }

//     let cart = await Cart.findOne({ user: userId });
//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     // Remove the item from the cart
//     cart.items = cart.items.filter(item => item.product.toString() !== productId);

//     // Save the updated cart to the database
//     await cart.save();

//     res.json({ message: "Item removed from cart successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };


exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Check if the user and product exist
    const userExists = await User.findById(userId);
    const productExists = await Product.findById(productId);

    if (!userExists || !productExists) {
      return res.status(404).json({ message: "User or Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Check if the item exists in the cart before removing it
    const itemIndex = cart.product.findIndex(item => item.productId.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Remove the item from the cart
    cart.product.splice(itemIndex, 1);

    // Save the updated cart to the database
    await cart.save();

    res.json({ message: "Item removed from cart successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.calculateTotalBill = async (req, res) => {
  try {
    const { userId } = req.body;

    // Check if the user exists
    const userExists = await User.findById(userId);

    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const cart = await Cart.findOne({ user: userId }).populate({
      path:'product',
      populate:{path:'productId'}
    });
    console.log(cart.product[0].productId);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    let totalBill = 0;

    // Calculate total bill including tax for each item in the cart
    if(cart.product.length>0){
      for (const item of cart.product) {
        const product = item;
  
        if (product) {
          let itemPrice = product.productId.price * product.quantity;
  
          // Tax calculation based on the category "P" (products)
          if (product.productId.category === 'P') {
            if (itemPrice > 1000 && itemPrice <= 5000) {
              itemPrice += itemPrice * 0.12; // Tax PA - 12%
            } else if (itemPrice > 5000) {
              itemPrice += itemPrice * 0.18; // Tax PB - 18%
            } else {
              itemPrice += 200; // Tax PC - Flat tax amount of 200
            }
          }else{
            // Tax calculation based on the category "S" (services)
            if (itemPrice > 1000 && itemPrice <= 8000) {
              itemPrice += itemPrice * 0.1; // Tax SA - 10%
            } else if (itemPrice > 8000) {
              itemPrice += itemPrice * 0.15; // Tax SB - 15%
            } else {
              itemPrice += 100; // Tax SC - Flat tax amount of 100
            }
          }
          totalBill += itemPrice;
        }
      }
    }

    // Calculate total bill including tax for each service in the cart
    

    res.json({ totalBill });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Clear the cart
exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.body;

    // Check if the user exists
    const userExists = await User.findById(userId);

    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Clear all items from the cart
    cart.product = [];

    // Save the updated cart to the database
    await cart.save();

    res.json({ message: "Cart cleared successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.confirmOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    // Check if the user exists
    const userExists = await User.findById(userId);

    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const cart = await Cart.findOne({ user: userId }).populate({
      path:'product',
      populate:{path:'productId'}
    });
    console.log(cart.product[0].productId);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    let totalBill = 0;

    // Calculate total bill including tax for each item in the cart
    if(cart.product.length>0){
      for (const item of cart.product) {
        const product = item;
  
        if (product) {
          let itemPrice = product.productId.price * product.quantity;
  
          // Tax calculation based on the category "P" (products)
          if (product.productId.category === 'P') {
            if (itemPrice > 1000 && itemPrice <= 5000) {
              itemPrice += itemPrice * 0.12; // Tax PA - 12%
            } else if (itemPrice > 5000) {
              itemPrice += itemPrice * 0.18; // Tax PB - 18%
            } else {
              itemPrice += 200; // Tax PC - Flat tax amount of 200
            }
          }else{
            // Tax calculation based on the category "S" (services)
            if (itemPrice > 1000 && itemPrice <= 8000) {
              itemPrice += itemPrice * 0.1; // Tax SA - 10%
            } else if (itemPrice > 8000) {
              itemPrice += itemPrice * 0.15; // Tax SB - 15%
            } else {
              itemPrice += 100; // Tax SC - Flat tax amount of 100
            }
          }
          totalBill += itemPrice;
        }
      }
    }

    // Update the cart status to "confirmed"
    cart.status = "confirmed";
    await cart.save();

    res.json({ userId: cart.user, totalBill, status: "confirmed", products: cart.product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


