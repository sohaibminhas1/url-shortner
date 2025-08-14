const express = require('express');
const {handleGenerateNewShortURL, handleGetAnalytics} = require("../Controllers/url")
const router = express.Router();

const {checkForAuthentication,restrictTo} = require("../middleware/auth")

router.post('/',checkForAuthentication, restrictTo(["NORMAL","ADMIN"]), handleGenerateNewShortURL)

router.get('/analytics/:shortId', handleGetAnalytics )


module.exports = router;