var colors = [
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ff3333",
  "#ffff00",
  "#ff6600",
  "#ee82ee",
  "#ffa500",
  "#3cb371",
  "#686868",
];
var employeedata = [
  {
    employeeid: "1001",
    prefferedname: "Anthony Morris",
    title: "SharePoint Practice Head ",
    department: "IT Department",
  },
  {
    employeeid: "1002",
    prefferedname: "Helen Zimmerman",
    title: "Operations Manager ",
    department: "IT Department",
  },
  {
    employeeid: "1003",
    prefferedname: "Jonathon Smith",
    title: "Product Manager",
    department: "IT Department",
  },
  {
    employeeid: "1004",
    prefferedname: "Tamo Hopkins",
    title: "Lead Engineer-Dot Net",
    department: "IT Department",
  },
  {
    employeeid: "1005",
    prefferedname: "Franklin Humark",
    title: "Network Engineer",
    department: "IT Department",
  },
  {
    employeeid: "1006",
    prefferedname: "Angela Bailey",
    title: "Talent Manager Jr",
    department: "HR Department",
  },
  {
    employeeid: "1007",
    prefferedname: "Robert Mitchell",
    title: "Software Engineer",
    department: "IT Department",
  },
  {
    employeeid: "1008",
    prefferedname: "Olivia Watson",
    title: "UI Designer ",
    department: "UX Desginer",
  },
];
var empid = 1008;
var employee_names = document.getElementsByClassName("employee_name");
var employee_departments = document.getElementsByClassName(
  "employee_department"
);
var employee_designation = document.getElementsByClassName(
  "employee_designation"
);
var parent = document.getElementById("parent");

//Buttons on the page
const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));
var buttongroup = document.getElementsByClassName("directory_buttongroup")[0];

for (i = 0; i < 26; i++) {
  newbutton = document.createElement("div");
  newbutton.className = "btn btn-primary btn-lg my-1 mx-1";
  newbutton.innerText = `${alphabet[i]}`;
  newbutton.value = `${alphabet[i]}`.toLowerCase();
  newbutton.addEventListener("click", function (event) {
    buttonfilter(event.target.value).call();
  });
  buttongroup.appendChild(newbutton);
}

// function to render employees on the main page
function rendering_employees() {
  for (let i = 0; i < employeedata.length; i++) {
    var random_color = colors[Math.floor(Math.random() * colors.length)];
    parent.innerHTML += `<div class="directory_employee_card" onclick="popup(event)" id="${
      employeedata[i].employeeid
    }">
     <div class='employee_photo' style="background-color:${random_color};">${employeedata[
      i
    ].prefferedname.slice(0, 2)}</div>
    <div class='employee_info' id="${employeedata[i].employeeid}">
    <div class='employee_name'>${employeedata[i].prefferedname}</div>
    <div class='employee_designation'>${employeedata[i].title}</div>
    <div class='employee_department'>${employeedata[i].department}</div>
    <div class='employee_socialmedia_icons'></div>
    </div>
    </div>`;
  }
  console.table(employeedata);
}

// funtion to empty the directory and update it
function emptythedirectory() {
  parent.innerHTML = "";
}

function displaychanges(target, appliedstyle) {
  target.parentElement.parentElement.style.display = appliedstyle;
}

function modalsubmit() {
  let firstname = document.getElementById("FirstName").value;
  let Lastname = document.getElementById("LastName").value;
  let prefferedname = document.getElementById("UserName").value;
  let email = document.getElementById("Email").value;
  let jobtitle = document.getElementById("JobTitle").value;
  let Office = document.getElementById("Office").value;
  let dept = document.getElementById("Dept").value;
  let phonenumber = document.getElementById("phonenumber").value;
  let skypeid = document.getElementById("Skypeid").value;

  if (prefferedname == "") {
    document.getElementById("UserName").style.border = "5px solid red";
    document
      .getElementById("UserName")
      .setAttribute("placeholder", " Name is  Mandatory");
    return;
  }
  if (jobtitle == "") {
    document.getElementById("JobTitle").style.border = "5px solid red";
    document
      .getElementById("JobTitle")
      .setAttribute("placeholder", " Title is  Mandatory");
    return;
  }
  let newemployee = {
    employeeid: `${empid + 1}`,
    prefferedname: `${prefferedname}`,
    title: `${jobtitle}`,
    department: `${dept}`,
  };
  employeedata.push(newemployee);
  emptythedirectory();
  rendering_employees();
  let sidebardept = document.getElementsByClassName("sidebar_departments")[0]
    .children[0].children;
  for (let i = 1; i < 5; i++) {
    if (sidebardept[i].children[0].title == dept) {
      let tempvalue = sidebardept[i].children[0].value;
      tempvalue = Number(tempvalue) + 1;
      sidebardept[i].children[0].value = tempvalue;
      sidebardept[i].children[0].innerText =
        dept + ` (${sidebardept[i].children[0].value})`;
    }
  }
  empid += 1;
}

