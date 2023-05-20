const Location = require("../models/Location");

exports.getAll = async (req, res, next) => {
  try {
    const [location, _] = await Location.findAll();
    res.status(200).json({ count: location.length, location });
  } catch (error) {
    next(error);
  }
};

exports.createNew = async (req, res, next) => {
  try {
    let {name,description} = req.body;
  
    let location = new Location(name,description);

    location = await location.save();
    res.status(201).json({ message: "Locations created" });
  } catch (error) {
    console.log("Error 2");
    next(error);
  }
};

exports.Update = async (req, res, next) => {
  try {
    let {  name,description} = req.body;
    var id = req.params.id;
  
    let location = new Location(name,description);

    location = await location.edit(id);
    res.status(201).json({ message: "Locations modified" });

  } catch (error) {
    console.log("Error 2");
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    let id = req.params.id;

    let [location, _] = await Location.findById(id);

    res.status(200).json({ location: location[0] });
  } catch (error) {
    next(error);
  }
};

exports.getletById = async (req, res, next) => {
  try {
    let id = req.params.id;

    let location = await Location.DeletebyId(id);

    res.status(200).json({ message: "Location deleted" });
  } catch (error) {
    next(error);
  }
};


exports.getByNameIgnorcase = async (req, res, next) => {
  try {
    let name = req.params.name;

    let [location, _] = await Location.findLocationByNameIgnorcase(name);

    res.status(200).json({ location: location[0] });
  } catch (error) {
    next(error);
  }
};

