const express = require('express');
const app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('assets'));

app.use('/store', (req, res, next) => {
  console.log('Pośrednik');
  next();
});

app.get('/', (req, res) => {
  res.sendFile('/index.html');
});

app.get('/first-template', (req, res) => {
  res.render('first-template', {
    name: "Dynamic pug",
    header: "Great pug",
    showPug: true,
    bark: "HAU",
    url: "https://m.popkey.co/287d1c/kve1Z_s-200x150.gif?c=popkey-web&p=popkey&i=dogs-animals&l=search&f=.gif"
  });
});

app.get('/auth/google', (req, res) => {
  res.render('auth-google', {
    user: {
      name: "",
      permit: false
    }
  });
});

app.get('/inside', (req, res) => {
  res.render('inside')
})

app.get('/store', (req, res) => {
  res.send('To jest sklep');
});

app.get('/userform', (req, res) => {
  const response = {
    first_name: req.query.first_name,
    last_name: req.query.last_name
  };
  res.end(JSON.stringify(response));
});

const server = app.listen(3001, 'localhost', () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Przykładowa aplikacja nasłuchuje na http://' + host + ':' + port);
});
app.use((req, res, next) => {

})
