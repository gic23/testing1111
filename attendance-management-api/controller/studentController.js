var fs = require('fs');
const xlsx = require('xlsx');
const Student = require("../models/Student");
const Candidate = require("../models/Candidate");

exports.test = async (req, res, next) => {
  try {

    // Read the file using pathname
    const file = xlsx.readFile(`uploads/excel/${req.file.filename}`);

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
      let [count, _] = await Student.CountstudentbyStudentId(uploaddata[i].student_id);

      if (count[0].count == 0) {
        let student = new Student(uploaddata[i].student_id, uploaddata[i].name, uploaddata[i].gender);
        student = await student.save();
      }
       
    }

    removefile(req.file.filename);
    res.status(200).json({ message: "Student insert" });

  } catch (error) {
    console.log(error);
    next();
  }

};

const removefile = (filename) => {
  const directoryPath = "uploads/excel/";
  const filenames = filename;
  const filepath = directoryPath + filenames;
  console.log(filepath);
  fs.unlink(filepath, (err) => {
    if (err) {
      console.log("File Cannot Delete");
    }
  });
};