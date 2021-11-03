import express from "express";
//import {} from ".src/controllers";
//import makeCallback from './express-callback'
import dotenv from "dotenv";
dotenv.config();

const apiRoot = process.env.DM_BASE_URL;
const app = express();
app.use(express.json());

/* app.post(`${apiRoot}/comments`, makeCallback(postComment))
app.delete(`${apiRoot}/comments/:id`, makeCallback(deleteComment))
app.delete(`${apiRoot}/comments`, makeCallback(deleteComment))
app.patch(`${apiRoot}/comments/:id`, makeCallback(patchComment))
app.patch(`${apiRoot}/comments`, makeCallback(patchComment))
app.get(`${apiRoot}/comments`, makeCallback(getComments))*/

// listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

export default app;
