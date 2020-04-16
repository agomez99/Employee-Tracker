const inquirer = require("inquirer");
let Database = require("./db");
const logo = require('asciiart-logo');
const longText = 'An Employee Management System solution for managing a companys employees using node, inquirer, and MySQL.';
//Asciiart logo
console.log(
    logo({
        name: 'Employee Tracker',
        font: 'ANSI Shadow',
        lineChars: 10,
        padding: 1,
        margin: 1,
        borderColor: 'green',
        logoColor: 'bold-green',
        textColor: 'green',
    })
    .center(longText)
    .render()
);
//Database
const db = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "JadeG2009$",
    database: "employee_DB"

});
//Get Manager
async function getManagerNames() {
    let query = "SELECT * FROM employee WHERE manager_id IS NULL";
    const rows = await db.query(query);
    let employeeNames = [];
    for(const employee of rows) {
        employeeNames.push(employee.first_name + " " + employee.last_name);
    }
    return employeeNames;
}
//Get Roles
async function getRoles() {
    let query = "SELECT title FROM role";
    const rows = await db.query(query);
    let roles = [];
    for(const row of rows) {
        roles.push(row.title);
    }
    return roles;
}
//Get Department
async function getDepartmentNames() {
    let query = "SELECT name FROM department";
    const rows = await db.query(query);
    let departments = [];
    for(const row of rows) {
        departments.push(row.name);
    }
    return departments;
}
//Get Department id
async function getDepartmentId(departmentName) {
    let query = "SELECT * FROM department WHERE department.name=?";
    let args = [departmentName];
    const rows = await db.query(query, args);
    return rows[0].id;
}
//Get Role id
async function getRoleId(roleName) {
    let query = "SELECT * FROM role WHERE role.title=?";
    let args = [roleName];
    const rows = await db.query(query, args);
    return rows[0].id;
}
//Get employee id
async function getEmployeeId(fullName) {
    let employee = getFirstAndLastName(fullName);
    let query = 'SELECT id FROM employee WHERE employee.first_name=? AND employee.last_name=?';
    let args=[employee[0], employee[1]];
    const rows = await db.query(query, args);
    return rows[0].id;
}
//Get employee name
async function getEmployeeNames() {
    let query = "SELECT * FROM employee";
    const rows = await db.query(query);
    let employeeNames = [];
    for(const employee of rows) {
        employeeNames.push(employee.first_name + " " + employee.last_name);
    }
    return employeeNames;
}

//Tables
//View Roles
async function viewAllRoles() {
    console.log("");
    let query = "SELECT * FROM role";
    const rows = await db.query(query);
    console.log("\u001b[35mRoles\u001b[0m");
    console.table(rows);
    return rows;
}
//View Departments
async function viewAllDepartments() {
    let query = "SELECT * FROM department";
    const rows = await db.query(query);
    console.log("\u001b[35mDepartments\u001b[0m");
    console.table(rows);
}
//View Employees
async function viewAllEmployees() {
    console.log("");
    let query = "SELECT * FROM employee";
    const rows = await db.query(query);
    console.log("\u001b[35mEmployees\u001b[0m");
    console.table(rows);
}
//View Employees by Department
async function viewAllEmployeesByDepartment() {
    console.log("");
    let query = "SELECT first_name, last_name, department.name FROM ((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);";
    const rows = await db.query(query);
    console.log("\u001b[35mEmployees by department\u001b[0m");
    console.table(rows);
}
//View Employess by Manager
async function viewAllEmployeesByManager() {
    console.log("");
    let query = "SELECT * FROM employee";
    const rows = await db.query(query);
    console.log("\u001b[35mEmployees by manager\u001b[0m");
    console.table(rows,["first_name","last_name","manager_id"]);
}

//View all tables at once
async function viewAllTables() {
    console.log("");

    let query1 = "SELECT * FROM employee";
    const rows = await db.query(query1);
    console.log("Employees")
    console.table(rows,["first_name","last_name"])

    let query2 = "SELECT * FROM role";
    const rows2 = await db.query(query2);
    console.log("Roles")
    console.table(rows2,["title","salary"]);

    let query3 = "SELECT * FROM department";
    const rows3 = await db.query(query3);
    console.log("Departments")
    console.table(rows3);

    let query4 = "SELECT * FROM employee";
    const rows4 = await db.query(query4);
    console.log("Employee by Manger")
    console.table(rows4,["first_name","last_name","manager_id"]);
  
}



