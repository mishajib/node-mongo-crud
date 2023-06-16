const express = require("express");
const route = express.Router();
const homeController = require("../controllers/home.controller");
const tasksController = require("../controllers/tasks.controller");
const { validateTask } = require("../requests/task.request");

route.get("/", homeController.home);
route.get("/tasks", tasksController.index);
route.get("/tasks/create", tasksController.create);
route.post("/tasks", validateTask, tasksController.store);
route.get("/tasks/:id", tasksController.show);
route.get("/tasks/:id/edit", tasksController.edit);
route.put("/tasks/:id", validateTask, tasksController.update);
route.delete("/tasks/:id", tasksController.destroy);
route.get("/404", (req, res) => {
  return res.render("errors/404", { title: "404 Page" });
});
route.get("/500", (req, res) => {
  return res.render("errors/500", { title: "500 Page" });
});

module.exports = route;
