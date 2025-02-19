import express from "express";
import posts from "./routes/posts";
import logger from "./middleware/logger";
import errorHandler from "./middleware/error";
import notFound from "./middleware/notFound";
const app = express();
const port = process.env.PORT || 8000;

//static folder -- by doing this you dont have to create route for each file eg : sending index.html and
// about.html -- note to access /about you need to specify the file extension too .html
// app.use(express.static(path.join(__dirname, "public")));

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//custom middleware
app.use(logger);

//Routes
app.use("/api/posts", posts);

//Error handler
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`SERVER running on port : ${port}`));
