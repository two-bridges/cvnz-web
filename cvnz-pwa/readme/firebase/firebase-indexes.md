# Dev Machine Setup
```bash

# DEV: extract indexes from DEV
cd ~/code/cva/cva-web/cva-pwa \
  && firebase use dev \
  && firebase firestore:indexes > firestore.indexes.json


# DEV: Deploy index file
cd ~/code/cva/cva-web/cva-pwa \
  && firebase use dev \
  && firebase deploy --only firestore:indexes

# LIVE: Deploy index file
cd ~/code/cva/cva-web/cva-pwa \
  && firebase use prod \
  && firebase deploy --only firestore:indexes

```

