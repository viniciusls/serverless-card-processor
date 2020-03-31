pipeline {
  agent any
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
          sh '''ACCESS_TOKEN=$(curl -k -X POST \\
--header "Content-Type: application/x-www-form-urlencoded" \\
--header "Accept: application/json" \\
--data-urlencode "grant_type=urn:ibm:params:oauth:grant-type:apikey" \\
--data-urlencode "apikey=$API_KEY" \\
"https://iam.cloud.ibm.com/identity/token" | node -e "const fs = require(\'fs\'); console.log(JSON.parse(fs.readFileSync(0, \'utf-8\')).access_token)")

export APIGW_ACCESS_TOKEN=$ACCESS_TOKEN
export OW_APIGW_ACCESS_TOKEN=$ACCESS_TOKEN

serverless deploy'''
        }

      }
    }

  }
  environment {
    APIGW_ACCESS_TOKEN = ''
    AUTH = credentials('AUTH')
    APIVERSION = 'v1'
    APIHOST = 'us-south.functions.cloud.ibm.com'
    OW_AUTH = credentials('AUTH')
    OW_APIHOST = 'us-south.functions.cloud.ibm.com'
    OW_APIGW_ACCESS_TOKEN = ''
    API_KEY = credentials('API_KEY')
  }
}