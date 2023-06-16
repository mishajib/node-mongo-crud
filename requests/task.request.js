const { body, validationResult } = require("express-validator");

const validateTask = [
  body("title").notEmpty().withMessage("Title is required!"),
  body("description").notEmpty().withMessage("Description is required!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = {};
      // Store validation errors in flash messages
      errors.array().forEach((error) => {
        req.flash("errors", error.msg);
        validationErrors[error.path] = error.msg;
      });

      // Store input values in flash messages or session
      req.flash("inputValues", req.body);

      // Store validation errors in flash messages or session
      req.flash("validationErrors", validationErrors);

      return res.redirect("back");
    }
    next();
  },
];

const validateTaskFile = [
  // Validate the task file
  body("task_file")
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Please select a task file!");
      }

      return true;
    })
    .custom((value, { req }) => {
      const filePath = req.file.path;
      const fileExtension = filePath.split(".").pop().toLowerCase();
      if (fileExtension !== "xlsx" && fileExtension !== "csv") {
        throw new Error(
          "Unsupported file format, please select a .xlsx or .csv file!"
        );
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    // remove index 1 because it is the file field
    errors.array().splice(1, 1);
    if (!errors.isEmpty()) {
      const validationErrors = {};
      // Store validation errors in flash messages
      errors.array().forEach((error) => {
        req.flash("errorMsg", error.msg);
        validationErrors[error.path] = error.msg;
      });

      // Store validation errors in flash messages or session
      req.flash("validationErrors", validationErrors);

      return res.redirect("back");
    }
    next();
  },
];

module.exports = { validateTask, validateTaskFile };