// Get first and last name
function getFirstAndLastName( fullName ) {
    let employee = fullName.split(" ");
    if(employee.length == 2) {
        return employee;
    }
    const last_name = employee[employee.length-1];
    let first_name = " ";
    for(let i=0; i<employee.length-1; i++) {
        first_name = first_name + employee[i] + " ";
    }
    return [first_name.trim(), last_name];
}
//Update employee role
async function updateEmployeeRole(employeeInfo) {
    const roleId = await getRoleId(employeeInfo.role);
    const employee = getFirstAndLastName(employeeInfo.employeeName);
    let query = 'UPDATE employee SET role_id=? WHERE employee.first_name=? AND employee.last_name=?';
    let args=[roleId, employee[0], employee[1]];
    const rows = await db.query(query, args);
    console.log(`\u001b[33mUpdated employee\u001b[0m\u001b[33m ${employee[0]} ${employee[1]} with role ${employeeInfo.role}\u001b[0m`);
}
//Add employee
async function addEmployee(employeeInfo) {
    let roleId = await getRoleId(employeeInfo.role);
    let managerId = await getEmployeeId(employeeInfo.manager);
    let query = "INSERT into employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
    let args = [employeeInfo.first_name, employeeInfo.last_name, roleId, managerId];
    const rows = await db.query(query, args);
    console.log(`\u001b[33mAdded employee\u001b[0m \u001b[35m${employeeInfo.first_name} ${employeeInfo.last_name}.\u001b[0m`);
}
//Delete employee
async function removeEmployee(employeeInfo) {
    const employeeName = getFirstAndLastName(employeeInfo.employeeName);
    let query = "DELETE from employee WHERE first_name=? AND last_name=?";
    let args = [employeeName[0], employeeName[1]];
    const rows = await db.query(query, args);
    console.log(`\u001b[33mEmployee removed:\u001b[0m \u001b[31m${employeeName[0]} ${employeeName[1]}\u001b[0m`);
}
//Add Department
async function addDepartment(departmentInfo) {
    const departmentName = departmentInfo.departmentName;
    let query = 'INSERT into department (name) VALUES (?)';
    let args = [departmentName];
    const rows = await db.query(query, args);
    console.log(`\u001b[33mAdded department named \u001b[0m \u001b[35m${departmentName}\u001b[0m`);
}
//Add Role
async function addRole(roleInfo) {
    const departmentId = await getDepartmentId(roleInfo.departmentName);
    const salary = roleInfo.salary;
    const title = roleInfo.roleName;
    let query = 'INSERT into role (title, salary, department_id) VALUES (?,?,?)';
    let args = [title, salary, departmentId];
    const rows = await db.query(query, args);
    console.log(`\u001b[33mAdded role\u001b[0m \u001b[35m${title}\u001b[0m`);
}



async function run() {
    return inquirer
        .prompt([
            {
                type: "list",
                message: "\u001b[32mWelcome the employee database, what would you like to do?\u001b[0m\n",
                name: "action",
                choices: [
                  "Add department",
                  "Add employee",
                  "Add role",
                  "Remove employee",
                  "Update employee role",
                  "View all departments",
                  "View all employees",
                  "View all employees by department",
                  "View all employees by manager",
                  "View all roles",
                  "View all tables",
                  "Exit"
                ]
            }
        ])
}

async function getAddEmployeeInfo() {
    const managers = await getManagerNames();
    const roles = await getRoles();
    return inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name?"
            },
            {
                type: "list",
                message: "What is the employee's role?",
                name: "role",
                choices: [...roles]
            },
            {
                type: "list",
                message: "Who is the employee's manager?",
                name: "manager",
                choices: [...managers]
            }
        ])
}

async function getRemoveEmployeeInfo() {
    const employees = await getEmployeeNames();
    return inquirer
    .prompt([
        {
            type: "list",
            message: "Which employee do you want to remove?",
            name: "employeeName",
            choices: [...employees]
        }
    ])
}

async function getDepartmentInfo() {
    return inquirer
    .prompt([
        {
            type: "input",
            message: "What is the name of the new department?",
            name: "departmentName"
        }
    ])
}

async function getRoleInfo() {
    const departments = await getDepartmentNames();
    return inquirer
    .prompt([
        {
            type: "input",
            message: "What is the title of the new role?",
            name: "roleName"
        },
        {
            type: "input",
            message: "What is the salary of the new role?",
            name: "salary"
        },
        {
            type: "list",
            message: "Which department uses this role?",
            name: "departmentName",
            choices: [...departments ]
        }
    ])
}

async function getUpdateEmployeeRoleInfo() {
    const employees = await getEmployeeNames();
    const roles = await getRoles();
    return inquirer
        .prompt([
            {
                type: "list",
                message: "Which employee do you want to update?",
                name: "employeeName",
                choices: [...employees]
            },
            {
                type: "list",
                message: "What is the employee's new role?",
                name: "role",
                choices: [ ...roles]
            }
        ])

}

async function start() {
    let exitLoop = false;
    while(!exitLoop) {
        const prompt = await run();

        switch(prompt.action) {
            case 'Add department': {
                const newDepartmentName = await getDepartmentInfo();
                await addDepartment(newDepartmentName);
                break;
            }
            case 'Add employee': {
                const newEmployee = await getAddEmployeeInfo();
                console.log("add an employee");
                console.log(newEmployee);
                await addEmployee(newEmployee);
                break;
            }
            case 'Add role': {
                const newRole = await getRoleInfo();
                console.log("add a role");
                await addRole(newRole);
                break;
            }
            case 'Remove employee': {
                const employee = await getRemoveEmployeeInfo();
                await removeEmployee(employee);
                break;
            }
            case 'Update employee role': {
                const employee = await getUpdateEmployeeRoleInfo();
                await updateEmployeeRole(employee);
                break;
            }
            case 'View all departments': {
                await viewAllDepartments();
                break;
            }
            case 'View all employees': {
                await viewAllEmployees();
                break;
            }
            case 'View all employees by department': {
                await viewAllEmployeesByDepartment();
                break;
            }
            case 'View all employees by manager': {
                await viewAllEmployeesByManager();
                break;
            }
            case 'View all roles': {
                await viewAllRoles();
                break;
            }
            case 'View all tables': {
                await viewAllTables();
                break;
            }
            case 'Exit': {
                exitLoop = true;
                console.log("\u001b[31mYou have exited program\u001b[0m");
                process.exit(0); 
                return;
            }
            default:
                console.log(`Internal warning. Shouldn't get here. action was ${prompt.action}`);
        }
    }
}

// Close your database db when Node exits
process.on("exit", async function(code) {
    await db.close();
    return console.log(`About to exit with code ${code}`);
});
start();