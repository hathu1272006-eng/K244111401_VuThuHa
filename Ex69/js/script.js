var employees = [];

window.onload = function () {
  loadXML();
};

function loadXML() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      parseEmployees(this.responseXML);
      populateDroplist();
      displayByTitle(document.getElementById("titleSelect").value);
    }
  };

  xhttp.open("GET", "XMLFile.xml", true);
  xhttp.send();
}

function parseEmployees(xml) {
  var nodes = xml.getElementsByTagName("employee");
  employees = [];

  for (var i = 0; i < nodes.length; i++) {
    employees.push({
      id:    nodes[i].getAttribute("id"),
      title: nodes[i].getAttribute("title"),
      name:  nodes[i].getElementsByTagName("name")[0].childNodes[0].nodeValue,
      phone: nodes[i].getElementsByTagName("phone")[0].childNodes[0].nodeValue
    });
  }
}

function populateDroplist() {
  var select = document.getElementById("titleSelect");
  var titles = [];

  employees.forEach(function (e) {
    if (titles.indexOf(e.title) === -1) {
      titles.push(e.title);
    }
  });

  titles.forEach(function (t) {
    var opt   = document.createElement("option");
    opt.value = t;
    opt.text  = t;
    select.appendChild(opt);
  });
}

function displayByTitle(title) {
  var filtered = employees.filter(function (e) {
    return e.title === title;
  });

  var tbody = document.getElementById("empBody");
  tbody.innerHTML = "";

  filtered.forEach(function (e) {
    var tr  = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");

    td1.textContent = e.id;
    td2.textContent = e.name;
    td3.textContent = e.phone;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tbody.appendChild(tr);
  });
}
