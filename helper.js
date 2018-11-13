exports.checkerForTestCaseFailure = (assertionObject, tagname, cb) => {
    if (assertionObject.currentTest.results) {
        if (assertionObject.currentTest.results.failed > 0) {
            let testCaseTag = tagname
            let assertionFail;
            if (assertionObject.currentTest.results && assertionObject.currentTest.results.testcases && assertionObject.currentTest.results.testcases[testCaseTag] && assertionObject.currentTest.results.testcases[testCaseTag]["assertions"]) {
                assertionFail = assertionObject.currentTest.results.testcases[testCaseTag]["assertions"]
            }
            if (assertionFail && assertionFail.length > 0) {
                assertionFail.map((value, index) => {
                    if (value.failure && value.fullMsg) {
                        cb(null, { ...value,
                            tagname: testCaseTag
                        })
                    }
                })
            }
        }
    }
}