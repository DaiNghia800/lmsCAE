const express = require('express');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const app = express();

require('dotenv').config();
const port = process.env.PORT;

app.use(express.json());


app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'JKSLSF',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
app.use(flash());

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static(`${__dirname}/public`));

const systemConfig = require("./config/system");

const routeClient = require('./routes/client/index.route');
const routeAdmin = require('./routes/admin/index.route');
routeClient(app);
routeAdmin(app);

app.locals.prefixAdmin = systemConfig.prefixAdmin;

const database = require("./config/database");
database.connect();

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});