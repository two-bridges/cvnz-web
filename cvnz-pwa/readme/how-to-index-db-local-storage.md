
Notes: 
1. How to - Setup Local Storage in React - [here](#how-to---setup-indexeddb-in-react)
2. define the IndexedDB database - [here](#how-to---define-the-indexeddb-database)
3. use IndexedDB in a Component - [here](#how-to---use-indexeddb-in-a-component)


# How to - Setup IndexedDB in React
guide: https://dev.to/esponges/indexeddb-your-offline-and-serverless-db-in-your-browser-with-react-3hm7


# How to - Use IndexedDB in a Component
```typescript
import { useState } from 'react';
import { initDB } from '../lib/db';

export default function Home() {
  const [isDBReady, setIsDBReady] = useState<boolean>(false);

  const handleInitDB = async () => {
    const status = await initDB();
    setIsDBReady(status);
  };

  return (
    <main style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h1>IndexedDB</h1>
      {!isDBReady ? (
        <button onClick={handleInitDB}>Init DB</button>
      ) : (
        <h2>DB is ready</h2>
      )}
    </main>
  );
}

```


# How to - Define the IndexedDB database
https://dev.to/esponges/indexeddb-your-offline-and-serverless-db-in-your-browser-with-react-3hm7
```typescript
// db.ts

let request: IDBOpenDBRequest;
let db: IDBDatabase;
let version = 1;

export interface User {
  id: string;
  name: string;
  email: string;
}

export enum Stores {
  Users = 'users',
}

export const initDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // open the connection
    request = indexedDB.open('myDB');
    
    request.onupgradeneeded = () => {
      db = request.result;

      // if the data object store doesn't exist, create it
      if (!db.objectStoreNames.contains(Stores.Users)) {
        console.log('Creating users store');
        db.createObjectStore(Stores.Users, { keyPath: 'id' });
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
```
