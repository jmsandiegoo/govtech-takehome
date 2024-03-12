# GiftTrackerPro 
(Govtech Takehome Assignment)
Welcome to GiftTrackerPro, your ultimate solution for managing holiday gift redemptions within your organization!
![thubmnail](https://i.imgur.com/YkhA6nT.png)
## Database Setup
GiftTrackerPro uses PostgreSQL for storing gift redemption data. Follow these steps to set up the database:

1. Pull, create and run the postgres container through Docker:
`docker run --name govtech-pg-container -e POSTGRES_PASSWORD=govtechrocks -p 5433:5432 postgres`
This command will create a PostgreSQL container named govtech-pg-container with the password govtechrocks. The container will be accessible on port 5433 in your localhost.

2.  Connect to the Database: Once the container is running, you can connect to the PostgreSQL database using the tool of your choice (e.g. psql). Here are the connection details:
```
Server: localhost
Database: postgres
Port: 5433
Username: postgres
Password: govtechrocks
```
3. Execute Schema: After connecting to the PostgreSQL database, execute the schema provided in `src/database/schema.sql`. This schema defines the structure of the database tables required for GiftTrackerPro. *Assumption: the csv file records such as teams and staffs are assumed to be already inserted in the database hence the need to run the schema with sample data.

Nice! Your database is now set up and ready to be used with GiftTrackerPro.

## Project Setup
1. Clone the repository
2. Create .env file in the project root directory
```
DATABASE_NAME=postgres
USERNAME=postgres
PASSWORD=govtechrocks
HOST=localhost
PORT=5433
DATABASE_URL=postgres://postgres:govtechrocks@localhost:5433/postgres
```
3. Install Dependencies: `npm install`
4. Generate Schema Types: `npx kysely-codegen`
5. Build the project: `npm run build`
6. Run the project: `npx govtech-takehome`
7. Test the project: `npm run test`

## Commands
`lookup-staff <staffPassId>`: Look up the database for staff with the particular staff pass ID.
`verify-team-redemption <teamName>`: Check if the team has already/haven't redeemed the gift.
`redeem-gift <teamName>`: Redeem the gift for that particular team and add a new redemption record in the database.
