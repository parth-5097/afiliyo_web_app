const csc = require("country-state-city").default;

exports.Country = (req, res) => {
  res.json({
    statusCode: 200,
    success: true,
    data: csc.getAllCountries(),
  });
};

exports.State = (req, res) => {
  res.json({
    statusCode: 200,
    success: true,
    data: csc.getStatesOfCountry(req.params.countryCode),
  });
};

exports.City = (req, res) => {
  res.json({
    statusCode: 200,
    success: true,
    data: csc.getCitiesOfState(req.params.countryCode, req.params.stateCode),
  });
};
