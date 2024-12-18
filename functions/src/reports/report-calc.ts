import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as moment from "moment";
import { CallableContext } from "firebase-functions/v1/https";
import { Request } from "firebase-functions";
import _ = require("underscore");


export class RecordData {
  fieldNoteDate: string = "";
  fieldNoteId: string = "";
  projectId: string = "";
  organisationId: string = "";
  outcome: number = 0;
  goalName: string = "";
  metric: string = "";
  goalType: string = "";
  outcomeId: string = "";
  month: string = "";
}

export class ReportDataFormat {
  total: number = 0;
  date: string = "";
  metric: string = "";
  month: string = "";
}

export const generateReport = functions.region("australia-southeast1").https.onCall(async (data: Request<{ organisationId: string, startDate: string, endDate: string, projectId: string, goalTypeId: string }>, context: CallableContext) => {
  let fieldNoteGoals: any[] = [];
  let fieldNotes: any;
  let monthlyData: ReportDataFormat[] = [];
  const organisationId = data?.params?.organisationId;
  const startDate = data?.params?.startDate;
  const endDate = data?.params?.endDate;
  const projectId = data?.params?.projectId;
  const goalTypeId = data?.params?.goalTypeId;
  if (projectId) {
    fieldNotes = await fetchFieldNotesByDateRange(organisationId, projectId, startDate, endDate);
  } else {
    fieldNotes = await fetchFieldNotesByDateRangeWithOutProjectId(organisationId, startDate, endDate);
  }
  const notes = fieldNotes.fieldNotes;
  if (notes) {
    // fetch field note outcomes
    for (let index = 0; index < notes.length; index++) {
      const note = notes[index];
      // functions.logger.info("note.id", note.id);
      const goalOutcome = await fetchFieldNoteOutcomes(note.id);
      // functions.logger.info("outcomes", goalOutcome);
      for (let index = 0; index < goalOutcome.length; index++) {
        const goal = goalOutcome[index];
        fieldNoteGoals.push(goal);
      }
    }
  }
  fieldNoteGoals = fieldNoteGoals.filter((g) => g.goalTypeId === parseInt(goalTypeId));
  const constructedReportData = constructReportData(notes, fieldNoteGoals);

  if (constructedReportData) {
    monthlyData = getDataBymonth(constructedReportData);
  }
  const allMonthsForGivenDuration = getAllMonthsForGivenDuration(startDate, endDate);
  const sortedDataByMonths: ReportDataFormat[] = [];
  allMonthsForGivenDuration.forEach((month) => {
    const found = _.find((monthlyData), (d) => d.month === month);
    if (!found) {
      const newTemp = new ReportDataFormat();
      newTemp.month = month;
      newTemp.total = 0;
      sortedDataByMonths.push(newTemp);
    } else {
      sortedDataByMonths.push(found);
    }
  });
  return sortedDataByMonths;
});
async function fetchFieldNotesByDateRange(organisationId: string, projectId: string, startDate: string, endDate: string) {
  try {
    const docRef = await admin.firestore().collectionGroup("FieldNotes").where("organisationId", "==", organisationId).where("projectId", "==", projectId).where("fieldNoteDate", ">=", startDate).where("fieldNoteDate", "<=", endDate).get();
    let fieldNotes = [];
    fieldNotes = docRef.docs.map((doc) => {
      return doc.data();
    });
    fieldNotes = fieldNotes.filter((f) => f.status === "Complete" && !f.deleted_utc);
    return { fieldNotes: fieldNotes };
  } catch (error) {
    return error;
  }
}

async function fetchFieldNotesByDateRangeWithOutProjectId(organisationId: string, startDate: string, endDate: string) {
  try {
    const docRef = await admin.firestore().collectionGroup("FieldNotes").where("organisationId", "==", organisationId).get();

    let fieldNotes = [];
    fieldNotes = docRef.docs.map((doc) => {
      return doc.data();
    });
    fieldNotes = fieldNotes.filter((f) => f.fieldNoteDate >= startDate && f.fieldNoteDate <= endDate);
    fieldNotes = fieldNotes.filter((f) => f.status === "Complete" && !f.deleted_utc);
    return { fieldNotes: fieldNotes };
  } catch (error) {
    return error;
  }
}
async function fetchFieldNoteOutcomes(fieldNoteId: string) {
  try {
    const docRef = await admin.firestore().collectionGroup("Outcomes").where("fieldNoteId", "==", fieldNoteId).get();
    const outcomes = docRef.docs.map((doc) => {
      return doc.data();
    });
    return outcomes;
  } catch (error) {
    return error;
  }
}

