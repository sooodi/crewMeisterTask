This project was bootstrapped with create-react-app.

front_url:http://localhost:3000
Apis:http://localhost:3000

Path of apis --> "apicrewmeister" : for run this one please type:
cd apicrewmeister then run "npm run start"

Path of Front --> main root "taskcrewmeister" then run "npm run start"

I have created two branchs ,one of them without api but another one with api.

On "main" branch : I used members.json & absenses.json file .

On "front_api" branch :I created Apis with mongodb & node js "path:apicrewmeister", we have for apis for members & absences and fill them with same as sample data from json file ,except createAt & id to tables:

Backend Api:
\*\*\* paginagtion is included

--> get : localhost:8000/api/members

--> post :localhost:8000/api/members , ex: body:{
"crewId": 352,
"id": 9364,
"image": "https://loremflickr.com/300/400",
"name": "Marlene",
"userId": 4
}
--> get : localhost:8000/api/absences?limit=5&page=2&userId=2664&type=vacation&startDate=2021-06-30&endDate=2021-07-30

--> post :localhost:8000/api/absences ,id was autocreated by mongodb ex: body:{
{ "admitterId": null,
"admitterNote": "",
"confirmedAt": null,
"createdAt": "2021-06-30T02:13:56.000+02:00",
"crewId": 352,
"endDate": "2021-08-12",
"memberNote": "Pfadfindersommerlager",
"rejectedAt": null,
"startDate": "2021-08-05",
"type": "vacation",
"userId": 2735
}

}

front App:
front App has features below:

\_Mostly Tailwindcss ,some Styled component
\_typescript
\_redux & redux toolkit
\_axios for fetch data
\_two hook ,for fetch datas
\_filter with the query :Type & Name of user & date between startDate & endDate.
\_clean code & seprated every components
\_create ics file for every row
