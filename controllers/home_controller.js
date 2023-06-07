const flights = require('../data/data');

// Handler for rendering the home page
module.exports.home = function(req, res) {
  const cities = ['Mumbai', 'Delhi', 'Bangalore'];

  return res.render('home', {
    title: 'Flight',
    cities
  });
};

// Handler for fetching flight results
module.exports.fetchResult = async function(req, res) {
  const { city1, city2 } = req.body;

  // Check if the selected cities are the same
  if (city1 === city2) {
    return res.send({
      msg: "You cannot choose the same city"
    });
  }

  const matchedFlights = {};

  // Find flights matching the selected cities
  flights.forEach((flight) => {
    if (city1 === flight.departure && city2 === flight.destination) {
      matchedFlights[flight.name] = flight.price;
    }
  });

  // If no flights are found, send appropriate message
  if (Object.keys(matchedFlights).length === 0) {
    return res.send({
      msg: "No flights available for the selected cities"
    });
  }

  // Send the matched flights
  return res.send(matchedFlights);
};
