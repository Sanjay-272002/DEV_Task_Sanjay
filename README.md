
### DEV_Task_Sanjay

## Flight Booking Website

### Backend

I developed all the use cases asked in the problem statement and also integrated payment method in this webapp. You can check this [API Documentation](https://documenter.getpostman.com/view/26924543/2s93m1b5QZ)

#### Features
Two types users Admin and user
## User Features 
  - Login/Signup/Logout
  - can see list of files
  - can book flight by payment
  - can search flights 
  - booking is based on availability
  - can view user's booked history
 ## Admin Features
   - Add/View/Remove flights 
   - Can view all bookings 

### Frontend
In frontend I  integrated signin ,signup,logout,listing flights details,booking flights ,payments with backend .Usertype user dashboard alone integrated.

### Tech Stack

### Backend
- Django Rest framework and sqlite DB

### Frontend
React

### Backend setup
- cd backend
- Installation : pip install -r requirements.txt To run files
- python manage.py makemigrations
- python manage.py migrate
- python manage.py runserver

### Frontend setup
- cd frontend
- npm i for installation
- To run do npm start
