module.exports = {

  // READ vehicles
  getListings: (req, res, next) => {
    console.log('Fetching vehicle listings...');
    
    const db = req.app.get('db');

    db.getListings()
      .then( vehicles => {
        res.status(200).send(vehicles);
      })
      .catch( err => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  createListing: (req, res, next) => {
    console.log('Creating a listing...');

    const db = req.app.get('db');

    const { make, model, year, mileage, img, description, price, user_id } = req.body;

    db.createListing([ make, model, year, mileage, img, description, price, user_id ])
      .then( listing => {
        console.log(listing);
        res.status(200).send(listing);
      })
      .catch( err => {
        res.status(500).send(err) 
      });
  },

  deleteListing: (req, res, next) => {
    console.log("Removing listing...");

    const db = req.app.get('db');

    const { params } = req;

    db.deleteListing( [params.id] )
      .then( listing => {
        res.status(200).send(listing);
      })
      .catch( err => {
        console.log(err);
        res.status(500).send(err);
      });
  }


}