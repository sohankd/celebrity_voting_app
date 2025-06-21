# STEPS TO AUTOMATE THE CONTENARIZATION OF CELEBRITY VOTING APP.

# --- BACKEND APPLICATION ---

# Step-1: Build an image for the backend server application
docker build -f backend/Dockerfile -t sohan/server backend/

# Step-2: Build a container from the server application image
docker container create -p 4000:4000 --network server_db --name voting-server sohan/server

# Step-3: Create a custom network conection for server application & client application
docker network create client_server

# Step-4: Connect the server application container with the client using the custom network
docker network connect client_server voting-server

# Step-5: Run voting-server container
docker start voting-server

# --- FRONTEND APPLICATION ---

# Step-6: Build an image for the fronten client application
docker build -f frontend/Dockerfile -t sohan/client frontend/

# Step-7: Build a container from the client application image
docker container create -p 3000:80 --network client_server --name voting-app sohan/client

# Step-8: Run voting-server container
docker start voting-app

# Step-9: Seed MongDB database (Only required once post deployment)
echo "Seed DB by running command: curl '<SERVER_ENDPOINT>/seed'"
