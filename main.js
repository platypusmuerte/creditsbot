let express = require("express");
let exp = express();

const path = require('path');
const { config } = require('./config');
const { constants } = require('./constants');
const { Utils } = require("./utils/utils");
const { Database } = require('./db');
const dataDir = path.join("./", "/data");

const Cryptr = require('cryptr');
const cryptr = new Cryptr('platyscreditsbot');

let utils, listener, db;
let { Listener } = require("./listener/main");

utils = new Utils()
db = new Database({ cryptr, dataDir, utils });

listener = new Listener({ db, utils, exp, dataDir });
listener.start();