pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        HOST = '0.0.0.0'
        DATABASE_CLIENT = 'postgres'
        DATABASE_PORT = '5432'
        DATABASE_SSL = 'true'
        AWS_REGION = 'af-south-1'
        ECR_REPOSITORY = 'edo-prototype-default' 
        AWS_ACCOUNT_ID = '879210190257'
        IMAGE_TAG = 'oneedocrm'
        EC2_HOST = '13.247.120.237'
        APP_PORT = '4000' 
        SSH_USER = 'ubuntu'
    }

    stages {
        stage('Build') {
            steps {
                script {
                    def appKeys = credentials('app-keys-oneedo-crm')
                    def apiTokenSalt = credentials('api-token-salt-oneedo-crm')
                    def adminJwtSecret = credentials('admin-jwt-secret-oneedo-crm')
                    def transferTokenSalt = credentials('transfer-token-salt-oneedo-crm')
                    def databaseHost = credentials('database-host-oneedo-crm')
                    def databaseUsername = credentials('database-username-oneedo-crm')
                    def databasePassword = credentials('database-password-oneedo-crm')

                    app = docker.build(
                        "${ECR_REPOSITORY}:${IMAGE_TAG}",
                        "--build-arg NODE_ENV=\"${NODE_ENV}\" " +
                        "--build-arg HOST=\"${HOST}\" " +
                        "--build-arg PORT=\"${APP_PORT}\" " +
                        "--build-arg APP_KEYS=\"${appKeys}\" " +
                        "--build-arg API_TOKEN_SALT=\"${apiTokenSalt}\" " +
                        "--build-arg ADMIN_JWT_SECRET=\"${adminJwtSecret}\" " +
                        "--build-arg TRANSFER_TOKEN_SALT=\"${transferTokenSalt}\" " +
                        "--build-arg DATABASE_CLIENT=\"${DATABASE_CLIENT}\" " +
                        "--build-arg DATABASE_HOST=\"${databaseHost}\" " +
                        "--build-arg DATABASE_PORT=\"${DATABASE_PORT}\" " +
                        "--build-arg DATABASE_USERNAME=\"${databaseUsername}\" " +
                        "--build-arg DATABASE_PASSWORD=\"${databasePassword}\" " +
                        "--build-arg DATABASE_SSL=\"${DATABASE_SSL}\" " +
                        "-f Dockerfile ."
                    )
                }
            }
        }

        stage('Deploy') {
            steps {
                script{
                    docker.withRegistry("https://${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com") {
                        app.push("${IMAGE_TAG}.${env.BUILD_NUMBER}")
                        app.push("${IMAGE_TAG}")
                    }
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(credentials: ['ssh-credentials-1']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${SSH_USER}@${EC2_HOST} << EOF
                            # Pull the latest image
                            docker pull ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:${IMAGE_TAG}

                            # Stop and remove any existing container
                            docker stop ${IMAGE_TAG} || true
                            docker rm ${IMAGE_TAG} || true

                            # Run the new container
                            docker run -d --name ${IMAGE_TAG} -p ${APP_PORT}:${APP_PORT} ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:${IMAGE_TAG}
                    """
                }
            }
        }
    }
}
