
#  Importing and exporting data from firebase
```bash

## RUN ALL TESTS
cd ~/code/cva/cva-web/functions && npm run test

## copy modules into test
find . -not -path "./cva-pwa/node_modules/*" -not -path "./functions/node_modules/*" | grep .d.ts

## RUN ONE TEST
cd ~/code/cva/cva-web/functions \
  && export GOOGLE_APPLICATION_CREDENTIALS=~/code/cva/cva-web/functions/service_account/cvaus-53a3a-cbc9666bd185.json \
  && ls -l $GOOGLE_APPLICATION_CREDENTIALS \
  && npm run build \
  && cp -r service_account lib/service_account \
  && npx mocha --reporter spec lib/test/index.test.js --exit

# google cloud platform > search: "Import/Export"
 
# export data to local application
cd ~/code/cva/cva-web/functions && gsutil -m cp -r "gs://cvaus-53a3a.appspot.com/db-export-2" .

# Start functions in emulator
firebase emulators:start --import ./db-export-2 --inspect-functions

use command "gsutil -m cp -r "gs://cvaus-53a3a.appspot.com/db-export-2"   ." to export data to local application
Import data into emulator database using "firebase emulators:start --import ./db-export-2"



Start functions in emulator: firebase emulators:start --import ./db-export-2 --inspect-functions
