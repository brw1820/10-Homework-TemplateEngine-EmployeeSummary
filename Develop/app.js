const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function promptUser() {
    return inquirer.prompt([
      {
        type: "list",
        name: "role",
        message: "What is the role of your team member?",
        choices: ["Intern", "Engineer", "Manager"]
      }]).then(function(choice) {
          switch (choice.role)  {
            case "Manager":
                newManager();
                break;
            case "Intern":
                newIntern()
                break;
            case "Engineer":
                 newEngineer();
                break;

          }
        });
      }
      function newEngineer(){
          return inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is your team member's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is your team member's ID number?",
      },
      {
        type: "input",
        name: "email",
        message: "What is your team member's E-Mail address?",
      },
      
      {
        type: "input",
        name: "github",
        message: "Enter your team member's GitHub Username",
      },
    ]).then(function (choice) {
      const addEngineer = new Engineer (choice.name, choice.id, choice.email, choice.github);
      employees.push(addEngineer);
      addMember();
    })
  }
  function newManager(){
    return inquirer.prompt([
{
  type: "input",
  name: "name",
  message: "What is your team member's name?",
},
{
  type: "input",
  name: "id",
  message: "What is your team member's ID number?",
},
{
  type: "input",
  name: "email",
  message: "What is your team member's E-Mail address?",
},
{
  type: "input",
  name: "officenumber",
  message: "What is your office number?",
},
]).then(function (choice) {
const addManager = new Manager (choice.name, choice.id, choice.email, choice.officenumber);
employees.push(addManager);
addMember();
})
}
function newIntern(){
  return inquirer.prompt([
{
type: "input",
name: "name",
message: "What is your team member's name?",
},
{
type: "input",
name: "id",
message: "What is your team member's ID number?",
},
{
type: "input",
name: "email",
message: "What is your team member's E-Mail address?",
},

{
type: "input",
name: "school",
message: "Where did you attend school?",
},
]).then(function (choice) {
const addIntern = new Intern (choice.name, choice.id, choice.email, choice.school);
employees.push(addIntern);
addMember();
})
}
function addMember()  {
  return inquirer.prompt([
    {
      type: "list",
      name: "addMember",
      message: "Would you like to add another member to your team?",
      choices: ["yes", "no"]
    }
  ]).then (function(choice)  {
  if ("yes" === choice.addMember) {
    promptUser();
  } else  {
    const output = render(employees);
    fs.writeFileSync(outputPath, output, "utf-8", function (err) {
      console.log(err);
    })
  };
});
};
promptUser();
// no file directory
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
