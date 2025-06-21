# STEPS TO AUTOMATE THE CONTENARIZATION OF CELEBRITY VOTING APP.

# --- FRONTEND APPLICATION ---

# Step-1: Set REACT_APP_SERVER_URL environment variable to communicate with server.
read -p 'Enter Server URL for React App: ' REACT_APP_SERVER_URL

# Step-2: Build an image for the fronten client application
docker build -f frontend/Dockerfile -t sohan/client frontend/

# Step-3: Build a container from the client application image
docker container create -e REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL -p 3000:80 --network client_server --name voting-app sohan/client

# Step-4: Run voting-server container
docker start voting-app

# Step-5: Seed MongDB database (Only required once post deployment)
echo "Seed DB by running command: curl '<SERVER_ENDPOINT>/seed'"
