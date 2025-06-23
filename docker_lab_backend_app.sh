# --- BACKEND APPLICATION ---

# Step-1: Build an image for the backend server application
docker build -f backend/Dockerfile -t sohan/server backend/

# Step-2: Build a container from the server application image
docker container create -p 4000:4000 \
    -e DB_SEED_SOURCE_URL="https://6b2d9484-51c3-4489-ad78-26ea2851231f.mock.pstmn.io/api/celebrities" \
    -e SERVER_PORT=4000 \
    -e MONGO_DB_URI="mongodb://mongodb:27017/voteApp" \
    --network server_db --restart=always \
    --name voting-server sohan/server

# Step-3: Create a custom network conection for server application & client application
docker network create client_server

# Step-4: Connect the server application container with the client using the custom network
docker network connect client_server voting-server

# Step-5: Run voting-server container
docker start voting-server
