const express = require('express')
const path = require('path')
// const cookieParser = require('cookie-parser')
const morgan = require('morgan')
// const sesseion = require('express-session')
const cors = require('cors')

require('dotenv').config()

const {sequelize} = require('./models')
const indexRouter = require('./routes')
const authRouter = require('./routes/auth')

const app = express()
app.set('port', process.env.PORT || 8002)


