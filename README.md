# NPA - Cloud Storage
Cloud storage (node.js + AWS S3)

### Setup commands for linux
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
