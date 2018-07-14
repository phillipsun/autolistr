module.exports = {
  // CREATE Listing
  createListing: (req, res, next) => {
    console.log('Creating a listing...');
    const db = req.app.get('db');
    const { make, model, year, mileage, img, description, price, vin } = req.body;
    const user_id = req.session.user_id;

    db.createListing([ make, model, year, mileage, img, description, price, user_id, vin ])
      .then(listing => {
        res.status(200).send(listing);
      })
      .catch(err => {
        res.status(500).send(err) 
      });
  },

  // READ Single Listing
  getListing: (req, res, next) => {
    console.log('Fetching listing...');
    const db = req.app.get('db');
    
    db.getListing([ req.params.id ])
      .then(listing => {
        res.status(200).send(listing);
      })
      .catch( err => {
        res.status(500).send(err);
      })
  },

  // READ ALL Listings
  getListings: (req, res, next) => {
    console.log('Fetching vehicle listings...');
    const db = req.app.get('db');

    db.getListings()
      .then(listings => {
        res.status(200).send(listings);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  // READ ALL Listings by User
  getListingsByUserId: (req, res, next) => {
    console.log('Fetching user listings...');
    const db = req.app.get('db');

    //console.log(req.params.id);
    db.getListingsByUserId([ req.params.id ])
      .then(listings => {
        res.status(200).send(listings)
      })
      .catch(err=> {
        res.status(500).send(err);
      })
  },

  // UPDATE Listing
  updateListing: (req, res, next) => {
    console.log("Updating listing...");
    const db = req.app.get('db');
    console.log(req.body)
    const { make, model, year, mileage, img, description, price, vin } = req.body
    db.updateListing([ make, model, year, mileage, img, description, price, vin, req.params.id])
      .then(listing => {
        res.status(200).send(listing)
      })
      .catch(err => {
        res.status(500).send(err);
      })
  },

  // DELETE Listing
  deleteListing: (req, res, next) => {
    console.log("Removing listing...");
    const db = req.app.get('db');
    const { params } = req;

    db.deleteListing([params.id])
      .then(listing => {
        res.status(200).send(listing);

      })
      .catch( err => {
        console.log(err);
        res.status(500).send(err);
      });
  }
}