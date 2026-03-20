// Webhook feature removed
// const crypto = require('crypto');
//
// const githubWebhookAuth = (req, res, next) => {
//     const signature = req.headers['x-hub-signature-256'];
//     const secret = process.env.WEBHOOK_SECRET;
//
//     if (!signature) {
//         return res.status(401).send('No signature found on request');
//     }
//
//     if (!secret) {
//         return res.status(500).send('Webhook secret not configured on server');
//     }
//
//     if (!req.rawBody) {
//         return res.status(400).send('No raw body found to verify');
//     }
//
//     const hmac = crypto.createHmac('sha256', secret);
//     const digest = 'sha256=' + hmac.update(req.rawBody).digest('hex');
//
//     if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))) {
//         return res.status(401).send('Signatures did not match');
//     }
//
//     next();
// };
//
// module.exports = githubWebhookAuth;
