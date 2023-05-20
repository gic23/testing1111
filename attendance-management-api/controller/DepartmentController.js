const Department = require("../models/Department");

exports.getAllDepartment = async (req, res, next) => {
  try {
    const [department, _] = await Department.findAll();
    res.status(200).json({ count: department.length, department });
  } catch (error) {
    next(error);
  }
};

exports.createNewDepartment = async (req, res, next) => {
  try {
    let {name} = req.body;

    let department = new Department(name);

    department = await department.save();
    res.status(201).json({status:true, message: "Department created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({status:false, message: `${error}` });
    next(error);
  }
};

exports.updateDepartment = async (req, res, next) => {
  try {
    let {  name } = req.body;
    var id = req.params.id;
  
    let department = new Department(name);

    department = await department.edit(id);
    res.status(201).json({ message: "Department modified" });

  } catch (error) {
    console.log("Error 2");
    next(error);
  }
};

exports.getDepartmentById = async (req, res, next) => {
  try {
    let id = req.params.id;

    let [department, _] = await Department.findById(id);

    res.status(200).json({ department: department[0] });
  } catch (error) {
    next(error);
  }
};

exports.deleteDepartmentById = async (req, res, next) => {
  try {
    let id = req.params.id;

    let department = await Department.DeletebyId(id);

    res.status(200).json({ message: "Department deleted" });
  } catch (error) {
    next(error);
  }
};

exports.getByNameIgnorcase = async (req, res, next) => {
  try {
    let name = req.params.name;

    let [department, _] = await Department.findDepartmentIgnorcase(name);

    res.status(200).json({ department: department[0] });
  } catch (error) {
    next(error);
  }
};

