const express = require('express');
const routes = require('./routes');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3011;

app.get('/api', (req, res) => {
  res.send('환영합니다!');
});

app.use(express.json());
app.use(cookieParser());

app.use('/api', routes);

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸습니다!');
});
