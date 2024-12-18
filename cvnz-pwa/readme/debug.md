 # CVA

1. [How To - New Dev Machine Setup](#how-to---new-dev-machine-setup)
2. [How To - Debug in VSCode](#how-to---debug-in-vscode)


## How To - Debug in VSCode

```bash

# 1. start project and cli first
npm run start:dev

# 2. launch chrome debugger:
# (F5) Run the "launch" config
# nb. "attach" doesn't work, use launch

# a. open the ADMIN login page; or, (b)
VsCode > Run and Debug > “Dev - Admin (cva-pwa)” > START
# b. open an ORG login page
VsCode > Run and Debug > “Dev - Org - dg_test_11 (cva-pwa)” > START

# 3. DG login.  msecure: "CVA - fieldbase login - dean.grande@twobridges.com.au"


```

# How To - New Dev Machine Setup

```bash
# First time:
cd cva-pwa

# clean and install npm packages
npm run clean


```

# Sample Induction Notes

https://drive.google.com/drive/folders/1FsIDhouJHRwOuh_UOCKH7dAhM6n4hpwY 


# Firebase - Live vs Test
Live:
https://fieldbase-f726c.web.app/auth/admin/login

Test:
https://cvaus-53a3a.web.app/auth/admin/login

