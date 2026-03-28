pipeline {
    agent any
    
    stages {
        stage('Build'){
            agent{
                docker{
                    image 'node:24.14.0-alpine'
                    reuseNode true
                }
            }
            steps{
                sh'''
                    ls -la
                    node --version
                    npm --version
                    npm install
                    npm run build
                    ls -la
                '''
            }
        }
        stage('Test'){
            agent{
                docker{
                    image 'node:24.14.0-alpine'
                    reuseNode true
                }
            }
            steps{
                sh'''
                    test -f build/index.html
                    npm test
                '''
            }
        }
        stage("AWS") {
            agent {
                docker {
                    image 'amazon/aws-cli'
                    reuseNode true
                }
            }
            environment {
                AWS_DEFAULT_REGION = 'us-east-1'
            }
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'aws-s3ID', 
                        usernameVariable: 'AWS_ACCESS_KEY_ID', 
                        passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                    )
                ]) {
                    sh '''
                        echo "Testing AWS CLI"
                        aws --version
                        aws s3 ls
                        echo "Syncing build to S3"
                        aws s3 sync build/ s3://nesru-bucket --delete
                    '''
                }
            }
        }
    }
    post {
        always {
            echo "========always========"
        }
        success {
            echo "========AWS-S3 executed successfully ========"
        }
        failure {
            echo "========AWS-S3 execution failed========"
        }
    }
}