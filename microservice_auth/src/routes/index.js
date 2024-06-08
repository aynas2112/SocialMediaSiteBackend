const express = require('express');
const authenticate = require('../middleware/auth');

const router = express.Router();
 
router.use(authenticate);

// Example route that requires authentication
router.post('/protected', (req, res) => {
  console.log("inside protected route");
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
