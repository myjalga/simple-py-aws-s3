#!/usr/bin/env python

import os
import boto
from boto.s3.connection import Location
from boto.s3.key import Key
import time
import shutil

# Replace these if you want to use the AWS S3 Service
accessKeyId = 'ACCESS_KEY'
secretAccessKey = 'SECRET_ACCESS_KEY'
awsHost = 'localhost'

_conn = boto.connect_s3(
    aws_access_key_id = accessKeyId,
    aws_secret_access_key = secretAccessKey,
    host = awsHost,
    is_secure = False, # uncomment if secure or set to True
    calling_format = boto.s3.connection.OrdinaryCallingFormat()
)

_dir = os.path.dirname(os.path.abspath(__file__)) + '/public/files'

_active = True
if accessKeyId == 'ACCESS_KEY':
    _active = False

# Create a bucket in S3
def createBucket(name):
    if _active:
        # Do something here for AWS S3 to create bucket
        _conn.create_bucket(name)
    else:
        # Use local files to create a folder
        directory = _dir + '/' + name
        if not os.path.exists(directory):
            os.makedirs(directory)
    return True

# Delete a bucket in S3
def deleteBucket(name):
    if _active:
        # Do something here to delete a bucket in AWS S3
        _conn.delete_bucket(name)
    else:
        # Do something here to delete a local folder
        directory = _dir + '/' + name
        if os.path.exists(directory):
            shutil.rmtree(directory)
    return {'success': True}

# Process rename bucket
def procRenameBucket(prev, curr):
    content = []
    bucket = _conn.get_bucket(prev)
    k = Key(bucket)
    for key in bucket.list():
        k = bucket.get_key(key.name)
        k.get_contents_to_filename(_dir + '/' + prev + '/' + filename)
        content.append({'file': filename, 'path': _dir + '/' + prev + '/' + filename})
    
    # Delete the bucket
    _conn.delete_bucket(prev)

    # create a new bucket
    _conn.create_bucket(curr)
    currBucket = _conn.get_bucket(curr)
    for f in content:
        file = open(f.path, '+r')
        k = Key(currBucket)
        k.key = f.file
        sent = k.set_contents_from_filename(k.file)
    return True

# Rename a bucket
def renameBucket(prevName, currName):
    if _active:
        # Do something here to Rename bucket in AWS S3
        directory = _dir + '/' + prevName
        if not os.path.exists(directory):
            os.makedirs(directory)

        procRenameBucket(prevName, currName)
    else:
        # Rename folder
        prev = _dir + '/' + prevName
        curr = _dir + '/' + currName
        if os.path.exists(prev):
            os.rename(prev, curr)
    return {'success': True}

# Get list of buckets
def getBuckets():
    buckets = []
    if _active:
        # Do something here to get list of buckets
        print "List of buckets"
        for bucket in _conn.get_all_buckets():
            buckets.append({
                "bucket": bucket.name
            })
    else:
        dirs = os.listdir(_dir)
        for file in dirs:
            buckets.append({"bucket": file})
    return buckets

# Get Bucket files
def getBucketContent(bucket):
    content = []
    if _active:
        # Do something here for AWS S3 to get the content of the bucket
        bucket = _conn.get_bucket(bucket)
        for key in bucket.list():
            content.append({'file': key.name})
    else:
        # Do something here to get list of files in a folder
        dirs = os.listdir(_dir + '/' + bucket)
        for file in dirs:
            content.append({'file': file})
    return content


# Upload file to a bucket
def uploadFileToBucket(bucketname, filename, path):
    if _active:
        # Do something here for AWS S3 to get the content of the bucket
        bucket = _conn.get_bucket(bucketname)
        file = open(path, 'r+')
        k = Key(bucket)
        k.key = filename
        sent = k.set_contents_from_filename(filename)
        return True

# Delete a file in a bucket
def deleteFile(bucketName, filename):
    if _active:
        # Do something here delete file in a bucket
        bucket = _conn.get_bucket(bucketName)
        k = Key(bucket)
        k.key = filename
        bucket.delete_key(k)
    else:
        directory = _dir + '/' + bucketName + '/' + filename
        os.remove(directory)
    return True

# Download the file
def downloadFile(bucketName, filename):
    if _active:
        bucket = _conn.get_bucket(bucketName)
        k = bucket.get_key(filename)
        k.get_contents_to_filename(_dir + '/' + bucketName + '/' + filename)
        return True
