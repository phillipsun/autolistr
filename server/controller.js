module.exports = {

  // READ vehicles
  getVehicles: (req, res, next) => {
    console.log('Fetching Vehicles...');
    
    const db = req.app.get('db');

    db.getVehicles()
      .then( vehicles => {
        res.status(200).send(vehicles);
      })
      .catch( err => {
        console.log(err);
        res.status(500).send(err);
      })
  }

}