pipeline {
    agent any

    environment {
        GIT_REPO_URL = 'https://github.com/votre-utilisateur/votre-repo.git'
        DOCKER_IMAGE_NAME = 'votre-utilisateur/votre-image'
    }

    stages {
        stage('build docker image') {
            steps {
                script {
                   docker build -t poll-project .
                }
            }
        }
    }
}