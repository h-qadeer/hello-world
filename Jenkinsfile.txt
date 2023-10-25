pipeline {
    agent any
    triggers {
        pollSCM '* * * * *'
    }
    stages {
        stage('Build') {
            steps {
                echo "Building.."
                sh '''
                cd hello-world-BE
                npm install
                cd ../hello-world-FE
                npm install
                '''
            }
        }
        stage('Test') {
            steps {
                echo "Testing.."
                script {
                    // Start backend application
                    def backendProc = sh(script: 'cd hello-world-BE && npm start', returnStatus: true)
                    
                    // Start frontend application
                    def frontendProc = sh(script: 'cd hello-world-FE && npm start', returnStatus: true)
                    
                    if (backendProc == 0 && frontendProc == 0) {
                        echo "Backend and frontend applications are running."

                        // Print URLs for accessing the applications
                        echo "Access the backend at: http://localhost:4000"
                        echo "Access the frontend at: http://localhost:3000"
                    } else {
                        error "Failed to start applications."
                    }
                }
            }
        }
        stage('Deliver') {
            steps {
                echo 'Deliver....'
                sh '''
                '''
            }
        }
    }
}
