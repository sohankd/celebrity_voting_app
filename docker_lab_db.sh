# STEPS TO AUTOMATE THE CONTENARIZATION OF CELEBRITY VOTING APP.

# Step-1: clone the repo
git clone https://github.com/sohankd/celebrity_voting_app.git

# --- DATABASE SETUP ---

# Step-2: Create a custom network conection for server application & MongoDB
docker network create server_db

# Step-3: Build a container for MongoDB
docker container create -p 27017:27017 --network server_db --name mongodb mongo --replSet rs0

#Step-4: Run mongodb container
docker start mongodb

# Step-5: Once the DB is up and running, connect to the container
echo "---- Run command 'docker exec -it mongodb mongosh' ----"

# Step-6: Run Mongo DB replica initiation command
echo "---- Run command 'rs.initiate()' ----"

# Step-7: Exit Mongo DB container
echo "---- Run command 'exit' ----"
