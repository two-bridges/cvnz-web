
Notes: 
1. How to fix - _You are loading @emotion/react when it is already loaded_ - [here](#how-to-fix---you-are-loading-emotionreact-when-it-is-already-loaded)
2. 


# How to fix - _You are loading @emotion/react when it is already loaded_

https://github.com/emotion-js/emotion/discussions/2795

DG: this occurs when there are different package dependencies.  Try to make all @mui/* packages rely on the same @emotion/react version.

You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used.


```bash

# list the various versions installed locally
npm why @emotion/react | grep emotion

@emotion/react@11.10.5
node_modules/@emotion/react
  @emotion/react@"^11.10.5" from the root project
  peer @emotion/react@"^11.0.0-rc.0" from @emotion/styled@11.10.5
  node_modules/@emotion/styled
    @emotion/styled@"^11.10.5" from the root project
    peerOptional @emotion/styled@"^11.3.0" from @mui/lab@5.0.0-alpha.114
    peerOptional @emotion/styled@"^11.3.0" from @mui/material@5.11.2
    peerOptional @emotion/styled@"^11.3.0" from @mui/styled-engine@5.11.0
    peerOptional @emotion/styled@"^11.3.0" from @mui/system@5.11.2
    peerOptional @emotion/styled@"^11.8.1" from @mui/x-date-pickers@5.0.12
  peerOptional @emotion/react@"^11.5.0" from @mui/lab@5.0.0-alpha.114
  peerOptional @emotion/react@"^11.5.0" from @mui/material@5.11.2
  peerOptional @emotion/react@"^11.4.1" from @mui/styled-engine@5.11.0
  peerOptional @emotion/react@"^11.5.0" from @mui/system@5.11.2
  peerOptional @emotion/react@"^11.9.0" from @mui/x-date-pickers@5.0.12
  @emotion/react@"^11.1.1" from react-select@4.3.1

# why version do we want our packages to depend on?
# let's go with: @emotion/react@"^11.5.0

# find the right version with the desired dependency


```