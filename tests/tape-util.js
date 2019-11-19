// This library extends the reporting functionality of TapeJs
// The default output give an additional stacktrace that not very useful

/**
    npm install -g babel-cli tape faucet browserify browser-run
    npm install --save-dev babel-preset-es2015 babelify tape

    You’ll also need a `.babelrc` file:
        {
        "presets": ["es2015"]
        }

    In the test files
        import test from "tape"
        import * as testUtil from "./tape-util"

        test('A passing test', (assert) => {
            assert.pass('This test will pass.');
            assert.end();
        });

        test('Assertions with tape.', (assert) => {
            const expected = 'something to test';
            const actual = 'sonething to test';

            assert.equal(actual, expected,
            'Given two mismatched values, .equal() should produce a nice bug report');
            assert.end();
        });

        let report = testUtil.setup(test)


    Then give it a try:
        babel-node test.js

    OUTPUT:
        TestCase(A passing test)
         ├ pass: This test will pass.
        TestCase(Assertions with tape.)
         ├ equal: Given two mismatched values, .equal() should produce a nice bug report
         │  ├ file: /some-test-file.js:33:10
         │  ├ operator: equal
         │  ├ expected: something to test
         │  └ actual: sonething to test
         │
         └ Results: 1 passed, 1 failed, 2 total
*/

let reports = {}
let reportIDCount = 1
let stream = null;
let didCreateStream = false;

export function setup(test) {
    let reportID = reportIDCount
    reportIDCount+=1
    let activeReport = null;

    if (!didCreateStream) {
        // return reports
        stream = test.createStream({
            objectMode: true
        })
        didCreateStream = true;
    }

    stream.on('data', function (row) {
        if (row.type == "test") {
            activeReport = {
                id: row.id,
                name: row.name,
                isSkip: row.skip,
                isTodo: row.todo,
                reportID: reportID,
                rows: []
            }
        }
        if (row.type == "end") {
            if (reports[activeReport.reportID] == null) {
                reports[activeReport.reportID] = [];
            }
            reports[activeReport.reportID].push(activeReport)
        }
        if (row.type == "assert") {
            activeReport.rows.push(row)
        }
    });

    // return reports;
    return reportID
}

export function report(reportID, test, showPassingOperators = false) {
    let passed = 0;
    let failed = 0;
    let total = 0;

    test.onFinish(function () {
        let localReports = reports[reportID];

        localReports.forEach(report => {
            const rows = report.rows;

            // console.log(rows)
    console.log("XXXXXXX-localReports", reportID, report.reportID, report.rows.length)


            let localFail = 0;
            let localPass = 0;
            let reportArray = [];

            rows.forEach(row => {
                localFail += (row.ok ? 0 : 1);
                localPass += (row.ok ? 1 : 0);

                failed += (row.ok ? 0 : 1);
                passed += (row.ok ? 1 : 0);
                total++;

                let okColor = (row.ok ? "32m" : "31m");
                reportArray.push(" ├─ \x1b[1m\x1b[36m" + row.operator + "\x1b[0m: \x1b[" + okColor + "" + row.name + "\x1b[0m");

                if (!row.ok) {
                    reportArray.push(" │  ├─ file: \x1b[1m\x1b[33m" + row.file + "\x1b[0m'")
                    reportArray.push(" │  ├─ operator: " + row.operator)
                    reportArray.push(" │  ├─ expected: " + row.expected)
                    reportArray.push(" │  └─ actual: " + row.actual)
                }
            });

            if (localFail > 0) {
                console.log("\x1b[31m ✗\x1b[0m TestCase(\x1b[1m\x1b[36m%s\x1b[0m): \x1b[31m%s of %s failed\x1b[0m", report.name, localFail, (localFail + localPass))
            } else {
                console.log("\x1b[32m ✓\x1b[0m TestCase(\x1b[1m\x1b[36m%s\x1b[0m): \x1b[32mAll %s passed\x1b[0m ", report.name, localPass)
            }

            if (localFail > 0 || showPassingOperators) {
                console.log(reportArray.join("\n"))
            }
        });

        const resultMessage = " Results: \x1b[1m"+passed+" passed\x1b[0m, \x1b[1m"+failed+" failed\x1b[0m, \x1b[1m"+total+" total\x1b[0m";
        const messageLength = resultMessage.length-23; // Need to account for color encoding
        console.log(' │ ┌%s┐', "─".repeat(messageLength))
        console.log(' └─┤%s │', resultMessage)
        console.log('   └%s┘', "─".repeat(messageLength))
    });
}

