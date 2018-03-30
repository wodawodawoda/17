const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
  console.log('Otrzymałem żądanie GET do strony głównej');
  res.send('Identyfikator, który został dopisany to ' + req.params.id);
});

app.get('/getNote', (req, res) => {
  fs.readFile('./menu.json', 'utf-8', (err,data) => {
    if(err) throw err;
    res.send(data);
  });
});

app.post('/updateNote/:note', (req, res) => {
  const stringifyFile = req.params.note;
  fs.writeFile('./menu.json', stringifyFile, (err) => {
    if (err) throw err;
    console.log('file updated');
  });
})

app.use((req, res, next) => {
  res.status(400).send('Niewłaściwe zapytanie')
  res.status(401).send('Brak uwierzytelnienia')
  res.status(403).send('Nie masz uprawnień')
  res.status(404).send('Wybac, nie mogliśmy odnaleźć tego,czego żądasz!')
  res.status(500).send('Wewnętrzny błąd serwera')
})

app.listen(3000);