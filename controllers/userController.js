const User = require('../models/User');

// Create a new user account
exports.createUser = async (req, res) => {
  try {
    // res.status(200).json({
    //     status:"success"
    // })
    const { name, email, password } = req.body;
    
    // Check if the user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Create a new user using the User model
    const newUser = new User({ name, email, password });

    // Save the user to the database
    await newUser.save();

    // Respond with a success message
    res.status(201).json({ message: "User account created successfully" });
    } 
catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a user account by ID
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, password } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user fields
    user.name = name;
    user.email = email;
    user.password = password;

    // Save the updated user to the database
    await user.save();

    // Respond with a success message
    res.json({ message: "User account updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user from the database
    await User.findByIdAndRemove(userId);

    // Respond with a success message
    res.json({ message: "User account deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

