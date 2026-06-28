window.onload = function () {
  var params = new URLSearchParams(window.location.search);

  document.getElementById('d-id').textContent       = params.get('id')       || '';
  document.getElementById('d-name').textContent     = params.get('name')     || '';
  document.getElementById('d-birthday').textContent = params.get('birthday') || '';
  document.getElementById('d-gender').textContent   = params.get('gender')   || '';
};
