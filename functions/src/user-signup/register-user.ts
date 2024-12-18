import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { CallableContext } from "firebase-functions/v1/https";
import { Request } from "firebase-functions";

export const lookupUser = functions.region("australia-southeast1").https.onCall(async (data: Request<{ email: string }>, context: CallableContext): Promise<{ user: { uid: string, email: string } }> => {
  functions.logger.info(`email: ${data?.params?.email}`, {
    structuredData: true,
  });

  try {
    const user = await admin.auth().getUserByEmail(data.params.email);
    return { user: { uid: user.uid, email: user.email } };
  } catch (error) {
    return { user: null };
  }
});

export const listUsers = functions.region("australia-southeast1").https.onCall(async (data: Request<{ email: string }>, context: CallableContext): Promise<void> => {
  const listUsersResponse = await admin.auth().listUsers();
  functions.logger.info(`users: ${listUsersResponse.users.length}`, {
    structuredData: true,
  });
  listUsersResponse.users.forEach((u) => {
    functions.logger.info(u.email, {
      structuredData: true,
    });
  });

  return null;
});
