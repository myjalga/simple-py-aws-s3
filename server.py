#!/usr/bin/env python

import os
from flask import Flask, request, send_from_directory, jsonify, make_response, Response
from werkzeug import secure_filename
import bucket

_dir = os.path.dirname(os.path.abspath(__file__))

_app = Flask(
    __name__,
    static_url_path= _dir + '/public',
    static_folder='public'
)

# Get request main HTML frontend
@_app.route("/")
def front():
    return _app.send_static_file("index.html")

# Get static files
@_app.route("/public/<path:path>")
def staticFile(path):
    return _app.send_static_file(path)

# Get request API's

###########################################################
# API for browsing the buckets
###########################################################
# Browse buckets
@_app.route("/api/get/buckets")
def browseBuckets():
    return jsonify(buckets=bucket.getBuckets())

# Get files in a bucket
@_app.route("/api/get/bucket/files")
def getFilesInABucket():
    bucketName = request.args.get('bucket')
    return jsonify(files=bucket.getBucketContent(bucketName))


############################################################
# API for Bucket
############################################################
# Create a bucket
@_app.route("/api/create/bucket", methods=["POST"])
def createBucket():
    name = request.form['name']
    return jsonify(success=bucket.createBucket(name))

# Delete a bucket
@_app.route("/api/delete/bucket", methods=["POST"])
def deleteBucket():
    name = request.form['bucket']
    return jsonify(success=bucket.deleteBucket(name))

# Rename a bucket
@_app.route("/api/rename/bucket", methods=["POST"])
def renameBucket():
    prev = request.form['prevname']
    newn = request.form['newname']
    return jsonify(success=bucket.renameBucket(prev, newn))

############################################################
# API for files
############################################################
# Uploading files
@_app.route("/api/upload/file", methods=["POST"])
def uploadFile():
    bucketname = request.form['bucket']
    file = request.files['file']
    filename = secure_filename(file.filename) 
    dirs = _dir + '/public/files/' + bucketname + '/' + filename
    file.save(dirs)
    bucket.uploadFileToBucket(bucketname, file.filename, dirs)
    return jsonify(success=True)

@_app.route("/api/delete/file", methods=["POST"])
def deleteFile():
    bucketname = request.form['bucket']
    filename = request.form['file']
    return jsonify(success=bucket.deleteFile(bucketname, filename))

@_app.route("/api/download/file")
def downloadFile():
    bucketName = request.args.get('bucket')
    filename = request.args.get('file')
    bucket.downloadFile(bucketName, filename)
    return jsonify(path='/public/files/' + bucketName + '/' + filename)

if __name__ == "__main__":
    _app.run(
        host="188.166.181.87",
        port=80
    )