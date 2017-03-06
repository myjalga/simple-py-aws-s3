# Simple AWS S3 Browser Web Application
Browse the files
---

##User Guide
* At home page, the user can create a bucket by clicking the `Create Bucket` at the upper right of the panel.
  * Create Bucket will let the user create a bucket in the Home directory.
* Bucket can easily be browse by clicking the list at Home directory.
* At bucket directory, actions at the upper right of the panel will update. Actions you can take are: `Rename Bucket`, `Upload File`, and   * Rename Bucket will let the user to rename the bucket selected.
  * Upload File will let the user upload the file in a selected bucket.
  * Delete Bucket will let the user delete the bucket.
* At the bucket, the user will see the list of files uploaded in a specific bucket. By clicking the file, the user can take 2 actions: `Download` and `Delete`.
  * Download will let user download the file.
  * Delete will let the user delete the file.
  
  
  
---
##Developer's Guide
* server.py
  * This file will create server for the web app.
* bucket.py
  * Functions for every APIs.
* public folder
  * public files that can access at front-end side
  * Also includes the HTML, CSS, JS, and media.

