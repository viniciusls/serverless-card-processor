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
        sh 'serverless'
      }
    }

  }
}