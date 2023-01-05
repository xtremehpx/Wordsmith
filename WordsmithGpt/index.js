import { ChatGPTAPIBrowser } from 'chatgpt'
import dotenv from 'dotenv';

// https://stackabuse.com/building-a-rest-api-with-node-and-express/
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// const express = require('express')
// const bodyParser = require('body-parser');
// const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => console.log(`REST APP listening on port ${port}!`));

///////////////////////////////////////////////////////
//https://github.com/transitive-bullshit/chatgpt-api#install
dotenv.config();
var msedge = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
var googlechrome = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
// use puppeteer to bypass cloudflare (headful because of captchas)
const api = new ChatGPTAPIBrowser({
    email: process.env.OPENAI_EMAIL,
    password: process.env.OPENAI_PASSWORD,
    executablePath: msedge
})

await initGpt();

///////////////////////////////////////////////////////

async function initGpt() {
    console.log("Connecting to OpenAI service");
    await api.initSession();
    const result = await api.sendMessage('Tell me a fun facts of the day');
    console.log(result.response)
    return result;
}



// handshake
app.get("/", (req, res, next) => {
    res.json("Http server is running");
});


app.post('/polish', async(req, res) => {
    const input = req.body;
    console.log("Polish api: %j", input);
    const result = await api.sendMessage(process.env.POLISH + input.sentence);
    console.log(result.response);
    res.send(result.response);
});

app.post('/resume', async(req, res) => {
    const input = req.body;
    console.log("Resume api: %j", input);
    const result = await api.sendMessage(process.env.RESUME + input.sentence);
    console.log(result.response);
    res.send(result.response);
});

app.post('/english', async(req, res) => {
    const input = req.body;
    console.log("English api: %j", input);
    const result = await api.sendMessage(process.env.ENGLISH + input.sentence);
    console.log(result.response);
    res.send(result.response);
});

app.post('/reboot', async(req, res) => {
    var result = await initGpt();
    res.send(result.response);
});

app.post('/test', (req, res) => {
    const input = req.body;
    console.log("Test api: %j", input);
    const result = { response: "I'm good" };
    res.send(result.response);
});