const Candidate = require("../models/Candidate");
const CandidateType = require("../models/CandidateType");
const CandidateExcel = require("../models/CandidateExcel");
const xlsx = require('xlsx');
const Department = require("../models/Department");
const Departmentoption = require("../models/DepartmentOption");


exports.getAllstudent = async (req, res, next) => {
  try {
    const [candidates, _] = await Candidate.findAll();
    res.status(200).json({ count: candidates.length, candidates });
  } catch (error) {
    next(error);
  }
};

exports.uploadexceldata = async (req, res, next) => {
  try {

    // Read the file using pathname
    const file = xlsx.readFile(`./uploads/excel/${req.file.filename}`);

    // Grab the sheet info from the file
    const sheetNames = file.SheetNames;
    const totalSheets = sheetNames.length;

    // Variable to store our data
    let uploaddata = [];
    // Loop through sheets
    let i = 0;
    for (i = 0; i < totalSheets; i++) {
      // Convert to json using xlsx
      const tempData = xlsx.utils.sheet_to_json(file.Sheets[sheetNames[i]]);
      // Add the sheet's json to our data array
      uploaddata.push(...tempData);
    }


    for (i = 0; i < uploaddata.length; i++) {
      let [data, _] = await Candidate.CountstudentbyStudentId(uploaddata[i].student_id);
      if (data[0].count == 0) {
        data = await Department.findByName(uploaddata[i].department);
        console.log(data);
        let department_id = 0;
        if (data[0].id) {
          let department_get = data[0];
          department_id = department_get[0].id;
        }
      
        let departmentoption_id = 0;
        data = await Departmentoption.findIdByName(uploaddata[i].departmentoption);
        if (data[0].id) {
          let departmentoption_get = data[0];
          departmentoption_id = departmentoption_get[0].id;
        }
        //student_id, name, namekh, gender, dateofbirth,  department_id, departmentoption_id,study_year

        let candidatedata = new CandidateExcel(uploaddata[i].student_id, uploaddata[i].name, uploaddata[i].namekh, uploaddata[i].gender, uploaddata[i].dateofbirth, department_id, departmentoption_id, uploaddata[i].study_year);

        candidatedata = await candidatedata.save();

      }

    }


    res.status(200).json({ status: true, message: "Upload Success" });

  } catch (error) {
    console.log(error);
    res.status(200).json({ status: false, message: "Upload error" });
    next();
  }

};

exports.createNewStudent = async (req, res, next) => {
  try {
    let { student_id, name, namekh, gender, phone_number, dateofbirth, candidatetype_id, department_id, departmentoption_id, departmentyear, study_year } = req.body;

    let [count, _] = await Candidate.CountstudentbyStudentId(student_id);
    if(!candidatetype_id){
      let [cantidationType, _] = await CandidateType.findByName("Guest");
      if(cantidationType[0]){
        candidatetype_id = cantidationType[0].id;
      }
    }

    if (count[0].count == 0) {
      if (req.file) {
        var baseUrl = process.env.PATH + "/uploads/" + req.file.filename;
      } else {
        var baseUrl = "";
      }
      var imageurl = baseUrl;
      let student = new Candidate(student_id, name, namekh, gender, phone_number, dateofbirth, candidatetype_id, department_id, departmentoption_id, departmentyear, study_year, imageurl);

      // student = await student.save();
      res.status(201).json({ status: true, message: "Student created" });
    } else {
      res.status(201).json({ status: false, message: "Student Id already Register" });
    }

  } catch (error) {
    console.log("Error 2");
    next(error);
  }
};

exports.updateStudent = async (req, res, next) => {
  try {
    let { student_id, name, namekh, gender, phone_number, dateofbirth, candidatetype_id, department_id, departmentoption_id, departmentyear, study_year } = req.body;
    var id = req.params.id;
    if(candidatetype_id==0){
      let [cantidationType, _] = await CandidateType.findByName("Guest");
      if(cantidationType[0]){
        candidatetype_id = cantidationType[0].id;
      }
    }
    if (req.file) {
      var baseUrl = process.env.PATH + "/uploads/" + req.file.filename;
    } else {
      var baseUrl = "";
    }
    var imageurl = baseUrl;
    let student = new Candidate(student_id, name, namekh, gender, phone_number, dateofbirth, candidatetype_id, department_id, departmentoption_id, departmentyear, study_year, imageurl);

    student = await student.edit(id);
    res.status(201).json({ message: "Candidate modified" });

  } catch (error) {
    console.log("Error 2");
    next(error);
  }
};

exports.getStudentById = async (req, res, next) => {
  try {
    let studentId = req.params.id;

    let [student, _] = await Candidate.findById(studentId);

    res.status(200).json({ student: student[0] });
  } catch (error) {
    next(error);
  }
};

exports.getStudentByStudentId = async (req, res, next) => {
  try {
    let student_id = req.params.id;

    let [student, _] = await Candidate.findStudentByStudentId(student_id);

    res.status(200).json({ student: student[0] });
  } catch (error) {
    next(error);
  }
};

exports.deleteStudentById = async (req, res, next) => {
  try {
    let id = req.params.id;

    let student = await Candidate.DeletebyId(id);

    res.status(200).json({ message: "Student deleted" });
  } catch (error) {
    next(error);
  }
};

exports.test = async (req, res, next) => {
  try {

    if (req.file) {
      var baseUrl = process.env.PATH + "/uploads/" + req.file.filename;
    } else {
      var baseUrl = "";
    }
    res.status(200).json({ message: "Student deleted" });

  } catch (error) {
    next(error);
  }
};