function modalclose() {
  document.getElementById("JobTitle").style.border = "1px solid black";
  document.getElementById("JobTitle").setAttribute("placeholder", "");
  document.getElementById("UserName").style.border = "1px solid black";
  document.getElementById("UserName").setAttribute("placeholder", "");
}

var previousbutton = 0,
  currentbutton = 0;
function buttonfilter(name) {
  currentbutton = previousbutton;
  previousbutton = name;
  if (previousbutton == currentbutton) {
    buttonfilterreversal();
    currentbutton = 0;
    previousbutton = 0;
  } else {
    buttonfilterreversal();
    for (let i = 0; i < employee_names.length; i++) {
      let temp = employee_names[i].innerHTML;
      temp = temp.toLowerCase();
      if (!temp.startsWith(name)) {
        displaychanges(employee_names[i], "none");
      }
    }
  }
  failedsearch();
}

function buttonfilterreversal() {
  document.getElementsByClassName("employee_failsearch")[0].style.display =
    "none";
  for (let i = 0; i < employee_names.length; i++) {
    displaychanges(employee_names[i], "flex");
  }
}

var previousdept = 0,
  currentdept = 0;
function Deptfilter(name) {
  currentdept = previousdept;
  previousdept = name;
  if (previousdept == currentdept) {
    buttonfilterreversal();
    previousdept = 0;
    currentdept = 0;
  } else {
    buttonfilterreversal();
    for (let i = 0; i < employee_departments.length; i++) {
      if (employee_departments[i].innerText !== name) {
        displaychanges(employee_departments[i], "none");
      }
    }
  }
  failedsearch();
}

var previousjob = 0,
  currentjob = 0;
function Jobfilter(name) {
  previousjob = currentjob;
  currentjob = name;
  if (previousjob == currentjob) {
    buttonfilterreversal();
    previousjob = 0;
    currentjob = 0;
  } else {
    buttonfilterreversal();
    for (let i = 0; i < employee_designation.length; i++) {
      if (employee_designation[i].innerText !== name) {
        displaychanges(employee_designation[i], "none");
      }
    }
  }
  failedsearch();
}

function Searchbar() {
  buttonfilterreversal();
  let inputvalue = document.getElementById("searchbar").value.toLowerCase();
  for (let i = 0; i < employee_names.length; i++) {
    let empname = employee_names[i].innerText;
    empname = empname.toLowerCase();
    let empdept = employee_departments[i].innerText;
    empdept = empdept.toLowerCase();
    let emptitle = employee_designation[i].innerText;
    emptitle = emptitle.toLowerCase();
    let dropdownvalue = document.getElementById("dropdownMenuButton").value;
    if (dropdownvalue == 0) {
      if (empname.search(inputvalue) == -1) {
        if (empdept.search(inputvalue) == -1) {
          if (emptitle.search(inputvalue) == -1) {
            displaychanges(employee_names[i], "none");
          } else {
            displaychanges(employee_names[i], "flex");
          }
        } else {
          displaychanges(employee_names[i], "flex");
        }
      } else {
        displaychanges(employee_names[i], "flex");
      }
    } else if (dropdownvalue == 1) {
      if (empname.search(inputvalue) == -1) {
        displaychanges(employee_names[i], "none");
      } else {
        displaychanges(employee_names[i], "flex");
      }
    } else if (dropdownvalue == 2) {
      if (emptitle.search(inputvalue) == -1) {
        displaychanges(employee_names[i], "none");
      } else {
        displaychanges(employee_names[i], "flex");
      }
    } else if (dropdownvalue == 3) {
      if (empdept.search(inputvalue) == -1) {
        displaychanges(employee_names[i], "none");
      } else {
        displaychanges(employee_names[i], "flex");
      }
    }
  }
  failedsearch();
}

var viewmore_button = document.getElementById("viewmore_options").style;
var viewless_button = document.getElementById("sidebar_viewmore").style;
function clearbutton() {
  buttonfilterreversal();
  document.getElementById("searchbar").value = "";
}

