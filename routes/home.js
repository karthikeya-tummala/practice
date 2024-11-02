const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Go to /api/courses');
});

module.exports = router;