const express = require('express');
const router = express.Router();
const DiscordController = require('../Controllers/discord');
const DiscordValidation = require('../middleware/discord');

console.log('Discord routes file loaded');

router.get('/test', (req, res) => {
    res.json({ message: 'Discord routes working!' });
});

router.post('/shorten',
    ...DiscordValidation.shortenUrlValidation(),
    DiscordValidation.handleValidationErrors,
    DiscordController.shortenUrl 
)

router.get('/user/:discordUserId/urls',
    ...DiscordValidation.getUserUrlsValidation(),
    DiscordValidation.handleValidationErrors,
    DiscordController.getUserUrls
)

router.delete('/url/:shortId',
    ...DiscordValidation.deleteUrlValidation(),
    DiscordValidation.handleValidationErrors,
    DiscordController.deleteUrl
)

module.exports = router;