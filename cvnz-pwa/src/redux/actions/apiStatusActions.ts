
import * as types from "./actionTypes";
import { RootState } from "../reducers/rootReducer";
import { IApiCallResponseStatus } from "../model/api-call.model";
import { Dispatch } from "redux";
import { IEntity } from "../model/entity.model";
import { myFirebase, db } from "../../firebase/firebase";
import { ErrorFn } from "firebase";
import uuid from 'uuid/v1';
import * as _ from "underscore";
import axios from '../../utils/axios';
import firebase, { FirebaseError } from "firebase";
import { Result } from "src/lib/result.model";
import { IUser } from "../model/user.model";

export interface AppApiError {
  errorMessage: string
}

export function beginApiCall(getState?: RootState) {
  return { type: types.BEGIN_API_CALL };
}

export function apiCallComplete(result: IApiCallResponseStatus) {
  return { type: types.BEGIN_API_CALL, result };
}

export interface IFirebaseRequest {
  dispatch: Dispatch;
  getState?: RootState;
  action: string;
}

export interface IApiGetOptions extends IFirebaseRequest {
  query: firebase.firestore.Query<firebase.firestore.DocumentData>;
}

export function firebaseGet(options: IApiGetOptions) {
  // await options.dispatch(beginApiCall(options.getState));
  return options.query.get()
    .then(snapshot => {
      var source = snapshot.metadata.fromCache ? "local cache" : "server";
      // console.log("Data came from " + source);
      // console.log("snapshot " + snapshot);
      return snapshot;
    })
    .catch(error => {
      // await options.dispatch(apiCallComplete({
      //   type: options.action,
      //   success: false,
      //   message: JSON.stringify(error, null, 2)
      // }));
      throw error;

    });
}

export async function firebaseQuery<T>(query: firebase.firestore.Query<firebase.firestore.DocumentData>) {

  try {
    const snapshot = await query.get();
    return Result.CreateSuccess(snapshot.docs.map(doc => doc.data() as T));
  } catch (error) {
    return getFirebaseError<T[]>(error);
  }
}

export async function sendSignInLinkToEmail<T>() {

  try {

    debugger;

    let credential = await myFirebase
      .auth()
      .sendSignInLinkToEmail('dean.grande@twobridges.com.au', {
        url: 'https://cvaus-53a3a.web.app/admin/organisation/grampians2',
        handleCodeInApp: true,

      });

    debugger;


  } catch (error) {
    debugger;
    return getFirebaseError<T[]>(error);
  }
}

export async function sendOrganisationInviteLogin(email: string, orgId: string) {

  try {
    const host = window.location.host === 'localhost' ? 'https://cvaus-53a3a.web.app' : `${window.location.protocol}//${window.location.host}`;
    console.debug(`host: ${host}`);
    let credential = await myFirebase
      .auth()
      .sendPasswordResetEmail(email, {
        url: `${host}/auth/${orgId}/login`,
        // handleCodeInApp: false,
      });

    return Result.CreateSuccess(true);

  } catch (error) {
    return getFirebaseError<boolean>(error);
  }
}
export async function verifyPasswordResetCode(code: string) {

  try {
    let email = await myFirebase
      .auth()
      .verifyPasswordResetCode(code);

    return Result.CreateSuccess(email);

  } catch (error) {
    return getFirebaseError<string>(error);
  }
}

export async function sendSignInLinkToEmail2(email: string, orgId: string) {

  try {
    const host = window.location.host === 'localhost' ? 'https://cvaus-53a3a.web.app' : `${window.location.protocol}//${window.location.host}`;
    console.debug(`host: ${host}`);
    let credential = await myFirebase
      .auth()
      .sendSignInLinkToEmail(email, {
        url: `${host}/auth/${orgId}/reset`,
        handleCodeInApp: true,
      });

    return Result.CreateSuccess(true);

  } catch (error) {
    return getFirebaseError<boolean>(error);
  }
}

export async function sendPasswordResetEmail<T>() {

  try {
    debugger;

    await myFirebase
      .auth()
      .sendPasswordResetEmail('dean.grande@twobridges.com.au');

    debugger;


  } catch (error) {
    debugger;
    return getFirebaseError<T[]>(error);
  }
}

export async function updatePassword(code: string, newPassword: string) {

  try {
    await myFirebase.auth().confirmPasswordReset(code, newPassword);
    return Result.CreateSuccess(true);
  } catch (error) {
    debugger;
    return getFirebaseError<boolean>(error);
  }
}

export interface IApiUpsertOptions extends IFirebaseRequest {
  entity: IEntity;
  colPath: string;
  convertToFirebase?: <T>(obj) => T
}

export async function firebaseUpsert(options: IApiUpsertOptions) {
  try {
    let entities = await firebaseUpsertBatch({
      entities: [options.entity],
      colPath: options.colPath,
      dispatch: options.dispatch,
      action: options.action,
      convertToFirebase: options.convertToFirebase
    });
    // this will return undefined if nothing in the array
    return entities[0];

  } catch (error) {
    throw error;
  }
}

