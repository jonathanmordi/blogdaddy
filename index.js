import express from "express";
import bodyParser from "body-parser";

let posts = [];

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//home page (all posts)
app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});
//show page to create posts
app.get("/new", (req, res) => {
  res.render("new.ejs", { title: "New Post" });
});
//create posts 
app.post("/create", (req, res) => {
  const { title, content } = req.body;
  posts.unshift({ id: Date.now(), title, content, createdAt: new Date() });
  res.redirect("/");
});
//delete posts
app.post("/delete/:id", (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect("/");
});


//edit posts
app.get("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.send("Post not found");
  res.render("edit", { post });
});

app.post("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (post) {
    post.title = req.body.title;
    post.content = req.body.content;
  }
  res.redirect("/");
});
app.set("view engine", "ejs");
app.set("views", "./views");



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
