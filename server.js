// const dotenv = require('dotenv');
// const express = require('express'); // Import the express module
// const mongoose = require('mongoose');
// // ...

// const app = express(); // Create an instance of the Express application

// process.on('uncaughtException', (err) => {
//   console.log(err.name, err.message);
//   process.exit(1);
// });

// const port = 3000;
// dotenv.config({ path: './.env' });
// mongoose
//   .connect(process.env.DB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('DB successfully connected!!!!'));

// // Define your routes and middleware here, if needed


// const server = app.listen(port || process.env.PORT, () => {
//   console.log('listening on port : 3000');
// });


const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cartRoutes = require('./routes/cartRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config({ path: './.env' });

const app = express();
const port = process.env.PORT || 3000;

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB successfully connected!!!!');

    app.use(express.json()); // Enable JSON body parsing

    // Use the defined routes
    app.use('/api/cart', cartRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/users', userRoutes);

    const server = app.listen(port, () => {
      console.log(`Listening on port: ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err.message);
    process.exit(1);
  });


