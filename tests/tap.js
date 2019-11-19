const tape = require('tape');
const path = require('path');

function cyanText(text) {
    return `\x1b[1m\x1b[36m${text}\x1b[0m`;
}

function yellowText(text) {
    return `\x1b[1m\x1b[33m${text}\x1b[0m`
}

function redGreenText(text, flag) {
    let color = (flag ? "32m" : "31m");
    return `\x1b[${color}${text}\x1b[0m`;
}

function createTest(run, row) {
    let currentTest = {
        id: row.id,
        parentTest: null,
        name: row.name,
        isSkip: row.skip,
        isTodo: row.todo,
        asserts: [],
        children: [],
        assertsPassed: 0,
        assertsFailed: 0,
        assertsTotal: 0,
        // currentFile: currentFile
    }

    run.tests[row.id] = currentTest;

    if (row.parent == undefined) {
        run.rootIDs.push(row.id)
        run.rootTests[row.id] = currentTest;
    } else {
        currentTest.parentTest = run.tests[row.parent]; // Find the parent
        currentTest.parentTest.children.push(currentTest);
    }

    run.currentTest = currentTest
}

function addAssert(run, row) {
    run.currentTest.asserts.push(row)
    const failed = (row.ok ? 0 : 1);
    const passed = (row.ok ? 1 : 0);

    run.currentTest.assertsFailed += failed;
    run.currentTest.assertsPassed += passed;
    run.currentTest.assertsTotal = run.currentTest.assertsFailed + run.currentTest.assertsPassed;


    run.runResults.assertsFailed += failed;
    run.runResults.assertsPassed += passed;
    run.runResults.assertsTotal++;
}

function updateParentResults(currentTest) {
    if (currentTest.parentTest == null) {
        return;
    }
    currentTest.parentTest.assertsFailed += currentTest.assertsFailed;
    currentTest.parentTest.assertsPassed += currentTest.assertsPassed;
    currentTest.parentTest.assertsTotal += currentTest.assertsTotal;
}

function popCurrentTest(run, row) {
    updateParentResults(run.currentTest);

    run.currentTest = run.currentTest.parentTest;
}

function isLastChild(childReport) {
    if (childReport.parentTest == null) {
        return true
    }

    return childReport.parentTest.children[childReport.parentTest.children.length-1].id == childReport.id;
}

function showReportStatus(report, indentation = 0) {
    const total = report.assertsTotal;
    const failed = report.assertsFailed;
    const passed = report.assertsPassed;
    const didFail = failed > 0 ? true : false;
    const check = redGreenText(didFail ? `✗` : `✓`, !didFail);

    const nestingChar = didFail ? "└─" : (isLastChild(report) ? "└─" : "├─");
    const intentText = indentation == 0 ? `` : `${"   ".repeat(indentation-1)}${nestingChar} `;

    if (didFail) {
        const failedText = redGreenText(`${failed} of ${total} failed`, false);
        console.log(`${intentText}${check} TestCase(${cyanText(report.name)}): ${failedText}`);
    } else {
        const passedText = redGreenText(`All ${passed} passed`, true);
        console.log(`${intentText}${check} TestCase(${cyanText(report.name)}): ${passedText}`);
    }
}

function showReportChildren(report, indentation = 0) {
    let failed = report.assertsFailed;

    if (failed == 0) {
        return
    }

    indentation++;
    report.children.forEach(childReport => {
        showReportStatus(childReport, indentation);
        showReportChildren(childReport, indentation);
        showReportAsserts(childReport, indentation);
    });
}

function showReportAsserts(report, indentation = 0) {
    if (report.assertsFailed == 0) {
        return;
    }

    let reportArray = [];
    report.asserts.forEach(assert => {
        let padding = "   ".repeat(indentation);
        let nestingChar = indentation == 0 ? "├─" : "└─";
        let nestingChild = indentation == 0 ? "│" : " ";
        let assertName = ` ${padding} ${nestingChar} ${cyanText(assert.operator)}: ${redGreenText(assert.name, assert.ok)}`;

        reportArray.push(assertName);

        if (!assert.ok) {
            reportArray.push(`${padding} ${nestingChild}  ├─ file: ${yellowText(assert.file)}`)
            reportArray.push(`${padding} ${nestingChild}  ├─ operator: ${assert.operator}`)
            reportArray.push(`${padding} ${nestingChild}  ├─ expected: ${assert.expected}`)
            reportArray.push(`${padding} ${nestingChild}  └─ actual: " ${assert.actual}`)
        }
    });

    console.log(reportArray.join("\n"))
}

function showRunSummary(run) {
    const failed = run.runResults.assertsFailed;
    const passed = run.runResults.assertsPassed;
    const total = run.runResults.assertsTotal;

    const resultMessage = " Results: \x1b[1m" + passed + " passed\x1b[0m, \x1b[1m" + failed + " failed\x1b[0m, \x1b[1m" + total + " total\x1b[0m ";
    const messageLength = resultMessage.length - 24; // Need to account for color encoding

    console.log('│ ┌%s┐', "─".repeat(messageLength))
    console.log('└─┤%s│', resultMessage)
    console.log('  └%s┘', "─".repeat(messageLength))
}

function showRunReport(run) {
    run.rootIDs.forEach(testID => {
        let report = run.rootTests[testID];

        showReportStatus(report)
        showReportChildren(report)
        showReportAsserts(report)
    });
    showRunSummary(run)
}

tape.createStream({
    objectMode: true
}).on('data', function (row) {
    // console.log(row)
    switch (row.type) {
        case "test":
            createTest(run, row);
            break;
        case "end":
            popCurrentTest(run, row);
            break;
        case "assert":
            addAssert(run, row);
            break;
    }
});

tape.onFinish(function () {
    showRunReport(run)

    // console.log(run)
});

let currentFile = "";

let run = {
    rootIDs: [],
    rootTests: {},
    tests: {},
    runResults: {
        assertsPassed: 0,
        assertsFailed: 0,
        assertsTotal: 0,
    },
    currentTest: null,
}

process.argv.slice(3).forEach(function (file) {
    currentFile = file
    console.log("Processing file: ", file)
    require(path.resolve(file));
});