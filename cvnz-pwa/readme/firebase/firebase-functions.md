# Dev Machine Setup

* local emulator: https://firebase.google.com/docs/functions/local-emulator
* vscode debugging: https://medium.com/firebase-developers/debugging-firebase-functions-in-vs-code-a1caf22db0b2

```bash

npm install -g firebase-tools

# enable port 9229 with --inspect-functions
# (see launch.json to attach to 9229)
cd ~/code/cva/cva-web && firebase emulators:start --inspect-functions --only functions


```
