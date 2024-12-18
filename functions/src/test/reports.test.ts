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

  describe("generate report", () => {
    it("generating report", async () => {
      // [START assertOnline]

      // step 1: wrap the function
      const wrapped = test.wrap(cf.generateReport);

      // Call the wrapped function with the snapshot you constructed.
      const data = await wrapped({
        params: {
          "organisationId": "blue_mountains",
          "startDate": "2022-01-14T01:02:19.445Z",
          "endDate": "2022-04-14T02:02:19.445Z",
          "projectId": "bc99ba00-b6e5-11ec-a76e-f97b98e0ad55",
          "goalTypeId": "2",
          "fieldNoteId": "7f03c140-bb90-11ec-9568-87c64909d6ec",
        },
      });
      console.dir(data);
      assert.isNotNull(data);
    });
  });
});

