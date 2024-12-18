

```bash
# https://mui.com/material-ui/migration/migration-v4/
# RECOMMENDED: The following codemods will automatically adjust the bulk of your code to account for breaking changes in v5.
npx @mui/codemod v5.0.0/preset-safe


# aim for this:
#     - npm update @material-ui/core@^4.11.2 react@^17.0.0
# but with this:
#     - npm install @material-ui/core@^4.11.2 react@^17.0.0 react-dom@^17.0.0 @types/react@^17.0.0 @types/react-dom@^17.0.0
#     - first, we need to upgrade react-scripts

# migrate: react-scripts

# 3.x upgrades, as per https://github.com/facebook/create-react-app/blob/main/CHANGELOG-3.x.md
npm install --save --save-exact react-scripts@3.3.0 --force
npm install --save --save-exact react-scripts@3.3.1 --force
npm install --save --save-exact react-scripts@3.4.0 --force
npm install --save --save-exact react-scripts@3.4.1 --force
npm install --save --save-exact react-scripts@3.4.2 --force
npm install --save --save-exact react-scripts@3.4.3 --force
npm install --save --save-exact react-scripts@3.4.4 --force

# 4.x upgrades, as per https://github.com/facebook/create-react-app/blob/main/CHANGELOG-4.x.md
npm install --save --save-exact react-scripts@4.0.0 --force
npm install --save --save-exact react-scripts@4.0.1 --force
npm install --save --save-exact react-scripts@4.0.2 --force
npm install --save --save-exact react-scripts@4.0.3 --force

npm install @material-ui/core@^4.11.2 react@^17.0.0 react-dom@^17.0.0 @types/react@^17.0.0 @types/react-dom@^17.0.0

# TODO: Make sure that your application is still running without errors, and commit the changes before continuing to the next step

# 0. npm run start:dev  
# Errors camee with these suggestions from Create React App:

# 1. Delete package-lock.json (not package.json!) and/or yarn.lock in your project folder.
# 2. Delete node_modules in your project folder.
# 3. Remove "eslint" from dependencies and/or devDependencies in the package.json file in your project folder.
# 4. Run npm install or yarn, depending on the package manager you use.
npm install

npm rm material-ui-dropzone --force
npm rm react-edit-inline --force
npm rm react-html-parser --force # NEEDS REPLACEMENT
npm rm react-images-upload --force # NEEDS REPLACEMENT with `react-images-uploading`
npm rm @material-ui/lab --force # NEEDS REPLACEMENT with @mui/lab
npm rm @material-ui/pickers --force # NEEDS REPLACEMENT see https://mui.com/material-ui/migration/migration-v4/#date-and-time-pickers 

# we need to update a large number of affected packages at once (eg. npm will check the full set of new dependencies for compatibility)
npm i @material-ui/core@^4.11.2 @material-ui/icons@^4.11.2 @material-ui/styles@^4.11.2 @fullcalendar/core@5.4.0 @fullcalendar/daygrid@5.4.0 @fullcalendar/interaction@5.4.0 @fullcalendar/list@5.4.0 @fullcalendar/react@5.4.0 @fullcalendar/timegrid@5.4.0 @fullcalendar/timeline@5.4.0 draft-js@0.11.7 react-beautiful-dnd@13.1.0 react-big-calendar@1.5.2 html-react-parser@3.0.6 react-images-uploading@3.1.7 react-markdown@8.0.0 react-paginate@8.1.4 react-uid@2.3.2

npm install @emotion/react @emotion/styled
npm install @mui/material @mui/styles
npm install @mui/lab
npm install @mui/icons-material

npm install @mui/x-date-pickers
npx @mui/codemod v5.0.0/date-pickers-moved-to-x .
npx @mui/codemod v5.0.0/preset-safe .

# skipped: npx @mui/codemod v5.0.0/variant-prop .

npm run start:dev

npm i react-helmet@6.1.0

# == RUN CODE DOWN TO HERE == 
npm i eslint@6.1.0

```


# legacy-peer-deps... quote: "This issue is being driven, in part, by React v17+"

```bash
https://stackoverflow.com/questions/66239691/what-does-npm-install-legacy-peer-deps-do-exactly-when-is-it-recommended-wh

# FTW: use --legacy-peer-deps npm option to avoid react v17+ issues (eg. packages do not specify which react version, which causes dependency issues in recent npm)
# as per: https://stackoverflow.com/a/71769922/2396191
# what is "legacy-peer-deps": 
#     * https://stackoverflow.com/questions/66239691/what-does-npm-install-legacy-peer-deps-do-exactly-when-is-it-recommended-wh
#     * quote: "This issue is being driven, in part, by React v17+"
# how to check if you installed with "legacy-peer-deps": 
#     * npm info name-of-module peerDependencies


```

