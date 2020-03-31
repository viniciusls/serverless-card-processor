# serverless-card-processor
An simple and fictitious card processor for Serverless studying

## Summary
- NodeJS v12.16.1;
- Mocha/Chai/Sinon/Nyc for Unit tests (see /tests);
- Jenkins with Docker for Continuos Integration/Continuous Delivery (see Jenkinsfile);
- Serverless for deployment on IBM Cloud (see serverless.yml);
- IBM Cloud Functions with OpenWhisky as serverless runtime;
- Swagger as API doc (see swagger.yml);

## How to run CI/CD using Jenkins with Docker
- Install Docker and enable the daemon;
- Run `docker run -p 8080:8080 -p 50000:50000 --name jenkins_serverless -d jenkins/jenkins:lts` to download, install and start the container on `http://localhost:8080`;
- Follow the setup wizard until the end;
- (Optional) Install Blue Ocean plugins on **Manage Jenkins** -> **Manage Plugins** -> **Available** -> **Blue Ocean**;
- Create a new Pipeline based on **Jenkinsfile** and **GitHub** project;
- Add your **AUTH** config and **API_KEY** config from IBM Cloud;
- You're ready to go.

## How to run unit tests
Simple execute `npm run test` on any terminal and it'll show a detailed report at the end.

## How to check API documentation
You can check it out by accessing [https://viniciusls.github.io/serverless-card-processor](https://viniciusls.github.io/serverless-card-processor). If wanna install it on a fork, you should enable GitHub Pages pointing to `master` branch.

## Deployed example
You can access the deployed example on IBM Cloud clicking [here](https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/8a6b729197f11086526138475ed32f92928710e6a224fb547a0522e17cfaac5c/process?cardNumber=1234567890123456&cardOwner=Vinicius%20Silva&cardExpiration=02/2028&cardCvc=123).
