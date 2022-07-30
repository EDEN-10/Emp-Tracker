import dotenv from "dotenv"; 
import inquirer from "inquirer";
import express from "express";
import mysql from "mysql2"
// import db from "./Database/connection.js";
// Choices = require("inquirer/lib/objects/choices");


// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '12345',
//   database: 'employees'
// });

async function initialQuestions() {
    return await inquirer
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
      ]}).then((answers)=> {
        console.log(answers);
        var department = ""
        if(answers.department == "Architecture", "Engineering", "Finace", "HR"){
          department = "[]"
        }
      }
    ).catch((error) => {
      console.log("error") 
    });
}

initialQuestions()
