// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');

// // Define user routes
// router.post('/create', userController.createUser);


// module.exports = router;

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define user routes
router.post('/create', userController.createUser);
router.put('/update/:userId', userController.updateUser);
router.delete('/delete/:userId', userController.deleteUser);

module.exports = router;

