# Tempo in Production

This chart defaults to storing traces inside a PVC on a single replica, but support for objectStorage comes via Big Bang so that traces and information can be stored in external object storage and utilize multiple replicas if needed.

## Basic S3 Compatible Object Storage Configuration
This example will first go over using AWS as your external object storage endpoint, then something S3 API Compatible like an in-cluster Minio installation.
Please note that Grafana Tempo is not able to successfully utilize an attached IAM Role/Profile so Credentials will need to be specified. BigBang templating has been added to inject these as secrets instead of via a ConfigMap.

### AWS S3
```yaml
tempo:

  objectStorage:
    # -- S3 compatible endpoint to use for connection information.
    # examples: "s3.amazonaws.com" "s3.us-gov-west-1.amazonaws.com" "minio.minio.svc.cluster.local:9000"
    # Note: tempo does not require protocol prefix for URL.
    endpoint: "s3.us-gov-west-1.amazonaws.com"

    # -- S3 compatible region to use for connection information.
    region: "us-gov-west-1"

    # -- Access key for connecting to object storage endpoint.
    accessKey: "XXXXXXXXXXXXXXX"

    # -- Secret key for connecting to object storage endpoint.
    # Unencoded string data. This should be placed in the secret values and then encrypted
    accessSecret: "XXXXXXXXXXXXXXXXXXXXXXXXX"

    # -- Bucket Name for Tempo.
    # examples: "tempo-traces"
    bucket: "bucket1"
```

### S3 Compatible API
```yaml
tempo:

  objectStorage:
    # -- S3 compatible endpoint to use for connection information.
    # examples: "s3.amazonaws.com" "s3.us-gov-west-1.amazonaws.com" "minio.minio.svc.cluster.local:9000"
    # Note: tempo does not require protocol prefix for URL.
    endpoint: "minio.minio.svc:80"

    # -- S3 compatible region to use for connection information.
    region: ""

    # -- Access key for connecting to object storage endpoint.
    accessKey: "minio-user"

    # -- Secret key for connecting to object storage endpoint.
    # Unencoded string data. This should be placed in the secret values and then encrypted
    accessSecret: "minio-password"

    # -- Bucket Name for Tempo.
    # examples: "tempo-traces"
    bucket: "bucket1"

    insecure: true
```
