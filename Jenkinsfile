pipeline {
    agent any

    tools {
        nodejs 'NodeJS-18'
    }

    environment {
        MONGO_URI = credentials('mongo-uri')
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'github-creds',
                    url: 'https://github.com/abhijithm34/task-management-system.git'
            }
        }

        stage('Install Backend') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Install Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'VITE_API_BASE_URL=http://57.158.99.228/api npm run build'
                }
            }
        }

        stage('Deploy via Ansible') {
            steps {
                sh '''
                    ansible-playbook -i ansible/inventory.ini \
                    ansible/playbook.yml \
                    --extra-vars "mongo_uri=${MONGO_URI}"
                '''
            }
        }
    }

    post {
        success { echo 'Deployment successful!' }
        failure { echo 'Pipeline failed. Check console output.' }
    }
}
