import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { Request, Response } from "firebase-functions";
import { CallableContext, onRequest } from "firebase-functions/v1/https";
import { IGoal } from "../models/goal.model";

export const reCalculate = functions.region("australia-southeast1").https.onCall(async (data: any, context: CallableContext) => {
  const organisationId = data.organisationId as string;
  const projectId = data.projectId as string;
  // functions.logger.info("organisationId", organisationId);
  // functions.logger.info("projectId", projectId);
  return await _reCalculate(organisationId, projectId);

});

export const reCalculateEmulator = functions.region("australia-southeast1").https.onRequest(async (req: Request, res: Response<{ message?: string }>) => {
  const organisationId = req.query.organisationId as string;
  const projectId = req.query.projectId as string;
  await _reCalculate(organisationId, projectId);
  res.end();
});

async function _reCalculate(organisationId: string, projectId: string) {
  const projectGoals = await projectGoalList({ organisationId: organisationId, projectId: projectId });

  for (let i = 0; i < projectGoals.length; i++) {
    const projectGoal = projectGoals[i] as IGoal;
    functions.logger.info("### projectId: ", projectId);
    const total = await getFieldNotesOutcomeTotal({ organisationId: organisationId, projectId: projectId, goalTypeId: projectGoal.goalTypeId });
    functions.logger.info([`total [${projectGoal.goalTypeId}]`, total, projectGoal.goalAmount, (total / projectGoal.goalAmount * 100)]);
    projectGoal.actualAmount = total / projectGoal.goalAmount * 100;
    await updateActualTargetInProjectGoal({ projectGoal: projectGoal, actualTarget: projectGoal.actualAmount, organisationId: organisationId, projectId: projectId });
  }
  return projectGoals;
}

async function projectGoalList(options: { organisationId: string, projectId: string }) {
  let arrayR = [];
  const docRef = await admin.firestore()
    .collection("Organisations")
    .doc(options.organisationId)
    .collection("Projects")
    .doc(options.projectId)
    .collection("Goals")
    .get();

  arrayR = docRef.docs.map((doc) => {
    return doc.data();
  });
  return arrayR;
}


async function fetchFieldNotesByProject(organisationId: string, projectId: string) {
  try {
    const docRef = await admin.firestore()
      .collectionGroup("FieldNotes")
      .where("organisationId", "==", organisationId)
      .where("projectId", "==", projectId)
      .get();

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

async function fetchFieldNoteOutcomes(fieldNoteId: string, projectId: string, orgId: string): Promise<IGoal[]> {
  try {
    const docRef = await admin.firestore()
      .collection(`Organisations/${orgId}/Projects/${projectId}/FieldNotes/${fieldNoteId}/Outcomes`)
      .get();

    const outcomes = docRef.docs.map((doc) => {
      return doc.data() as IGoal;
    });
    return outcomes;
  } catch (error) {
    return error;
  }
}

async function getFieldNotesOutcomeTotal(options: { organisationId: string, projectId: string, goalTypeId: number }) {
  let fieldNoteGoals: any[] = [];

  const fieldNotes = await fetchFieldNotesByProject(options.organisationId, options.projectId);

  const notes = fieldNotes.fieldNotes as any[];
  if (notes) {
    for (let index = 0; index < notes.length; index++) {
      const note = notes[index];
      const goalOutcome = await fetchFieldNoteOutcomes(note.id, options.projectId, options.organisationId);

      for (let index = 0; index < goalOutcome.length; index++) {
        const goal = goalOutcome[index];
        fieldNoteGoals.push(goal);
      }
    }
  }

  fieldNoteGoals = fieldNoteGoals.filter((g) => g.goalTypeId === options.goalTypeId);
  const total = fieldNoteGoals.reduce((memo, g) => memo + g.outcomeAmount, 0).toFixed(2);
  return total;
}

async function updateActualTargetInProjectGoal(options: { projectGoal: any, actualTarget: number, organisationId: string, projectId: string, }) {
  const ref = await admin.firestore()
    .doc(`Organisations/${options.organisationId}/Projects/${options.projectId}/Goals/${options.projectGoal.id}`);

  ref.get().then((doc) => {
    if (doc.exists) {
      doc.ref.update({
        actualAmount: options.actualTarget,
      });
    }
  });
  return options.actualTarget;
}
