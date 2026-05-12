"use strict";

const express = require("express");
const path = require("path");

const app = express();
const rootDir = path.join(__dirname);

app.disable("x-powered-by");
app.use(express.static(rootDir, { index: "index.html" }));

const port = Number(process.env.PORT) || 3000;
const host = "0.0.0.0";

app.listen(port, host);
