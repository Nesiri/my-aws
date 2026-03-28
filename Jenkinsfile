pipeline {
    agent any
    
    stages {
        stage("AWS") {
            agent {
                docker {
                    image 'amazon/aws-cli'
                    reuseNode true
                    args '--entrypoint=""'
                }
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
                        # export the credentials for the Docker container
                        export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
                        export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
                        export AWS_DEFAULT_REGION=us-east-1
                        
                        # test AWS CLI
                        aws --version
                        aws s3 ls
                        
                        # upload a test file
                        echo "Hello S3" > index.html
                        aws s3 cp index.html s3://nesru-bucket/index.html
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