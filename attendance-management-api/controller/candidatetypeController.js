const CandidateType = require("../models/CandidateType");

exports.getAllCandidateType = async (req, res, next) => {
  try {
    const [candidatetype, _] = await CandidateType.findAll();
    res.status(200).json({ count: candidatetype.length, candidatetype });
  } catch (error) {
    next(error);
  }
};

exports.createNewCandidateType = async (req, res, next) => {
  try {
    let {name} = req.body;


    let candidateType = new CandidateType(name);

    candidateType = await candidateType.save();
    res.status(201).json({ message: "Candidate Type created" });
  } catch (error) {
    console.log("Error 2");
    next(error);
  }
};

exports.updateCandidateType = async (req, res, next) => {
  try {
    let {  name } = req.body;
    var id = req.params.id;
  
    let candidateType = new CandidateType(name);

    candidateType = await candidateType.edit(id);
    res.status(201).json({ message: "Candidate Type modified" });

  } catch (error) {
    console.log("Error 2");
    next(error);
  }
};

exports.getCandidateTypeById = async (req, res, next) => {
  try {
    let id = req.params.id;

    let [candidatetype, _] = await CandidateType.findById(id);

    res.status(200).json({ candidatetype: candidatetype[0] });
  } catch (error) {
    next(error);
  }
};

exports.deleteCandidateTypeById = async (req, res, next) => {
  try {
    let id = req.params.id;

    let candidate_type = await CandidateType.DeletebyId(id);

    res.status(200).json({ message: "Candidate Type deleted" });
  } catch (error) {
    next(error);
  }
};