export interface IApiUpsertBatchOptions extends IFirebaseRequest {
  entities: IEntity[];
  colPath: string;
  convertToFirebase?: <T>(obj) => T,
  byUser?: IUser,
}

export async function firebaseUpsertBatch(options: IApiUpsertBatchOptions) {
  await options.dispatch(beginApiCall(options.getState));
  try {
    let batch = db.batch();
    let nowIso = dateToIso(new Date());
    let deepEntities = options.entities;
    // UPDATE ENTITY PROPS
    let newDeepEntities = deepEntities.map(old => {
      let entity = { ...old };
      if (!entity.id) {
        entity.id = uuid();
        entity.created_utc = nowIso;
        entity.created_by = "user..";
      }
      entity.updated_utc = nowIso;
      entity.updated_by = "user..";
      return entity;
    });

    // SAVE SHALLOW ENTITIES - SINGLE BATCH (remember: max 500 records)
    let shallowEnties = newDeepEntities.map(entity => {
      if (options.convertToFirebase) {
        return options.convertToFirebase<IEntity>(entity)
      } else {
        return convertToShallow<IEntity>(entity)
      }
    });

    shallowEnties.forEach(entity => {
      let docRef = db.collection(options.colPath).doc(entity.id);
      batch.set(docRef, entity, { merge: true });
    });

    await batch.commit();

    return newDeepEntities;

  } catch (error) {

    await options.dispatch(apiCallComplete({
      type: options.action,
      success: false,
      message: JSON.stringify(error, null, 2)
    }));
    throw error;
  }
}

export function dateToIso(dtValue: Date) {
  return dtValue.toISOString();
}

export function convertToShallow<T>(obj) {
  let raw: T = _.extend({}, obj);
  // remove deep properties
  //raw = _.omit(raw, _.functions(raw));
  let keys = _.keys(obj).filter(key => _.isObject(obj[key]));
  raw = _.omit(raw, keys);
  return raw;
}


export async function firebaseUpsertBatchV2(options: IApiUpsertBatchOptionsV2) {
  try {
    let batch = db.batch();
    let nowIso = dateToIso(new Date());
    let deepEntities = options.entities;
    let newDeepEntities = deepEntities.map(old => {
      let entity = { ...old };
      if (!entity.id) {
        entity.id = uuid();
        entity.created_utc = nowIso;
        entity.created_by = options.byUser?.id ?? 'user';
      }
      entity.updated_utc = nowIso;
      entity.updated_by = options.byUser?.id ?? 'user';
      return entity;
    });

    // SAVE SHALLOW ENTITIES - SINGLE BATCH (remember: max 500 records)
    let shallowEnties = newDeepEntities.map(entity => {
      if (options.convertToFirebase) {
        return options.convertToFirebase<IEntity>(entity)
      } else {
        return convertToShallow<IEntity>(entity)
      }
    }
    );
    shallowEnties.forEach(entity => {
      let docRef = db.collection(options.colPath).doc(entity.id.toString());
      batch.set(docRef, entity, { merge: true });
    });

    await batch.commit();

    return newDeepEntities;

  } catch (error) {

    throw error;
  }
}

export async function firebaseUpsertBatchV3(options: IApiUpsertBatchOptionsV2) {
  try {
    let batch = db.batch();
    let nowIso = dateToIso(new Date());
    let deepEntities = options.entities;
    let newDeepEntities = deepEntities.map(old => {
      let entity = { ...old };
      if (!entity.id) {
        entity.id = uuid();
        entity.created_utc = nowIso;
        entity.created_by = options.byUser?.id ?? 'user';
      }
      entity.updated_utc = nowIso;
      entity.updated_by = options.byUser?.id ?? 'user';
      return entity;
    });

    // SAVE SHALLOW ENTITIES - SINGLE BATCH (remember: max 500 records)
    let shallowEnties = newDeepEntities.map(entity => {
      if (options.convertToFirebase) {

        return options.convertToFirebase<IEntity>(entity)
      } else {
        return convertToShallow<IEntity>(entity)
      }
    }
    );
    shallowEnties.forEach(entity => {
      let docRef = db.collection(options.colPath).doc(entity.id.toString());
      batch.set(docRef, entity, { merge: true });
    });

    await batch.commit();
    return Result.CreateSuccess(newDeepEntities);

    //return newDeepEntities;

  } catch (error) {
    return getFirebaseError(error);
  }
}

export async function firebaseGetDocument<T extends IEntity>(options: {
  colPath: string,
  docId: string,
}) {
  try {
    const path = `${options.colPath}/${options.docId}`;
    const docRef = db.doc(path);
    const snapshot = await docRef.get();

    if (snapshot.exists) {
      return Result.CreateSuccess(snapshot.data() as any as T);
    } else {
      return Result.CreateFailure<T>(`Not in Organisation?`);
    }
  } catch (error) {

    return getFirebaseError<T>(error);

  }
}

