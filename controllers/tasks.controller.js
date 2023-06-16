const Task = require("../models/task");

const index = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get the page parameter from the request query, default to page 1
  const limit = 10; // Set the number of tasks per page

  const tasks = await Task.find()
    .skip((page - 1) * limit)
    .limit(limit);

  // Get the total number of tasks
  const totalTasks = await Task.countDocuments();

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalTasks / limit);

  const pagination = {
    currentPage: page,
    pageSize: limit,
    totalTasks: totalTasks,
    totalPages: totalPages,
  };

  return res.render("tasks/index", {
    title: "Tasks",
    tasks: tasks,
    pagination: pagination,
  });
};

const create = (req, res) => {
  return res.render("tasks/create", { title: "Add new task" });
};

const store = async (req, res) => {
  try {
    const data = req.body;
    data.createdAt = new Date();
    data.updatedAt = new Date();
    const task = new Task(data);
    await task.save();

    req.flash("successMsg", "Task created successfully.");

    return res.redirect("back");
  } catch (e) {
    console.log("Store Task Catch -> ", e.message);
    req.flash("errorMsg", "Something went wrong, Please try again!");

    return res.redirect("back");
  }
};

const show = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    return res.render("tasks/show", { title: "Show task details", task: task });
  } catch (e) {
    console.log("Show Task Catch -> ", e.message);
    req.flash("errorMsg", "Something went wrong, Please try again!");

    return res.redirect("back");
  }
};

const edit = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    return res.render("tasks/edit", { title: "Edit task", task: task });
  } catch (e) {
    console.log("Edit Task Catch -> ", e.message);
    req.flash("errorMsg", "Something went wrong, Please try again!");

    return res.redirect("back");
  }
};

const update = async (req, res) => {
  try {
    const data = req.body;
    data.updatedAt = new Date();
    await Task.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    req.flash("successMsg", "Task updated successfully.");

    return res.redirect("/tasks");
  } catch (e) {
    console.log("Update Task Catch -> ", e.message);
    req.flash("errorMsg", "Something went wrong, Please try again!");

    return res.redirect("back");
  }
};

const destroy = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    req.flash("successMsg", "Task deleted successfully.");

    return res.redirect("/tasks");
  } catch (e) {
    req.flash("errorMsg", "Something went wrong, Please try again!");

    return res.redirect("back");
  }
};

const importTasksPage = async (req, res) => {
  return res.render("tasks/import", { title: "Import tasks" });
};

const importTasks = async (req, res) => {
  try {
    const filePath = req.file.path;
    const fileExtension = filePath.split(".").pop().toLowerCase();

    if (fileExtension === "xlsx") {
      const workbook = XLSX.readFile(filePath);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Process jsonData and save it to the database using Sequelize
      await Task.bulkCreate(jsonData);
    } else if (fileExtension === "csv") {
      const csvData = await uploadCSV(filePath);

      // Process csvData and save it to the database using Sequelize
      await Task.bulkCreate(csvData);
    } else {
      req.flash(
        "errorMsg",
        "Unsupported file format, Please upload a CSV or XLSX file!"
      );
      return res.redirect("back");
    }

    // Clean up the uploaded file after importing
    fs.unlinkSync(filePath);

    req.flash("successMsg", "Tasks imported successfully.");

    return res.redirect("/tasks");
  } catch (e) {
    req.flash("errorMsg", "Something went wrong, Please try again!");

    return res.redirect("back");
  }
};

module.exports = {
  index,
  create,
  store,
  show,
  edit,
  update,
  destroy,
  importTasksPage,
  importTasks,
};
