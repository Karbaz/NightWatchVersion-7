const {
    IncomingWebhook
} = require('@slack/client');
var date = new Date();


exports.sendSuccessSlackNotification = (config) => {
    const webhook = new IncomingWebhook(config.web_hook);
    webhook.send({
            "text": `Automation Testing Completed Run At *[ ${date} ]* Active Url =>  *[ ${config.url} ]* `,
            "attachments": [{
                "color": "good",
                "author_name": "Testing BOT",
                "title": "Test Result",
                "text": `All Test Cases Pass For *${config.fileName}*`
            }]
        },
        function (err, res) {
            if (err) {
                console.log('Error:', err);
            } else {
                console.log('Message sent: ', res);
            }
        });
}

exports.sendFailureSlackNotification = (config) => {
    const webhook = new IncomingWebhook(config.web_hook);
    let SlackTestString = "";
    config.test.map((value, index) => SlackTestString += `[Message]: ${value.message}\n[Failure Message]: ${value.failure}\n[Tag Name]: ${value.tagname} \n \n`)
    webhook.send({
            "text": `Automation Testing Completed Run At *[ ${date} ]* Active Url =>  *[ ${config.url} ]* `,
            "attachments": [{
                "color": "danger",
                "author_name": "Testing BOT",
                "title": `Test Fail For ${config.fileName}`,
                "text": SlackTestString,
            }]
        },
        function (err, res) {
            if (err) {
                console.log('Error:', err);
            } else {
                console.log('Message sent: ', res);
            }
        });
}