// import dotenv from "dotenv"; 
// import inquirer from "inquirer";
// import db from "./Database/connection.js";
// import "console.table"
// import express from "express";
// import mysql from "mysql2";
// import db from "./Database/connection.js";
const db = require('./Database/connection')
const inquirer = require ('inquirer')

// import choices from "inquirer";
async function initialQuestions() {
   const answers = await inquirer
    .prompt({
      type: "list",

      name: "department",
      message: "what would you like to do?",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add a department",
        "add a role",
        "add an employee",
        "update an employee role",
      ]})

    console.log(answers)
//       .then((answers)=> {
//         console.log(answers);
//         if (answers.department === "view all departments"){
//           db.query("SELECT * FROM departments",(data)=>{
//             console.table(data)
//           })
//         }
//         // var department = ""
//         // if(answers.department == "Architecture", "Engineering", "Finace", "HR"){
//         //   department = "[]"
       
//       }
//     ).catch((error) => {
//       console.log("error") 
//     });
}

initialQuestions()
