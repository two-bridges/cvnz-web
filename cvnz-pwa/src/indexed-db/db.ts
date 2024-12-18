// db.ts

import { Result } from "src/lib/result.model";

let request: IDBOpenDBRequest;
let db: IDBDatabase;
let version = 4;

export enum Stores {
  Users = 'users',

}

export const initDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // open the connection
    request = indexedDB.open('myDB', version);

    request.onupgradeneeded = () => {
      db = request.result;

      // if the data object store doesn't exist, create it
      if (!db.objectStoreNames.contains(Stores.Users)) {
        console.log('Creating users store');
        const objectStore = db.createObjectStore(Stores.Users, { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex("id", "id", { unique: true });

      }
      // no need to resolve here
    };

    request.onsuccess = () => {
      db = request.result;
      version = db.version;
      console.log('request.onsuccess - initDB', version);
      resolve(true);
    };

    request.onerror = () => {
      resolve(false);
    };
  });
};

export interface ILocalData<T> {
  id: string;
  data: T;
}

export const saveLocalData = <T>(storeName: string, data: ILocalData<T>): Promise<Result<ILocalData<T>>> => {
  return new Promise((resolve) => {
    request = indexedDB.open('myDB', version);

    request.onsuccess = () => {
      console.log('request.onsuccess - addData', data);
      db = request.result;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      store.add(data);
      resolve(Result.CreateSuccess(data));
    };

    request.onerror = () => {
      const error = request.error?.message
      if (error) {
        resolve(Result.CreateFailure<ILocalData<T>>(error));
      } else {
        resolve(Result.CreateFailure<ILocalData<T>>('Unknown error'));
      }
    };
  });
};
