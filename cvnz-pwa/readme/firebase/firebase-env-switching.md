
# Env Switch

```bash
# list projects and ids
firebase projects:list

# add dev and test projects
In your .firebaserc, set different project IDs like this:
{
  "projects": {
    "prod": "fieldbase-f726c",
    "dev": "cvaus-53a3a"
  },
  "targets": {}
}
# use dev
firebase use dev

# use production
firebase use production

```


https://stackoverflow.com/a/63038859/2396191


