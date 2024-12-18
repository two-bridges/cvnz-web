

# offline mode
* login - switch to offline mode as 'dean.grande'
  * 
* login
  * if the user can authenticate then that's great
  * the user may choose to change to offline mode
  * on the login screen, the user may choose "offline".  If so, they will be logged in with offline credentials (ie. no password but their username will be taken from local storage)
  * if the user is offline, then they will not be able to access any data that is not already on the device
  * when the user tries to connect back online, they must do so from the login page
  
  * if there is not internet, prompt user to switch to offline mode
  * internet can come and go.  if the user is logged in, then allow them to continue working
* parent: https://twobridges.atlassian.net/browse/CVA21-170
  * Andrew Hill - design notes - https://twobridges.atlassian.net/browse/CVA21-185
  * remember device login
    

# older stuff

* setup the live site
* admin org user -> invite (email, firstname, surname, password?)
  * inviteUserToOrg
    * registerUser
    * saveUserDoc
    * addUserToOrg
  * registerUser
    * load identity by email
    * create user
  * saveUserDoc
    * load existing user
    * create user
  * addUserToOrg
    * /Orgnisation/xyz/Users
    * load existing 
    * create user
* disable org user
  * remove user from /Organisation/xyz/users