export async function firebaseSignIn(options: {
  email: string,
  password: string,
}) {
  try {
    let credential = await myFirebase
      .auth()
      .signInWithEmailAndPassword(options.email, options.password);

    if (credential?.user) {
      return Result.CreateSuccess(credential.user);
    } else {
      console.log('sign in failed');
      return getFirebaseError<firebase.User>("Log in failed (missing user details)");
    }

  } catch (error) {

    const failure = getFirebaseError<firebase.User>(error);
    console.dir(failure);
    return failure;

  }
}

export async function firebaseSignOut() {
  try {
    let credential = await myFirebase
      .auth()
      .signOut();

    return Result.CreateSuccess(true);

  } catch (error) {

    return getFirebaseError<boolean>(error);

  }
}


export async function firebaseUpsertDocument<T extends IEntity>(options: {
  colPath: string,
  doc: T,
  byUser?: IUser,
}) {

  try {
    let batch = db.batch();

    // options.doc.id = undefined as any;
    console.log(`docId: ${options.doc.id}`);
    let docRef = db.collection(options.colPath).doc(options.doc.id);
    let entity = updateTimestamps({ ...options.doc }, options.byUser);

    batch.set(docRef, entity, { merge: true });

    await batch.commit();

    return Result.CreateSuccess(entity);

  } catch (error) {
    debugger;
    return getFirebaseError<T>(error);

  }
}

export async function firebaseDeleteDocument(options: {
  docPath: string,
}) {

  try {
    // options.doc.id = undefined as any;
    console.log(`docId: ${options.docPath}`);
    let docRef = db.doc(options.docPath);
    await docRef.delete();

    return Result.CreateSuccess(true);

  } catch (error) {
    return getFirebaseError<boolean>(error);

  }
}

function getFirebaseError<T>(error: any) {
  let message = '';
  if (typeof error === 'string') {
    // debugger;
    message = error;
  } else if ((error as any).message) {
    // debugger;
    message = (error as any).message;
  } else {
    // debugger;
    message = (error as any).toString();
  }
  return Result.CreateFailure<T>(message);
}

export function updateTimestamps<T extends IEntity>(entity: T, user?: IUser) {
  let nowIso = dateToIso(new Date());

  if (!entity.created_utc) {
    // entity.id = uuid();
    entity.created_utc = nowIso;
    entity.created_by = user?.email ?? '';
  }

  entity.updated_utc = nowIso;
  entity.updated_by = user?.email ?? '';

  return entity;
}

export interface IApiUpsertBatchOptionsV2 {
  entities: any;
  colPath: string;
  convertToFirebase?: <T>(obj) => T,
  byUser?: IUser,
}

export async function registerUser(options: { email: string, password: string }) {

  try {
    let credential = await myFirebase
      .auth()
      .createUserWithEmailAndPassword(options.email, options.password);

    if (credential?.user?.uid) {
      return Result.CreateSuccess(credential.user);
    } else {
      return Result.CreateFailure<firebase.User>(`User could not be registered (?)`);
    }

  } catch (error) {

    return getFirebaseError<firebase.User>(error);

  }
}


export async function loginExists(options: { email: string }) {

  try {
    let signinMethods = await myFirebase
      .auth()
      .fetchSignInMethodsForEmail(options.email);

    return Result.CreateSuccess(signinMethods?.length !== 0);

  } catch (error) {

    return getFirebaseError<boolean>(error);

  }
}



export async function firebaseGetDocumentV2<T extends IEntity>(options: {
  colPath: string,
}) {
  try {
    const path = `${options.colPath}`;
    const test = db.doc(path);
    const snapshot = await test.get();
    if (snapshot.exists) {
      return Result.CreateSuccess(snapshot.data() as any as T);
    } else {
      return Result.CreateFailure<T>(`Document not found [${path}]`);
    }
  } catch (error) {
    return getFirebaseError<T>(error);
  }
}
export interface IWhereClause {
  fieldPath: string;
  opStr: firebase.firestore.WhereFilterOp;
  value: any
}

export async function firebaseGetCollectionGroup<T extends IEntity>(options: {
  colGroupName: string,
  clauses: IWhereClause[],
}) {
  try {
    let query = db.collectionGroup(options.colGroupName);

    if (options.clauses) {
      query = options.clauses
        .reduce((memo, clause) => memo.where(clause.fieldPath, clause.opStr, clause.value), query);
    }

    const snapshot = await query.get();

    const docs = snapshot.docs.map(e => e.data() as T);

    return Result.CreateSuccess(docs);
  } catch (error) {
    return getFirebaseError<T[]>(error);
  }
}

export async function firebaseGetDocumentOrNull<T extends IEntity>(options: {
  docPath: string,
}) {
  try {
    const path = `${options.docPath}`;
    const test = db.doc(path);
    const snapshot = await test.get();
    if (snapshot.exists) {
      return Result.CreateSuccess(snapshot.data() as any as T);
    } else {
      return Result.CreateSuccess(null as any as T);
    }
  } catch (error) {
    return getFirebaseError<T>(error);
  }
}
