var xmlString =
  '<?xml version="1.0" encoding="UTF-8"?>' +
  '<students>' +
    '<student>' +
      '<id>987456</id>' +
      '<name>Marie Curie</name>' +
      '<birthday>7/11/1867</birthday>' +
      '<gender>Woman</gender>' +
    '</student>' +
    '<student>' +
      '<id>987561</id>' +
      '<name>Einstein</name>' +
      '<birthday>14/3/1879</birthday>' +
      '<gender>Man</gender>' +
    '</student>' +
    '<student>' +
      '<id>985467</id>' +
      '<name>Leo Szilard</name>' +
      '<birthday>11/2/1898</birthday>' +
      '<gender>Man</gender>' +
    '</student>' +
    '<student>' +
      '<id>984321</id>' +
      '<name>Nikola Tesla</name>' +
      '<birthday>10/7/1856</birthday>' +
      '<gender>Man</gender>' +
    '</student>' +
    '<student>' +
      '<id>986789</id>' +
      '<name>Lise Meitner</name>' +
      '<birthday>7/11/1878</birthday>' +
      '<gender>Woman</gender>' +
    '</student>' +
    '<student>' +
      '<id>983654</id>' +
      '<name>Max Planck</name>' +
      '<birthday>23/4/1858</birthday>' +
      '<gender>Man</gender>' +
    '</student>' +
  '</students>';

var students   = [];
var sortColumn = '';
var sortAsc    = true;

window.onload = function () {
  parseXML();
  renderTable(students);
};

function parseXML() {
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(xmlString, 'text/xml');
  var nodes  = xmlDoc.getElementsByTagName('student');

  students = [];
  for (var i = 0; i < nodes.length; i++) {
    students.push({
      id:       nodes[i].getElementsByTagName('id')[0].childNodes[0].nodeValue,
      name:     nodes[i].getElementsByTagName('name')[0].childNodes[0].nodeValue,
      birthday: nodes[i].getElementsByTagName('birthday')[0].childNodes[0].nodeValue,
      gender:   nodes[i].getElementsByTagName('gender')[0].childNodes[0].nodeValue
    });
  }
}

function parseDateValue(str) {
  var parts = str.split('/');
  return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
}

function renderTable(data) {
  var tbody = document.getElementById('studentBody');
  tbody.innerHTML = '';

  data.forEach(function (s) {
    var tr = document.createElement('tr');

    ['id', 'name', 'birthday', 'gender'].forEach(function (field) {
      var td = document.createElement('td');
      td.textContent = s[field];
      tr.appendChild(td);
    });

    tr.onmouseover = function () {
      var tds = this.getElementsByTagName('td');
      for (var i = 0; i < tds.length; i++) {
        tds[i].style.backgroundColor = 'yellow';
      }
    };

    tr.onmouseout = function () {
      var tds = this.getElementsByTagName('td');
      for (var i = 0; i < tds.length; i++) {
        tds[i].style.backgroundColor = '';
      }
    };

    tr.onclick = function () {
      var url = 'Ex67_Student_Detail.html' +
        '?id='       + encodeURIComponent(s.id)       +
        '&name='     + encodeURIComponent(s.name)     +
        '&birthday=' + encodeURIComponent(s.birthday) +
        '&gender='   + encodeURIComponent(s.gender);
      window.location.href = url;
    };

    tbody.appendChild(tr);
  });
}

function sortTable(column) {
  if (sortColumn === column) {
    sortAsc = !sortAsc;
  } else {
    sortColumn = column;
    sortAsc    = true;
  }

  students.sort(function (a, b) {
    var va, vb;
    if (column === 'birthday') {
      va = parseDateValue(a.birthday).getTime();
      vb = parseDateValue(b.birthday).getTime();
      return sortAsc ? va - vb : vb - va;
    }
    va = a[column].toLowerCase();
    vb = b[column].toLowerCase();
    if (va < vb) return sortAsc ? -1 : 1;
    if (va > vb) return sortAsc ? 1 : -1;
    return 0;
  });

  renderTable(students);
  updateHeaders(column);
}

function updateHeaders(column) {
  var colMap = { id: 0, name: 1, birthday: 2, gender: 3 };
  var labels = ['Student ID', 'Student Name', 'Birthday', 'Gender'];
  var ths    = document.querySelectorAll('#studentTable .col-headers th');

  ths.forEach(function (th, i) {
    th.textContent = labels[i];
  });

  var idx = colMap[column];
  if (idx !== undefined) {
    ths[idx].textContent += sortAsc ? ' \u25b2' : ' \u25bc';
  }
}
