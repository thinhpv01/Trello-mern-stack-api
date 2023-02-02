import express from "express";
import {env} from '~/config/environment'  

const app = express();
import { connectDB } from "~/config/mongodb";
connectDB().catch(console.log);
app.get("/", (req, res) => {
  res.end("<h1>Hello world!</h1>");
});
app.listen(env.PORT, env.HOST, () => {
  console.log(`Hello Thinhpv, I'm running at ${env.HOST}:${env.PORT}`);
});
