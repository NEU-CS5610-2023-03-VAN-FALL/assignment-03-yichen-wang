# Create the main directory and enter it
mkdir movies-app && cd movies-app

# Create client-side application with React
npx create-react-app client

# Enter client directory, create directories for components and components
cd client/src
mkdir components pages
cd components
mkdir common home movie profile auth

# Go back to the main directory
cd ../../..

# Create server-side application
mkdir server && cd server
mkdir src && cd src
mkdir controllers models routes utils

# Go back to the server directory
cd ..

# Initialize Node.js and install necessary packages
npm init -y
npm install express cors helmet morgan prisma

# Initialize Prisma
npx prisma init

# Go back to the root directory
cd ..

# Create .gitignore and README files
touch .gitignore README.md
