// At the top of test/index.test.js
import * as cf from "..";
import * as chai from "chai";
import { after, describe, afterEach, it } from "mocha";
// const chai = require("chai");
// Sinon is a library used for mocking or verifying function calls in JavaScript.
import * as sinon from "sinon";
import * as admin from "firebase-admin";
import * as fn from "firebase-functions-test";
const assert = chai.assert;
const test = fn({
  databaseURL: "https://cvaus-53a3a.firebaseio.com",
  storageBucket: "cvaus-53a3a.appspot.com",
  projectId: "cvaus-53a3a",
}, "service_account/cvaus-53a3a-cbc9666bd185.json");

after(() => test.cleanup());

describe("cloud functions", () => {
  afterEach(async () => {
    // await test.firestore.clearFirestoreData(projectId);
  });


  /*
  // ALSO: debugging mocha in vscode: https://dev.to/wakeupmh/debugging-mocha-tests-in-vscode-468a
  // HIT F5: "Test ReCalc"

  // Manually run test:
  cd ~/code/cva/cva-web/functions \
    && export GOOGLE_APPLICATION_CREDENTIALS=~/code/cva/cva-web/functions/service_account/cvaus-53a3a-cbc9666bd185.json \
    && ls -l $GOOGLE_APPLICATION_CREDENTIALS \
    && npm run build \
    && cp -r service_account lib/service_account \
    && npx mocha --reporter spec lib/test/re-calc.test.js --exit
  */
  describe("recalcProjectGoals", () => {
    // Test Case: setting messages/11111/original to "input" should cause "INPUT" to be written to
    // messages/11111/uppercase
    it("reCalculateGoalOutcomes", async () => {
      // [START assertOnline]

      // step 1: wrap the function
      const wrapped = test.wrap(cf.reCalculate);

      // Call the wrapped function with the snapshot you constructed.
      const data = await wrapped({ organisationId: "citizen_science", projectId: "24e489f0-c104-11ec-9543-231831559cda" }) as {};
      // console.dir(data);
      assert.isNotNull(123);

    });
  });

});

