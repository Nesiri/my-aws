pipeline{
    agent any
    
    stages{
        stage("AWS"){
             agent{
                docker{
                    image 'amazon/aws-cli'
                    reuseNode true
                    args '--entrypoint=""'
                }
            }
            steps{
                withCredentials([usernamePassword(credentialsId: 'aws-s3ID', passwordVariable: 'AWS_SECRET_ACCESS_KE', usernameVariable: 'AWS_ACCESS_KEY_ID')]) {
  
}
                sh '''
               aws --version
                aws s3 ls
                echo "Hello S3">index.html
                aws s3 cp index.html s3://nesru-bucket/index.html
                   '''
            }
           
        }
    }
    post{
        always{
            echo "========always========"
        }
        success{
            echo "========AWS-S3 executed successfully ========"
        }
        failure{
            echo "========AWS-S3 execution failed========"
        }
    }
}