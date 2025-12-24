pipeline {
    agent any

    stages {

        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/project-123456/Mini-Project.git'
            }
        }

        stage('Pre-Cleanup Docker (IMPORTANT)') {
            steps {
                sh '''
                echo "Stopping old project containers if any..."
                docker ps -a --filter "name=mini-project" -q | xargs -r docker stop
                docker ps -a --filter "name=mini-project" -q | xargs -r docker rm

                echo "Removing unused networks..."
                docker network prune -f
                '''
            }
        }

        stage('Build Application') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Start Application') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        failure {
            echo "Pipeline failed — containers may not be running."
        }
        success {
            echo "Deployment successful 🚀"
        }
    }
}
