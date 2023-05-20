const Departmentoption = require("../models/DepartmentOption");

exports.getAllDepartmentOption = async (req, res, next) => {
  try {
    const [departmentoption, _] = await Departmentoption.findAll();
    res.status(200).json({ count: departmentoption.length, departmentoption });
  } catch (error) {
    next(error);
  }
};

exports.createNewDepartmentOption = async (req, res, next) => {
  try {
    let {name,department_id} = req.body;

    let departmentoption = new Departmentoption(name,department_id);

    departmentoption = await departmentoption.save();
    res.status(201).json({ message: "Department Option created" });
  } catch (error) {
    console.log("Error 2");
    next(error);
  }
};

exports.updateDepartmentOption = async (req, res, next) => {
  try {
    let {  name ,department_id} = req.body;
    var id = req.params.id;
  
    let departmentoption = new Departmentoption(name,department_id);

    departmentoption = await departmentoption.edit(id);
    res.status(201).json({ message: "Department Option modified" });

  } catch (error) {
    console.log("Error 2");
    next(error);
  }
};

exports.getDepartmentOptionById = async (req, res, next) => {
  try {
    let id = req.params.id;

    let [departmentoption, _] = await Departmentoption.findById(id);

    res.status(200).json({ departmentoption: departmentoption[0] });
  } catch (error) {
    next(error);
  }
};

exports.deleteDepartmentOptionById = async (req, res, next) => {
  try {
    let id = req.params.id;

    let departmentoption = await Departmentoption.DeletebyId(id);

    res.status(200).json({ message: "Department Option deleted" });
  } catch (error) {
    next(error);
  }
};

exports.getByNameIgnorcase = async (req, res, next) => {
  try {
    let name = req.params.name;

    let [department, _] = await Departmentoption.findDepartmentIgnorcase(name);

    res.status(200).json({ department: department[0] });
  } catch (error) {
    next(error);
  }
};