export const getFieldNotesForReport = functions.region("australia-southeast1").https.onCall(async (data: Request<{ organisationId: string, startDate: string, endDate: string, projectId: string, goalTypeId: string }>, context: CallableContext): Promise<RecordData[]> => {
  let fieldNoteGoals: any[] = [];
  const organisationId = data?.params?.organisationId;
  const startDate = data?.params?.startDate;
  const endDate = data?.params?.endDate;
  const projectId = data?.params?.projectId;
  const goalTypeId = data?.params?.goalTypeId;

  const fieldNotes = await fetchFieldNotesByDateRange(organisationId, projectId, startDate, endDate);
  const notes = fieldNotes.fieldNotes as any[];
  if (notes) {
    for (let index = 0; index < notes.length; index++) {
      const note = notes[index];
      // functions.logger.info("note.id", note.id);
      const goalOutcome = await fetchFieldNoteOutcomes(note.id);
      // functions.logger.info("outcomes", goalOutcome);
      for (let index = 0; index < goalOutcome.length; index++) {
        const goal = goalOutcome[index];
        fieldNoteGoals.push(goal);
      }
    }
  }
  fieldNoteGoals = fieldNoteGoals.filter((g) => g.goalTypeId === parseInt(goalTypeId));

  const constructedData = constructReportData(notes, fieldNoteGoals);
  return constructedData;
});

function getAllMonthsForGivenDuration(startDate: string, endDate: string) {
  const allMonths = [] as string[];
  const start = new Date(Date.parse(startDate));
  const end = new Date(Date.parse(endDate));
  const totalMonths = getMonthDifference(start, end);

  for (let i = totalMonths; i >= 0; i -= 1) {
    const date = new Date(end.getFullYear(), end.getMonth() - i, 1);
    allMonths.push(moment(date).format("MMM YYYY"));
  }

  return allMonths;
}

function getMonthDifference(startDate, endDate) {
  return (
    endDate.getMonth() - startDate.getMonth() + 12 * (endDate.getFullYear() - startDate.getFullYear())
  );
}

function getDataBymonth(records: RecordData[]) {
  const rec = _.groupBy((records), (r) => r.month);

  const reportData = _.map(rec, (raw) => {
    const data = _.reduce(raw, (memo, temp) => {
      memo.total += temp.outcome;
      memo.metric = temp.metric;
      memo.month = moment(temp.fieldNoteDate).format("MMM YYYY");
      memo.date = temp.fieldNoteDate;
      return memo;
    }, {
      total: 0,
      date: "",
      metric: "",
      month: "",
    });
    return data;
  });
  return reportData;
}

function constructReportData(fieldNotes: any[], fieldNoteGoals: any[]) {
  const newObject: RecordData[] = [];
  // functions.logger.info("fieldNotes.length && fieldNoteGoals.length", fieldNotes.length, fieldNoteGoals.length);

  if (fieldNotes?.length && fieldNoteGoals?.length) {
    fieldNotes.forEach((note) => {
      fieldNoteGoals.forEach((goal) => {
        if (goal.fieldNoteId === note.id) {
          const newTemp = new RecordData();
          newTemp.fieldNoteDate = note.fieldNoteDate;
          newTemp.month = moment(newTemp.fieldNoteDate).format("MMM");
          newTemp.fieldNoteId = note.id;
          newTemp.projectId = note ? note.projectId : "";
          newTemp.organisationId = note.organisationId;
          newTemp.goalName = goal.goalName;
          newTemp.goalType = goal.type;
          newTemp.outcome = goal.outcomeAmount;
          newTemp.outcomeId = goal.id;
          newTemp.metric = goal.goalUnit;
          newObject.push(newTemp);
        }
      });
    });
    // functions.logger.info("newTemp", newObject);
    return newObject;
  } else {
    return [];
  }
}
