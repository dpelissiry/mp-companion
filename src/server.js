import { gpt } from "./gpt_requests.js";
import http from "node:http";
import EventEmitter from "node:events";
import { readFile } from "node:fs/promises";
import express from 'express';
import { join, dirname } from 'path';

// const file = await readFile("./hello.txt", 'utf-8');
// console.log(file);

const app = express();
const PORT = 3000;
const __dirname = dirname(new URL(import.meta.url).pathname); //dirname wasnt found since im not using regular js


app.listen(process.env.PORT || PORT, () => console.log(`Listening on http://localhost:${PORT}`));
app.use(express.static('public')); //tell express static files are in public directory

app.get('/', async (request, response) => {
  response.sendFile( join( __dirname + "/public/index.html" )); //send static files in public
});

app.get('/search', async (request, response) => {
  const { type, query } = request.query;
  const result = await request_gpt(query, type);
  response.json(result)
});

async function request_gpt(msg, type){
  //const result = await gpt(msg, type);
  //const result = {"Testing" : 1}
  //console.log(result);
  return [{"name":"saigon", "description":"dope freaking boulder", "stars": 4, "image" : "https://mountainproject.com/assets/photos/climb/107077142_medium_1494164081.jpg?cache=1694793054"},
        {"name":"saigon", "description":"dope freaking boulder", "stars": 4, "image" : "https://mountainproject.com/assets/photos/climb/107077142_medium_1494164081.jpg?cache=1694793054"},
        {"name":"saigon", "description":"dope freaking boulder", "stars": 4, "image" : "https://mountainproject.com/assets/photos/climb/107077142_medium_1494164081.jpg?cache=1694793054"}]
  //console.log(result)
  return result;

}