function viewmore() {
  viewmore_button.display = "inline";
  viewless_button.display = "none";
}

function viewless() {
  viewless_button.display = "inline";
  viewmore_button.display = "none";
}

function failedsearch() {
  let temp = document.getElementsByClassName("employee_name");
  let length = temp.length;
  let count = 0;
  for (let i = 0; i < length; i++) {
    if (
      window.getComputedStyle(temp[i].parentElement.parentElement).display ==
      "none"
    )
      count += 1;
  }
  if (count == length) {
    document.getElementsByClassName("employee_failsearch")[0].style.display =
      "inherit";
  }
}

function keyp(name) {
  if (name.key == "Enter") {
    Searchbar();
    name.preventDefault();
  }
}

var bodyelemnts = [
  "header",
  "sidebar",
  "directory_searcharea",
  "directory_buttongroup",
  "directory_note",
];

function popup(name) {
  closebutton();
  var random_color = colors[Math.floor(Math.random() * colors.length)];
  let temp = document.getElementsByClassName("employee_details");
  temp[0].style.display = "block";
  let parent = name.target;
  childinfo = parent.children[1].children;
  document.getElementById("employee_photo").style.backgroundColor =
    random_color;
  document.getElementById("employee_photo").innerText =
    childinfo[0].innerText.slice(0, 2);

  destination = document.getElementById("newemployee_info").children;
  destination[0].innerText = "Name: " + childinfo[0].innerText;
  destination[1].innerText = "Desgination: " + childinfo[1].innerText;
  destination[2].innerText = "Department: " + childinfo[2].innerText;
  for (let i = 0; i < bodyelemnts.length; i++) {
    opacitychanger(bodyelemnts[i], "30%");
  }
  let empcard = document.getElementsByClassName("directory_employee_card");
  for (let i = 0; i < empcard.length; i++) {
    empcard[i].style.opacity = "30%";
  }
  document.getElementsByClassName("directory_employee")[0].style.border =
    "2px solid gray";
}

function closebutton() {
  document.getElementsByClassName("employee_details")[0].style.display = "none";
  for (let i = 0; i < bodyelemnts.length; i++) {
    opacitychanger(bodyelemnts[i], "100%");
  }
  let empcard = document.getElementsByClassName("directory_employee_card");
  for (let i = 0; i < empcard.length; i++) {
    empcard[i].style.opacity = "100%";
  }
  document.getElementsByClassName("directory_employee")[0].style.border =
    "3px solid black";
}

function opacitychanger(target, opacitypercentage) {
  document.getElementsByClassName(target)[0].style.opacity = opacitypercentage;
}

function editemployeedetails(event) {
  parrent = event.target;
  let namedit = document.createElement("div");
  let employeenewname = document.getElementsByClassName("neweployee_name")[0];
  employeenewname.innerHTML = `New Name:    <input class='newemployeename' placeholder='${employeenewname.innerText.slice(
    5
  )}'>`;
  let employeenewtitle = document.getElementsByClassName(
    "newemployee_designation"
  )[0];
  employeenewtitle.innerHTML = ` New Designation:    <input class='newemployeetitle' placeholder='${employeenewtitle.innerText.slice(
    13
  )}'>`;
  let employeenewdept = document.getElementsByClassName(
    "newemployee_department"
  )[0];
  employeenewdept.innerHTML = ` New Department:    <select  class="newemployeedept">
     <option value="IT Department">IT Department</option>
     <option value="HR Department">Human Resources </option>
     <option value="MD">MD</option>
     <option value="Sales">Sales<option>
   </select> `;
  document.getElementById("employee_submitbutton").style.display = "inline";
}

function newdetails_submit() {
  let nameinput = document.getElementsByClassName("newemployeename")[0];
  let oldname = nameinput.getAttribute("placeholder");
  let newname = nameinput.value;
  let titleinput = document.getElementsByClassName("newemployeetitle")[0];
  let newtitle = titleinput.value;
  let deptinput = document.getElementsByClassName("newemployeedept")[0];
  let newdept = deptinput.value;
  if (newname != "" && newtitle != "") {
    
    for (let i = 0; i < employeedata.length; i++) {
      if (` ${employeedata[i].prefferedname}` == oldname) {
        employeedata[i].prefferedname = newname;
        employeedata[i].department = newdept;
        employeedata[i].title = newtitle;
      }
    }
  } else {
    closebutton();
    return;
  }
  emptythedirectory();
  rendering_employees();
  closebutton();
}
