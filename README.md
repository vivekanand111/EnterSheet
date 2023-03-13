Project Title: Employee Task Tracker

Description:

Employee Task Tracker is a web application built with React JS, Redux, MySQL, JWT auth, Spring Boot Data JPA, and Spring Security.\
The main purpose of this application is to track the daily tasks performed by employees.

Features:

Employees can log in to the application and fill in details of the tasks they have performed daily.\
The application allows employees to submit their weekly tasks for the project.\
The admin can access all the submitted tasks and check the records of all employees.\
The admin has the option to download the records of all employees in an excel format.\
The application ensures the security of the user's data using JWT authentication and Spring Security.

Technologies Used:

React JS\
Redux\
MySQL\
XLSX\
JWT auth\
Spring Boot Data JPA\
Spring Security

Installation:

Clone the repository.\
Install all the dependencies by running the command: npm install in directory.\
Run the frontend server by running the command: npm start in the frontend directory.

Get the backend from https://github.com/vivekanand111/EnterSheetBackend \
Create the database schema into your MySQL server.\
Change the database configuration in the backend/src/main/resources/application.yaml file.\
Run the backend server by running the command: ./gradlew bootrun in the backend directory.

Usage:

Open the web browser and go to http://localhost:5173/ to access the login page.\
Use the login credentials as an admin to log in to the application.\
Once you log in, you will be redirected to the admin dashboard.\
From the dashboard, you can view and download the records of all the employees.\
Employees can log in using their login credentials and enter the details of the tasks they have performed.

Contributing:\
Contributions are welcome. You can fork the repository, make changes, and create a pull request.

License:\
This project is licensed under the MIT License.