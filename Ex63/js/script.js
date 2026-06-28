/* ================================================
   Exercise 63 - Member Registration
   External JavaScript
   ================================================ */

/* ===== 1. KHỞI TẠO KHI TRANG LOAD ===== */
window.onload = function () {
  loadDayOptions();
  loadMonthOptions();
  loadYearOptions();
  loadSampleData();
  document.getElementById("name").focus();
};

/* ===== 2. NẠP DỮ LIỆU DROPDOWN BẰNG VÒNG LẶP ===== */
function loadDayOptions() {
  var daySelect = document.getElementById("day");
  for (var d = 1; d <= 31; d++) {
    var opt = document.createElement("option");
    opt.value = d < 10 ? "0" + d : "" + d;
    opt.text  = d < 10 ? "0" + d : "" + d;
    daySelect.appendChild(opt);
  }
}

function loadMonthOptions() {
  var monthSelect = document.getElementById("month");
  for (var m = 1; m <= 12; m++) {
    var opt = document.createElement("option");
    opt.value = m < 10 ? "0" + m : "" + m;
    opt.text  = m;
    monthSelect.appendChild(opt);
  }
}

function loadYearOptions() {
  var yearSelect = document.getElementById("year");
  for (var y = 1970; y <= 2010; y++) {
    var opt = document.createElement("option");
    opt.value = y;
    opt.text  = y;
    yearSelect.appendChild(opt);
  }
}


function loadSampleData() {
  var sampleData = [
    { name: "John",  email: "john@gmail.com",  gender: "Man",   birthday: "02/02/1990", hobbies: "Reading",           color: "Yellow" },
    { name: "Peter", email: "peter@gmail.com", gender: "Man",   birthday: "01/01/1992", hobbies: "Chat, Reading",      color: "Red"    },
    { name: "Lucy",  email: "lucy@gmail.com",  gender: "Woman", birthday: "01/02/2005", hobbies: "Listening, Chat",    color: "Violet" }
  ];
  sampleData.forEach(function (d) {
    insertRow(d.name, d.email, d.gender, d.birthday, d.hobbies, d.color);
  });
}


function validateEmail(email) {
  // Kiểm tra định dạng email hợp lệ
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}


function signUp() {
  var nameVal  = document.getElementById("name").value.trim();
  var emailVal = document.getElementById("email").value.trim();


  if (nameVal === "") {
    alert("Name cannot be left blank!");
    document.getElementById("name").focus();
    return;
  }

  
  if (emailVal === "") {
    alert("Email cannot be left blank!");
    document.getElementById("email").focus();
    return;
  }
  if (!validateEmail(emailVal)) {
    alert("Email is not valid!\nPlease enter correct format: user@domain.com");
    document.getElementById("email").focus();
    return;
  }

  
  var day      = document.getElementById("day").value;
  var month    = document.getElementById("month").value;
  var year     = document.getElementById("year").value;
  var birthday = day + "/" + month + "/" + year;

  
  var genderRadios = document.getElementsByName("gender");
  var gender = "";
  for (var i = 0; i < genderRadios.length; i++) {
    if (genderRadios[i].checked) {
      gender = genderRadios[i].value;
      break;
    }
  }


  var hobbyCheckboxes = document.getElementsByName("hobby");
  var hobbies = [];
  for (var i = 0; i < hobbyCheckboxes.length; i++) {
    if (hobbyCheckboxes[i].checked) {
      hobbies.push(hobbyCheckboxes[i].value);
    }
  }

 
  var colorRadios = document.getElementsByName("color");
  var color = "";
  for (var i = 0; i < colorRadios.length; i++) {
    if (colorRadios[i].checked) {
      color = colorRadios[i].value;
      break;
    }
  }


  insertRow(nameVal, emailVal, gender, birthday, hobbies.join(", "), color);


  clearForm();
}


function insertRow(name, email, gender, birthday, hobbies, color) {
  var tbody = document.getElementById("memberBody");
  var tr    = document.createElement("tr");

  var cells = [name, email, gender, birthday, hobbies, color];
  cells.forEach(function (val) {
    var td       = document.createElement("td");
    td.textContent = val;
    tr.appendChild(td);
  });

  tr.onmouseover = function () {
    var tds = this.getElementsByTagName("td");
    for (var i = 0; i < tds.length; i++) {
      tds[i].style.backgroundColor = "yellow";
    }
  };

  tr.onmouseout = function () {
    var tds = this.getElementsByTagName("td");
    for (var i = 0; i < tds.length; i++) {
      tds[i].style.backgroundColor = "";
    }
  };

  tbody.appendChild(tr);
}


function clearForm() {
  // Xóa dữ liệu trên form
  document.getElementById("regForm").reset();
  // Focus về ô Name
  document.getElementById("name").focus();
}
