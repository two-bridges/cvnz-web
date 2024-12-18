import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { Request, Response } from "firebase-functions";
export { reCalculate, reCalculateEmulator } from "./outcome-calculations/recalc-outcomes";
export { generateReport, getFieldNotesForReport } from "./reports/report-calc";
export { lookupUser, listUsers } from "./user-signup/register-user";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://cvaus-53a3a.firebaseio.com",
});

exports.helloWorld = functions.region("australia-southeast1").https.onRequest(async (req: Request, res: any) => {
  const test = req.query.testName;
  if (!test) {
    return await res.status(401).send({
      status: "Parameter test not passed",
    });
  } else {
    return await res.status(200).send({
      status: "All good",
    });
  }
});


