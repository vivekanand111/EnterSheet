Project Title: Employee Task Tracker

Description:

Employee Task Tracker is a web application built with React JS, Redux, MySQL, JWT auth, Spring Boot Data JPA, and Spring Security.\n The main purpose of this application is to track the daily tasks performed by employees.

Features:

Employees can log in to the application and fill in details of the tasks they have performed daily.\n
The application allows employees to submit their weekly tasks for the project.\n
The admin can access all the submitted tasks and check the records of all employees.\n
The admin has the option to download the records of all employees in an excel format.\n
The application ensures the security of the user's data using JWT authentication and Spring Security.\n

Technologies Used:

React JS\n
Redux\n
MySQL\n
XLSX\n
JWT auth\n
Spring Boot Data JPA\n
Spring Security\n

Installation:

Clone the repository.\n
Install all the dependencies by running the command: npm install in directory.\n
Run the frontend server by running the command: npm start in the frontend directory.\n

Get the backend from https://github.com/vivekanand111/EnterSheetBackend\n
Create the database schema into your MySQL server.\n
Change the database configuration in the backend/src/main/resources/application.yaml file.\n
Run the backend server by running the command: ./gradlew bootrun in the backend directory.\n

Usage:

Open the web browser and go to http://localhost:5173/ to access the login page.\n
Use the login credentials as an admin to log in to the application.\n
Once you log in, you will be redirected to the admin dashboard.\n
From the dashboard, you can view and download the records of all the employees.\n
Employees can log in using their login credentials and enter the details of the tasks they have performed.\n

Contributing:

Contributions are welcome. You can fork the repository, make changes, and create a pull request.\n

License:

This project is licensed under the MIT License.