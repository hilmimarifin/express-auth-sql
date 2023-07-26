# express-auth-sql n checklist API
Starter template for authorization and authentication and checklist api

To Run this api:
1. Set up database
```json
1. create database
2. add database info to env file
```
2. Instal packages
```json
npm install
```
3. Migration
```json
npx sequelize-cli db:migrate
```
4. Seeding for initial data (Role user)
```json
npx sequelize-cli db:seed:all
```
5. Run the project
```json
npm run dev
```
