module.exports = {
    apiUrl: "https://localhost:4000/",
    abortOnAssertionFailure: false,
    getApiUrlFromTerminal:function(args){
        return "https://localhost:4000/"
    },
    slackWebHook:function(args){
        return {web_hook:"https://hooks.slack.com/services/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"}
    }
}