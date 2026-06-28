function addNode() {
  var content = document.getElementById("addContent").value.trim();
  var pos     = parseInt(document.getElementById("addPos").value);
  var ul      = document.getElementById("webList");
  var items   = ul.getElementsByTagName("li");

  if (content === "") {
    alert("Please enter content!");
    document.getElementById("addContent").focus();
    return;
  }

  var li = document.createElement("li");
  li.textContent = content;

  if (isNaN(pos) || pos > items.length) {
    ul.appendChild(li);
  } else if (pos <= 1) {
    ul.insertBefore(li, items[0]);
  } else {
    ul.insertBefore(li, items[pos - 1]);
  }

  document.getElementById("addContent").value = "";
  document.getElementById("addPos").value     = "";
  document.getElementById("addContent").focus();
}

function removeNode() {
  var pos   = parseInt(document.getElementById("removePos").value);
  var ul    = document.getElementById("webList");
  var items = ul.getElementsByTagName("li");

  if (isNaN(pos) || pos < 1 || pos > items.length) {
    alert("Invalid position! Valid range: 1 - " + items.length);
    document.getElementById("removePos").focus();
    return;
  }

  ul.removeChild(items[pos - 1]);
  document.getElementById("removePos").value = "";
  document.getElementById("removePos").focus();
}

function modifyNode() {
  var newContent = document.getElementById("modContent").value.trim();
  var pos        = parseInt(document.getElementById("modPos").value);
  var ul         = document.getElementById("webList");
  var items      = ul.getElementsByTagName("li");

  if (newContent === "") {
    alert("Please enter new content!");
    document.getElementById("modContent").focus();
    return;
  }

  if (isNaN(pos) || pos < 1 || pos > items.length) {
    alert("Invalid position! Valid range: 1 - " + items.length);
    document.getElementById("modPos").focus();
    return;
  }

  var newLi = document.createElement("li");
  newLi.textContent = newContent;
  ul.replaceChild(newLi, items[pos - 1]);

  document.getElementById("modContent").value = "";
  document.getElementById("modPos").value     = "";
  document.getElementById("modContent").focus();
}
