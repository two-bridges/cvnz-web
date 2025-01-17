 # CVA

## Dev

```
# run in debug
npm run start:dev
```

## DEBUGGING in Vscode

```
# 1. start project and cli first
npm run start:dev

# 2. launch chrome debugger:
# (F5) Run the "launch" config

# nb. "attach" doesn't work, use launch
```

# Deploy Mac 
see: ./readme/hosting/firebase-deploy.md

## Old Deploy to Two Bridges AWS EC2

```
# 1. build in release mode (outputs ./build )
# 2. push to git
# 3. release on production

npm run build \
    && . stage_from_mac.sh \
    && echo Two Bridges LIVE \(AWS\) \
    && echo "ec2-user> release-cva" \
    && ssh ec2-user@52.2.214.55 
    
ec2-user> `release-cva`
```

http://cvatest.twobridges.com.au

## Deploy PC
`# gitbash (cmd.exe > start_bash.bat)`

`# 1. build in release mode (outputs ./build )`
`npm run build`

`# 2. push to git`

`cd /c/code/CVA/ReactApp_CVA`

`. deploy`

`# 3. release on production`

local> `ssh ec2-user@52.2.214.55; # ssh to twobridges live aws`

ec2-user> `release-cva`

## SSH

`ssh ec2-user@52.2.214.55; # ssh to twobridges live aws`

http://cvatest.twobridges.com.au

# Devias Material Kit Pro

## Client & Admin Dashboard Kit

A professional kit that comes with plenty of ready-to-use Material-UI© components developed with one common goal in mind, help you build faster & beautiful applications. Each component is fully customizable, responsive and easy to integrate.

### Features

- 32 Pages Examples
- Fully Responsive
- Built with React Hooks API
- Redux as State Manager
- Routing System
- Light Functionality Components
- Ready-to-deploy folder structure
- Complete User Flows
- Easy Color Changes
- Consistent Updates

### Examples

- [Overview](https://react-material-kit.devias.io/overview)
- [Default Dashboard Page](https://react-material-kit.devias.io/dashboards/default)
- [Analytics Dashboard Page](https://react-material-kit.devias.io/dashboards/analytics)
- [User Management List Page](https://react-material-kit.devias.io/management/customers)
- [User Management Summary Page](https://react-material-kit.devias.io/management/customers/1/summary)
- [User Management Invoices Page](https://react-material-kit.devias.io/management/customers/1/invoices)
- [User Management Logs Page](https://react-material-kit.devias.io/management/customers/1/logs)
- [Product Management List Page](https://react-material-kit.devias.io/management/projects)
- [Order Management List Page](https://react-material-kit.devias.io/management/orders)
- [Order Management Details Page](https://react-material-kit.devias.io/management/orders/1)
- [Social Feed Page](https://react-material-kit.devias.io/social-feed)
- [User Timeline Page](https://react-material-kit.devias.io/profile/1/timeline)
- [User Connections Page](https://react-material-kit.devias.io/profile/1/connections)
- [User Projects Page](https://react-material-kit.devias.io/profile/1/projects)
- [User Reviews Page](https://react-material-kit.devias.io/profile/1/reviews)
- [Project List Page](https://react-material-kit.devias.io/projects)
- [Project Create Page](https://react-material-kit.devias.io/projects/create)
- [Project Overview Page](https://react-material-kit.devias.io/projects/1/overview)
- [Project Files Page](https://react-material-kit.devias.io/projects/1/files)
- [Project Activity Page](https://react-material-kit.devias.io/projects/1/activity)
- [Project Subscribers Page](https://react-material-kit.devias.io/projects/1/subscribers)
- [Invoice Details Page](https://react-material-kit.devias.io/invoices/1)
- [KanbanBoard Application](https://react-material-kit.devias.io/kanban-board)
- [Mail Application](https://react-material-kit.devias.io/mail)
- [Chat Application](https://react-material-kit.devias.io/chat)
- [Calendar Application](https://react-material-kit.devias.io/calendar)
- [Settings Page](https://react-material-kit.devias.io/settings)
- [Sign Up Page](https://react-material-kit.devias.io/auth/register)
- [Sign In Page](https://react-material-kit.devias.io/auth/login)
- [Error 401 Page](https://react-material-kit.devias.io/errors/error-401)
- [Error 404 Page](https://react-material-kit.devias.io/errors/error-404)
- [Error 500 Page](https://react-material-kit.devias.io/errors/error-500)

### Build with

- React
- Material-UI
- Redux
- DraftJS
- ChartJS
- PrismJS
- React Markdown
- React Full Calendar

### Quick start

- Install dependencies: `npm install` or `yarn`
- Start the server: `npm run start` or `yarn start`
- Views are on: `localhost:3000`
- Latest node & react versions recommended
