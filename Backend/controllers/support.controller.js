const Support = require('../models/support.model');



const supports = async (req, res) => {
  try {
    const response = await Support.find();
    if(!response){
      res.status(400).json({msg: "Nothing to support for know"});
      return;
    }
    res.status(200).json({ msg: response });
  } catch (error) {
    console.log(`services: ${error}`);
  }
};


module.exports = supports;