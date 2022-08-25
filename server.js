// import dotenv from "dotenv"; 
// import inquirer from "inquirer";
// import db from "./Database/connection.js";
// import "console.table"
// import express from "express";
// import mysql from "mysql2";
// import db from "./Database/connection.js";
const connection = require('./Database/connection')
const inquirer = require ('inquirer')
require("console.table");

// let isPending = true;
// Promise.resolve(1)
//   .then(() => { isPending = false; });
// import choices from "inquirer";
function initialQuestions() {
   const answers = inquirer
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
      .then((res)=> {
        console.log(res.department);
        switch(res.department){
          case 'view all departments':
            viewalldepartments();
            break;
          case 'view all roles':
            viewallroles();
            break;
          case 'view all employees':
            viewallemployees();
            break;
          case 'add a department':
            addadepartment();
            break;
          case 'add a role':
            addarole();
            break;
          case 'add an employee':
            addanemployee();
            break;
          case 'update an employee role':
            updateanemployeerole();
            break;
          }
        // if (answers.department === "view all departments"){
        //   db.query("SELECT * FROM department",(data)=>{
        //     console.table(data)
        //   })
        // }   
   }
   ).catch((error) => {
      console.log(error) 
    });
}
function viewalldepartments() {
  let query = 
  `SELECT 
      employee.id, 
      employee.first_name, 
      employee.last_name, 
      role.title, 
      department.name AS department, 
      role.salary, 
      CONCAT(manager.first_name, ' ', manager.last_name) AS manager
  FROM employee
  LEFT JOIN role
      ON employee.role_id = role.id
  LEFT JOIN department
      ON department.id = role.department_id
  LEFT JOIN employee manager
      ON manager.id = employee.manager_id`

  connection.query(query, (err, res)=>{
    if (err) throw err;
    console.table(res);
    initialQuestions();
  });
}
function viewallroles(){
  let query =
  `SELECT 
      department.id,department.name,role.salary
  FROM employee
  LEFT JOIN role 
      ON employee.role_id = role.id
  LEFT JOIN department
      ON department.id = role.department_id
  GROUP BY department.id, department.name, role.salary`;

connection.query(query,(err, res)=>{
    if (err) throw err;
    const deptChoices = res.map((choices) => ({
        value: choices.id, name: choices.name
    }));
  console.table(res);
  addadepartment(deptChoices);
});
}
function viewallemployees(){
  let query =
  `SELECT 
      department.id,department.name,role.salary
  FROM employee
  LEFT JOIN role 
      ON employee.role_id = role.id
  LEFT JOIN department
      ON department.id = role.department_id
  GROUP BY department.id, department.name, role.salary`;

connection.query(query,(err, res)=>{
    if (err) throw err;
    const deptChoices = res.map((choices) => ({
        value: choices.id, name: choices.name
    }));
  console.table(res);
  addadepartment(deptChoices);
});
}

function addadepartment(deptChoices){
  inquirer
      .prompt([
          {
              type: 'list',
              name: 'department',
              message: 'Departments: ',
              choices: deptChoices
          }
      ])
      .then((res)=>{ 
      let query = `SELECT 
                      employee.id,employee.first_name,employee.last_name,role.title,department.name
                  FROM employee
                  JOIN role
                      ON employee.role_id = role.id
                  JOIN department
                      ON department.id = role.department_id
                  WHERE department.id = ?`

      connection.query(query, res.department,(err, res)=>{
      if(err)throw err;
      initialQuestions();
        console.table(res);
      });
  })
}
function addarole (role) {
  inquirer
    .prompt([
    {
      type: "input",
      name: "first_name",
      message: "Employee First Name: "
    },
    {
      type: "input",
      name: "last_name",
      message: "Employee Last Name: "
    },
    {
      type: "list",
      name: "role_id",
      message: "Employee Role: ",
      choices: role
    }
  ]).then((res)=>{
      let query = `INSERT INTO employee SET ?`
      connection.query(query,{
        first_name: res.firstName,
        last_name: res.lastName,
        role_id: res.roleId
      },(err, res)=>{
        if(err) throw err;
        initialQuestions();
    });
  });
}
function addanemployee() {
  let query = 
  `SELECT role.id,role.title,role.salary 
  FROM role`
connection.query(query,(err, res)=>{
  if(err)throw err;
  const role = res.map(({ id, title, salary }) => ({
    value: id, 
    title: `${title}`, 
    salary: `${salary}`
  }));

  console.table(res);
  employeeRoles(role);
});
}
initialQuestions();
