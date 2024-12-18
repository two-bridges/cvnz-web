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

// cd ~/code/cva/cva-web/functions \
//   && export GOOGLE_APPLICATION_CREDENTIALS=~/code/cva/cva-web/functions/service_account/cvaus-53a3a-cbc9666bd185.json \
//   && ls -l $GOOGLE_APPLICATION_CREDENTIALS \
//   && npm run build \
//   && cp -r service_account lib/service_account \
//   && npx mocha --reporter spec lib/test/index.test.js --exit

after(() => test.cleanup());

describe("cloud functions", () => {
  afterEach(async () => {
    // await test.firestore.clearFirestoreData(projectId);
  });

  describe("lookupUser", () => {
    // Test Case: setting messages/11111/original to "input" should cause "INPUT" to be written to
    // messages/11111/uppercase
    it("should find an email address", async () => {
      // [START assertOnline]

      // step 1: wrap the function
      const wrapped = test.wrap(cf.lookupUser);

      // Call the wrapped function with the snapshot you constructed.
      const data = await wrapped({ params: { email: "dean.grande@twobridges.com.au" } }) as { user: admin.auth.UserRecord };
      console.dir(data);
      assert.isNotNull(data.user);
    });
  });

  // EXAMPLE: OnCreate database document - run a function
  // This test will triger the execution of the function that relies on new data being created (see test.database.makeDataSnapshot())
  // // example from google: https://github.com/firebase/functions-samples/blob/main/quickstarts/uppercase/functions/test/test.online.js
  // describe('makeUpperCase', () => {
  //   // Test Case: setting messages/11111/original to 'input' should cause 'INPUT' to be written to
  //   // messages/11111/uppercase
  //   it('should upper case input and write it to /uppercase', () => {
  //     // [START assertOnline]
  //     // Create a DataSnapshot with the value 'input' and the reference path 'messages/11111/original'.
  //     const snap = test.database.makeDataSnapshot('input', 'messages/11111/original');

  //     // Wrap the makeUppercase function
  //     const wrapped = test.wrap(myFunctions.makeUppercase);
  //     // Call the wrapped function with the snapshot you constructed.
  //     return wrapped(snap).then(() => {
  //       // Read the value of the data at messages/11111/uppercase. Because `admin.initializeApp()` is
  //       // called in functions/index.js, there's already a Firebase app initialized. Otherwise, add
  //       // `admin.initializeApp()` before this line.
  //       return admin.database().ref('messages/11111/uppercase').once('value').then((createdSnap) => {
  //         // Assert that the value is the uppercased version of our input.
  //         assert.equal(createdSnap.val(), 'INPUT');
  //       });
  //     });
  //     // [END assertOnline]
  //   })
  // });

  describe("listUsers", () => {
    // Test Case: setting messages/11111/original to "input" should cause "INPUT" to be written to
    // messages/11111/uppercase
    it("should find an email address", () => {
      // [START assertOnline]

      // Create a DataSnapshot with the value "input" and the reference path "messages/11111/original".
      // const snap = test.database.makeDataSnapshot("input", "messages/11111/original");

      // Wrap the makeUppercase function
      const wrapped = test.wrap(cf.listUsers);
      // Call the wrapped function with the snapshot you constructed.
      return wrapped({ params: {} }).then((data: { user: admin.auth.UserRecord }) => {
        // nothing to do (check logs
        assert.isTrue(true, "all good, check logs");
      });
    });
  });
});

