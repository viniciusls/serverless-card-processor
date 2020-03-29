pipeline {
  agent any
  environment {
    APIGW_ACCESS_TOKEN = credentials('APIGW_ACCESS_TOKEN')
    AUTH = credentials('AUTH')
    APIVERSION = 'v1'
    APIHOST = 'us-south.functions.cloud.ibm.com'
    OW_AUTH = credentials('AUTH')
    OW_APIHOST = 'us-south.functions.cloud.ibm.com'
    OW_APIGW_ACCESS_TOKEN = credentials('APIGW_ACCESS_TOKEN')
  }
  stages {
    stage('Build') {
      steps {
        nodejs('NodeJS 12.16.1') {
          sh 'npm install'
        }

      }
    }

    stage('Test') {
      steps {
        nodejs('NodeJS 12.16.1') {
          sh 'npm run test'
        }

      }
    }

    stage('Deploy') {
      steps {
        nodejs('NodeJS 12.16.1') {
          sh 'serverless'
        }

      }
    }

  }
}
