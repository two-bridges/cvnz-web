# Firebase Rules
see: `./firestore.rules`

```bash


# DEV Indexes (see firestore.rules)
cd ~/code/cva/cva-web/cva-pwa \
  && firebase use dev \
  && firebase deploy --only firestore:rules

# LIVE Indexes (see firestore.rules)
cd ~/code/cva/cva-web/cva-pwa \
  && firebase use prod \
  && firebase deploy --only firestore:rules

```

# Rules Reference:
> https://firebase.google.com/docs/rules/rules-language

## Match Block
Match statements point to documents, NOT collections

Matches against a path pattern may be partial or complete:
* Partial matches: The path pattern is a prefix-match of the request.path.
  * When a complete match is made the rules within the block are evaluated.
* Complete matches: The path pattern matches the entire request.path.
  * When a partial match is made the nested match rules are tested to see whether any nested path will complete the match

Wildcards
* Single-segment wildcard: 
  * A wildcard variable is declared in a path by wrapping a variable in curly braces: `{variable}`.
  * This variable is accessible within the match statement as a string.
  * eg. `match /users/{userId}/images/{imageId}`
  ```c++
    match /users/{userId}/images/{imageId} {
      // userId is a string variable. We can compare it to request.auth.uid.
      // imageId is a string variable, so we can perform `imageId.matches()` on this variable
      allow write: if request.auth != null && request.auth.uid == userId && imageId.matches('*.png');
    }
  ```

* Recursive wildcard: 
  * The recursive, or multi-segment, wildcard matches multiple path segments at or below a path. 
  * This wildcard matches all paths below the location you set it to. 
  * You can declare it by adding the =** string at the end of your segment variable: `{variable=**}`
  * This variable is accessible within the match statement as a path object.  
  * TBD

## Allow
* If ANY of the allow rules for the method are satisfied, the request is allowed. 
  * So, if a broad rule is matched, more granular rules will be ignored
  * eg.
  ```c++
  service firebase.storage {
    // Allow the requestor to read or delete any resource on a path under the
    // user directory.
    match /users/{userId}/{anyUserFile=**} {
      allow read, delete: if request.auth != null && request.auth.uid == userId;
    }

    // Allow the requestor to create or update their own images.
    // When 'request.method' == 'delete' this rule and the one matching
    // any path under the user directory would both match and the `delete`
    // would be permitted.

    match /users/{userId}/images/{imageId} {
      // Whether to permit the request depends on the logical OR of all
      // matched rules. This means that even if this rule did not explicitly
      // allow the 'delete' the earlier rule would have.
      allow write: if request.auth != null && request.auth.uid == userId && imageId.matches('*.png');
    }
  }
  
* Convenience Methods
  * read
  * write
* Standard Methods
  * get
  * list
  * create
  * update
  * delete

## Functions
* Function Limitations
  * Functions can contain only a single return statement. 
    They cannot contain any additional logic. For example, they cannot execute loops or call external services.
  * Functions can automatically access functions and variables from the scope in which they are defined. 
    For example, a function defined within the service cloud.firestore scope has access to the resource variable and built-in functions such as get() and exists().
  * Functions may call other functions but may not recurse. 
    The total call stack depth is limited to 20.
  * In rules version v2, functions can define variables using the let keyword. 
    Functions can have up to 10 let bindings, but must end with a return statement.

```c++
function isSysAdmin(userId) {
  return exists(/databases/$(database)/documents/Admins/$(userId));
}
function isOrgAdmin(userId, orgId) {
  return exists(/databases/$(database)/documents/Organisations/$(orgId)/Admins/$(userId));
}
match /Organisations/{orgId} {
  function isOrgUser(userId) {
    // orgId variable is in scope since the function is inside the `match` that defines orgId
    return exists(/databases/$(database)/documents/Organisations/$(orgId)/Users/$(userId));
  }
}
function signedInOrPublic() {
  // resource.data refers to the document at the target location
  // therefore 'visibility' is just a normal document field (not a special firebase thing)
  // the developers of this example have added the field 'visibility' to denote something as public
  return request.auth.uid != null || resource.data.visibility == 'public';
}


```

## Example Rule

```c++ (dg: i'm using a c++ code block to get basic code highlighting for comments and bracket colours)

// request.path == /example/hello/nested/path
service firebase.storage {
  // Partial match.
  match /example/{singleSegment} {   // `singleSegment` == 'hello'
    allow write;                     // Write rule not evaluated.
    // Complete match.
    match /nested/path {             // `singleSegment` visible in scope.
      allow read;                    // Read rule is evaluated.
    }
  }
  // Complete match.
  match /example/{multiSegment=**} { // `multiSegment` == /hello/nested/path
    allow read;                      // Read rule is evaluated.
  }
}

```
