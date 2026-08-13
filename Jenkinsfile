pipeline {
    agent any

    stages {

        stage('Build') {
            steps {
                echo 'Building Docker images...'
                sh '''
                    docker compose build
                '''
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                sh '''
                    docker compose down || true
                    docker compose up -d
                '''
            }
        }

        stage('Verify') {
            steps {
                echo 'Verifying deployment...'
                sh '''
                    docker compose ps

                    echo "Testing backend..."
                    curl -f http://127.0.0.1:5000/ || exit 1

                    echo "Testing frontend..."
                    curl -f http://127.0.0.1/ || exit 1
                '''
            }
        }
    }

    post {
        success {
            echo '========================================'
            echo 'DEPLOYMENT SUCCESSFUL'
            echo '========================================'
        }

        failure {
            echo '========================================'
            echo 'DEPLOYMENT FAILED'
            echo '========================================'
        }
    }
}