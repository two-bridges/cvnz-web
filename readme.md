

# Getting Started

# get source code....
```bash
# clone the repo from github to a local folder... 
# eg. ~/code/cvnz/cvnz-web

```

# root folders
```bash

# ./functions/
#   * this contains the firestore functions which are deployed to firebase and run in the cloud.  
#   * eg. these are used for sending emails, updating firestore data, etc.

# ./cvnz-pwa/
#   * this contains the React application which is deployed to Firebase Hosting

```

# npm install....
* fyi, the packages require a 'force' install
* tested with:
  * node version: v18.20.5
  * npm version: 10.8.2
```bash
# the packages require a 'force' install
npm i --force


# FYI, I've tested this with the following versions...
# v18.20.5
node --version

# 10.8.2
npm --version 



```

# setup new firebase projects: dev and production
```bash
```

# configure firebase project settings in source code
```bash
# contains the ACTIVE firebase project settings
./cvnz-web/cvnz-pwa/src/firebase/firebase.ts
# LIVE firebase project settings.  Copy this to firebase.ts to access live
./cvnz-web/cvnz-pwa/src/firebase/firebase-config-live.txt
# DEV firebase project settings.  Copy this to firebase.ts to access dev firestore
./cvnz-web/cvnz-pwa/src/firebase/firebase-config-dev.txt
```

# local debug source code
```bash
```

# deploy to firebase....

* firebase hosts different services, so you can deploy different parts of the app separately
* eg. these can be all deployed separately:
  * web files, firestore functions, firestore rules, firestore indexes
* the React application is deployed to Firebase Hosting
* firebase functions, must be deployed to Firebase Functions and are executed in the cloud with cloud 

```bash
# LIVE compile (without service worker)
#eg. steps to compile and deploy for CVA (aus).  change this for your local environment
cd ~/code/cva/cva-web/cva-pwa \
  && VER_PATCH=$(npm --no-git-tag-version version patch -m "Upgrade" | cut -c2-99) \
  && echo '## environment.ts ## ' \
  && echo '' > src/environment/environment.ts \
  && echo 'export var isDev = false;' >> src/environment/environment.ts \
  && echo "export var version = 'v${VER_PATCH}'" >> src/environment/environment.ts \
  && git add . && git commit -m "vesrion v${VER_PATCH}" \
  && firebase use prod \
  && cp src/sw/sw-deactivate.txt src/sw/sw-enabled.ts \
  && npm run build:live \
  && cd .. \
  && firebase deploy --only hosting \
  && echo "done"

# DEV compile (without service worker)
cd ~/code/cva/cva-web/cva-pwa \
  && VER_PATCH=$(npm --no-git-tag-version version patch -m "Upgrade" | cut -c2-99) \
  && echo '## environment.ts ## ' \
  && echo '' > src/environment/environment.ts \
  && echo 'export var isDev = false;' >> src/environment/environment.ts \
  && echo "export var version = 'v${VER_PATCH}'" >> src/environment/environment.ts \
  && git add . && git commit -m "vesrion v${VER_PATCH}" \
  && firebase use dev \
  && cp src/sw/sw-deactivate.txt src/sw/sw-enabled.ts \
  && npm run build:dev \
  && cd .. \
  && firebase deploy --only hosting \
  && echo "Chrome > Dev Tools > Application > Service Workers > tap UNREGISTER > RELOAD PAGE"

# deploy web files...
firebase deploy --only hosting
# deploy firestore functions
firebase deploy --only functions
# deploy firestore rules
firebase deploy --only firestore:rules
# deploy firestore indexes
firebase deploy --only firestore:indexes

```


# Firestore Service

## Firebase config files
reference: https://firebase.google.com/docs/hosting/full-config

### ./firebase.json
* configures which files to deploy to Firebase Hosting
  
### ./firestore.indexes.json
* configures which firestore indexes to create
  
### ./firestore.rules
* limit access to firestore data based on the authenticated user
* eg. admin users may have wider access than an orgnisation-specific user
  
### ./.firebaserc
* configure which project Ids you have setup. 
* you should setup at least two projects for development and production, so that you can test changes before deploying to production
* get the project Ids from the Firebase console

```json
{
  "projects": {
    "prod": "__prod__project__id__",
    "dev": "__dev__project__id__",
    "default": "__dev__project__id__"
  },
  "targets": {}
}
```


# Firebase - Live vs Test
eg. for CVA (aus)

Live:
https://fieldbase-f726c.web.app/auth/admin/login

Test:
https://cvaus-53a3a.web.app/auth/admin/login

