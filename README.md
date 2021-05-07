# NPA - Cloud Storage
Cloud storage (node.js + AWS S3)

### Setup commands for AWS EC2
```
curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
sudo yum install -y nodejs
sudo yum install -y git
git clone https://github.com/CokeFung/NPA-CloudStorage.git
cd NPA-CloudStorage
npm install -f
```

### Create `.env` file in project's root directory (like `{path}/NPA-CloudStorage/.env`)
```
REACT_APP_AWS_ACCESS_KEY_ID=xxx
REACT_APP_AWS_SECRET_ACCESS_KEY=xxx
REACT_APP_S3_REGION=us-east-1
REACT_APP_S3_BUCKET=npa-storage-1
```


# S3's permission (Do not use this policy for REAL production)
### Bucket policy (allow anonymous user to read)
```
{
  "Version":"2012-10-17",
  "Statement":[
    {
      "Sid":"PublicRead",
      "Effect":"Allow",
      "Principal": "*",
      "Action":["s3:GetObject","s3:GetObjectVersion"],
      "Resource":["arn:aws:s3:::<bucket name>/*"]
    }
  ]
}
```

### Cross-origin resource sharing (CORS)
```
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "POST",
            "DELETE",
            "GET"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]
```
