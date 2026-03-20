// Webhook feature removed
// const handleGithubWebhook = (req, res) => {
//     const eventType = req.headers['x-github-event'];
//     
//     // Only handle push events
//     if (eventType === 'push') {
//         const { repository, ref, pusher, head_commit } = req.body;
//         
//         const repoName = repository?.name || 'Unknown Repo';
//         const branch = ref ? ref.replace('refs/heads/', '') : 'Unknown Branch';
//         const pusherName = pusher?.name || 'Unknown Pusher';
//         const commitMessage = head_commit?.message || 'No commit message';
//
//         console.log(`Repository: ${repoName}`);
//         console.log(`Branch: ${branch}`);
//         console.log(`Pusher: ${pusherName}`);
//         console.log(`Commit: ${commitMessage}`);
//         
//         res.status(200).send('Push event logged correctly');
//     } else {
//         res.status(200).send(`Ignored event type: ${eventType}`);
//     }
// };
//
// module.exports = {
//     handleGithubWebhook
// };
