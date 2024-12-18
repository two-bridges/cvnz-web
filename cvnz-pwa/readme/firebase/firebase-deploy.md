# Dev Machine Setup
```bash
npm install -g firebase-tools

firebase login

```

# Upload static web to firebase hosting
* with a single command: https://firebase.google.com/docs/hosting
* using the cli: https://firebase.google.com/docs/cli


```bash
# docs
https://firebase.google.com/docs/cli/targets

# dg: TBC. is this how we can change our firebase project?  Ie. if we want to use a separate project for Dev and Live?
firebase target:apply hosting cva-dev cvaus-53a3a


# LIVE (without service worker)
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

# DEPLOY (after build step above...)
firebase deploy --only functions
firebase deploy --only hosting
firebase deploy --only firestore:indexes
firebase deploy --only firestore:rules

# web only DEV
    && git add . && git commit -m "Pre Build" \
    ; VER_PATCH=$(npm --no-git-tag-version version patch -m "Upgrade" | cut -c2-99) \

# DEV (without service worker)
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

# DEPLOY (after build step above...)
firebase deploy --only functions
firebase deploy --only hosting
firebase deploy --only firestore:indexes
firebase deploy --only firestore:rules

# extract indexes from DEV
firebase firestore:indexes > firestore.indexes.json
  
cd ~/code/cva/cva-web/cva-pwa && cp src/sw/sw-deactivate.txt src/sw/sw-enabled.ts

cd ~/code/cva/cva-web/indexes \
  && firebase use dev \
  && firebase firestore:indexes > firestore.indexes.json

# DEV (WITH service worker enabled)
# cd ~/code/cva/cva-web/cva-pwa \
#   && firebase use dev \
#   && cp src/sw/sw-activate.txt src/sw/sw-enabled.ts \
#   && npm run build:dev \
#   && npm run build-sw \
#   && cd .. \
#   && firebase deploy --only hosting \
#   && echo "Chrome > Dev Tools > Application > Service Workers > tap UNREGISTER > RELOAD PAGE"


# Everything (slowest)
firebase deploy 

# Hosting
cd ~/code/cva/cva-web \
  && firebase deploy --only hosting

# functions DEV
cd ~/code/cva/cva-web \
  && firebase use dev \
  && firebase deploy --debug --only functions

cd ~/code/cva/cva-web \
  && firebase use dev \
  && firebase deploy --only functions:goalList

# Storage
cd ~/code/cva/cva-web \
  && firebase deploy --only storage

# Database
cd ~/code/cva/cva-web \
  && firebase deploy --only firestore

# static web only
cd ..
firebase deploy --only storage

```

