const express = require('express');
const router = express.Router();
const githubWebhookAuth = require('../middleware/githubWebhookAuth');
const webhookController = require('../controllers/webhookController');

// POST /api/webhooks/github
router.post('/github', githubWebhookAuth, webhookController.handleGithubWebhook);

module.exports = router;
