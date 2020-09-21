const express = require('express');
const router = express.Router();

router.get( "/", ( req, res ) => {
  res.send("Hello").status(200)
} );

export default router