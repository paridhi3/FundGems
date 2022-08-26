const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const { forEach } = require("lodash");
// const index = require(__dirname + "/index.js");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/public", express.static(__dirname + "/public"));

mongoose.connect("mongodb+srv://admin-paridhii:test123@fundgems.szmakwa.mongodb.net/categoriesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const projectSchema = {
  name: String,
  image: String,
  title: String,
  subtitle: String,
  amount: Number,
  category: String,
};

const Project = mongoose.model("Project", projectSchema);

const project1 = new Project({
  name: "dullo",
  image: "dullo-card",
  title: "Dullo: Neck Relief Pillow for Back, Side",
  subtitle:
    "Deep sleep made possible for all by our pillow's crater hole, ergonomic arches, neck support tubes.",
  amount: 584612,
  category: "household",
});
const project2 = new Project({
  name: "pepper-mill",
  image: "peppermill-card",
  title: "Black Rain: The One-Touch Automatic Pepper Mill",
  subtitle:
    "One Button Operation | 5 Precise Grind Settings | LED Light | Up to 8-hour Battery Life",
  amount: 789546,
  category: "household",
});
const project3 = new Project({
  name: "mealztime",
  image: "mealztime-card",
  title: "MEALZTIME - Cordless Self-heating Bento Box",
  subtitle:
    "One touch heating | Cordless self-heating | No water required | Reheats up to 5 meals per charge",
  amount: 112574,
  category: "phones & accessories",
});
const project4 = new Project({
  name: "moft",
  image: "moft-card",
  title: "MOFT Graphene Cooling Stand with Invisible Design",
  subtitle:
    "Invisible cooling stand to help you your computer work comfortably and effectively anywhere.",
  amount: 584612,
  category: "phones & accessories",
});
const project5 = new Project({
  name: "tiny-pump",
  image: "tiny-pump-card",
  title: "TINY PUMP 2X: Ultimate 3-in-1 Mini Outdoor Pump",
  subtitle:
    "Pocket Size| Ultra-light | Air Pump | Vacuum Pump| Camping Lantern| 4kPa Pressure| Waterproof",
  amount: 584612,
  category: "travel & outdoors",
});
const project6 = new Project({
  name: "lullevibes",
  image: "lullevibes-card",
  title: "LulleVibes - The Eco Travel Towel",
  subtitle:
    "Made from 17 recycled plastic bottles | Dries 3x faster | Light at 300g | Sand-free | Unique designs",
  amount: 584612,
  category: "travel & outdoors",
});

const defaultProjects = [
  project1,
  project2,
  project3,
  project4,
  project5,
  project6,
];

const categorySchema = {
  name: String,
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
};

const Category = mongoose.model("Category", categorySchema);

const category1 = new Category({
  name: "household",
  projects: [project1, project2],
});

const category2 = new Category({
  name: "phones & accessories",
  projects: [project3, project4],
});

const category3 = new Category({
  name: "travel & outdoors",
  projects: [project5, project6],
});

const defaultCategories = [category1, category2, category3];

app.get("/", function (req, res) {
  Category.find({}, function (err, foundCategories, foundProjects) {
    if (foundCategories.length === 0) {
      Category.insertMany(defaultCategories, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved default categories to DB");
        }
      });
      res.redirect("home");
    } else {
      res.render("home", {
        foundCategories: foundCategories,
      });
    }
  })
});

app.get("/household", function (req, res) {
  Project.find({ category: "household" }, function (err, foundProjects) {
    if (foundProjects.length === 0) {
      Project.insertMany(defaultProjects, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved default projects to DB");
        }
      });
      res.redirect("household");
    } else {
      res.render("household", {
        foundProjects: foundProjects,
      });
    }
  });
});

app.get("/phones%20&%20accessories", function (req, res) {
  Project.find(
    { category: "phones & accessories" },
    function (err, foundProjects) {
      if (foundProjects.length === 0) {
        Project.insertMany(defaultProjects, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Successfully saved default projects to DB");
          }
        });
        res.redirect("phones & accessories");
      } else {
        res.render("phones & accessories", {
          foundProjects: foundProjects,
        });
      }
    }
  );
});

app.get("/travel%20&%20outdoors", function (req, res) {
  Project.find({ category: "travel & outdoors" }, function (err, foundProjects) {
      if (foundProjects.length === 0) {
        Project.insertMany(defaultProjects, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Successfully saved default projects to DB");
          }
        });
        res.redirect("travel & outdoors");
      } else {
        res.render("travel & outdoors", {
          foundProjects: foundProjects,
        });
      }
    }
  );
});

app.get("/dullo", function (req, res) {
  res.render("dullo");
});

app.get("/pepper-mill", function (req, res) {
  res.render("pepper-mill");
});

app.get("/mealztime", function (req, res) {
  res.render("mealztime");
});

app.get("/moft", function (req, res) {
  res.render("moft");
});

app.get("/tiny-pump", function (req, res) {
  res.render("tiny-pump");
});

app.get("/lullevibes", function (req, res) {
  res.render("lullevibes");
});

app.get("/what-we-do", function (req, res) {
  res.render("what-we-do");
});

const userSchema = ({
  email: String,
  password: String
});

const User = new mongoose.model("User", userSchema);

app.get("/log-in", function(req, res){
  res.render("log-in");
});

app.get("/sign-up", function(req, res){
  res.render("sign-up");
});

app.post("/sign-up", function(req, res){
  const newUser =  new User({
    email: req.body.username,
    password: req.body.password
  });
  newUser.save(function(err){
    if (err) {
      console.log(err);
    } else {
      res.render("home2");
    }
  });
});

app.post("/log-in", function(req, res){
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({email: username}, function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        if (foundUser.password === password) {
          res.render("home2");
          // blurt("Successfully logged in!");
        }
      }
    }
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function () {
  console.log("Server started successfully");
});

// menu=Category Burgers=foundCategories burger=category category=projects,name
