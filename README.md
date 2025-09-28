
# College BRANCH Management System
@Naveen kumar Naidu
------

Demo Videos:

ADMIN::
https://github.com/user-attachments/assets/5dc94bb3-4bd9-4886-8375-006014fddaa1

STUDENT::

https://github.com/user-attachments/assets/3e9bb5e1-cf85-455b-9164-f68f3bfc8e54

FACULTY::
MONGODB & FIREBASE
<img width="1785" height="954" alt="Screenshot 2025-06-24 231501" src="https://github.com/user-attachments/assets/a1e41dc6-14f1-4ccb-a606-79a885b475bb" />
<img width="1915" height="1029" alt="Screenshot 2025-06-24 231530" src="https://github.com/user-attachments/assets/6765cfba-4d3b-46ae-82e0-a9b040e5dc49" />

------


The College Management System is a MERN Stack-based system with three different login portals for students, faculty, and admin.

## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express

**Database:** MongoDB

## Student Features

- Internal Marks: Access to view internal marks for courses
- External Marks: Access to view external marks for courses
- Course Materials: Ability to download course materials
- Notices: Access to view notices
- Timetables: Access to view their own timetables
- Password Update: Ability for students to update their passwords

## Faculty Features

- Student Details: Ability for faculty to view student details
- Password Update: Ability for faculty to update their own passwords
- Notices: Ability for faculty to add notices
- Materials Upload: Ability for faculty to upload course materials
- Timetable Management: Ability for faculty to manage timetables
- Exam Mark Recording: Ability for faculty to record internal and external exam marks

## Admin Features

- Account Creation: Ability for admins to add new students, faculty, and admin accounts
- Account Details Modification: Ability for admins to modify the details of each account
- Subject Management: Ability for admins to add/edit subjects
- Notices Management: Ability for admins to add/edit notices
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

You also need to make Firebase Storage Rules to Public, paste the below given code and remove the default one from the Firebase Storage Rules.

```
rules_version = '2';

service firebase.storage { 
  match /b/(bucket}/o { 
    match /(allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

Backend And Frontend Both Folder Has One sample.env file you can replicate it add you data and rename it to .env

Add this document in your College Management Collection in MongoDB Compass in **admin details** table

```
{
  "employeeId": 123123,
  "firstName": "YOUR_DATA",
  "middleName": "YOUR_DATA",
  "lastName": "YOUR_DATA",
  "email": "test@admin.com",
  "phoneNumber": YOUR_DATA,
  "gender": "Male",
  "profile": "https://cdn.britannica.com/42/193142-050-F69B1A23/Sundar-Pichai-Google.jpg",
} 
```

Then add the below document without any changes in **Admin Credentials**

```
{
  "loginid": 123123,
  "password": "112233",
}
```

Now login into admin with Above mentioned login and password. You need to add branches and faculty from admin and then after adding faculty to faculty login and add student.


