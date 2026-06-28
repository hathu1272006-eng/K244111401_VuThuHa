function getCD() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      displayData(this.responseXML);
    }
  };

  xhttp.open("GET", "cd_catalog.xml", true);
  xhttp.send();
}

function displayData(xml) {
  var cds   = xml.getElementsByTagName("CD");
  var tbody = document.getElementById("cdBody");
  tbody.innerHTML = "";

  for (var i = 0; i < cds.length; i++) {
    var artist = cds[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue;
    var title  = cds[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue;

    var tr  = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");

    td1.textContent = artist;
    td2.textContent = title;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tbody.appendChild(tr);
  }
}
