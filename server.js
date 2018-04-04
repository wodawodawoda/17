const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
let stringifyFile;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log('Otrzymałem żądanie GET do strony głównej');
  res.send('Identyfikator, który został dopisany to ' + req.params.id);
});

app.get('/getNote', (req, res) => {
  fs.readFile('./menu.json', 'utf-8', (err,data) => {
    if(err) throw err;
    stringifyFile = data
    res.send(data);
  });
});

app.post('/updateNote/:note', (req, res) => {
  let note = req.params.note
  let jsonObj = JSON.parse(stringifyFile)
  jsonObj.note = note
  fs.writeFile('./menu.json', JSON.stringify(jsonObj, null, 2), (err) => {
    if (err) throw err;
  })
})

app.use((req, res, next) => {
  res.status(400).send('Niewłaściwe zapytanie')
  res.status(401).send('Brak uwierzytelnienia')
  res.status(403).send('Nie masz uprawnień')
  res.status(404).send('Wybac, nie mogliśmy odnaleźć tego,czego żądasz!')
  res.status(500).send('Wewnętrzny błąd serwera')
})

app.listen(3000);