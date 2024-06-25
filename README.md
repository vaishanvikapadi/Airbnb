**AirBnB Website**

An online marketplace for short- and long-term homestays and experiences. 
This project solves the real-time problem of tourist accommodations. 
I built this website using Node.js, EJS, CSS, JavaScript, Bootstrap, and MongoDB.
# WanderLust - Airbnb Clone

WanderLust is a web application that mimics the core functionalities of Airbnb. It allows users to create, view, edit, and delete rental listings. Users can also upload images for the listings and manage them efficiently.

## Live Demo
Check out the live demo of the project: [WanderLust](https://airbnb-2dsh.onrender.com/listings)

## Features
- User Authentication
  - Sign Up
  - Log In
  - Log Out
- Listings Management
  - Create new listings with title, description, price, location, and image
  - View all listings
  - Edit existing listings
  - Delete listings
- Image Upload
  - Upload and update images for listings

## Technologies Used
- **Frontend:**
  - HTML
  - CSS
  - JavaScript
- **Backend:**
  - Node.js
  - Express.js
- **Database:**
  - MongoDB
- **Others:**
  - Multer for image uploads
  - Passport.js for authentication
  - EJS for templating

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vaishanvikapadi/Airbnb.git
   cd Airbnb


2.Install dependencies:

```bash
   Copy code
   npm install


3.Set up environment variables:

Create a .env file in the root directory.
Add the following variables:

Copy code
DATABASE_URL=<Your MongoDB Connection String>
CLOUDINARY_CLOUD_NAME=<Your Cloudinary Cloud Name>
CLOUDINARY_KEY=<Your Cloudinary Key>
CLOUDINARY_SECRET=<Your Cloudinary Secret>
SECRET=<Your Secret Key>


4.Run the application:

```bash
  Copy code
  node index.js

5.Visit the application in your browser at http://localhost:8080/listing.

Usage
Sign up for an account or log in if you already have one.
Create a new listing by providing the necessary details and uploading an image.
View all listings on the listings page.
Edit or delete your listings as needed.
