var express = require('express');
var app = express();

const todoTxtFilePath = '/Users/michalex/todo_ptpp.txt'


app.use(express.static('dist'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/dist/index.html');
});

app.get("/todos", function(request, response) {
  response.sendFile(todoTxtFilePath);
});

var listener = app.listen(8000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
