const Rental = require('./models/rental');

class FakeDb {

  constructor() {

    this.rentals = [{
        id: '1',
        title: 'Central Apartment',
        city: 'New York',
        street: 'Times Square',
        category: 'home',
        image: 'http://via.placeholder.com/350X250',
        bedrooms: 3,
        shared: false,
        description: 'very nice apartment',
        dailyRate: 34,
        createAt: '24/12/2017'
      },
      {
        id: '2',
        title: 'Central Apartment',
        city: 'Douala',
        street: 'Times Square',
        category: 'apartment',
        image: 'http://via.placeholder.com/350X250',
        bedrooms: 3,
        shared: true,
        description: 'very nice apartment',
        dailyRate: 34,
        createAt: '24/12/2017'
      },
      {
        id: '2',
        title: 'Central Apartment',
        city: 'San Francisco',
        street: 'Times Square',
        category: 'apartment',
        image: 'http://via.placeholder.com/350X250',
        bedrooms: 3,
        shared: true,
        description: 'very nice apartment',
        dailyRate: 34,
        createAt: '24/12/2017'
      },
      {
        id: '3',
        title: 'Central Apartment',
        city: 'Paris',
        street: 'Times Square',
        category: 'apartment',
        image: 'http://via.placeholder.com/350X250',
        bedrooms: 3,
        shared: false,
        description: 'very nice apartment',
        dailyRate: 34,
        createAt: '24/12/2017'
      },
      {
        id: '4',
        title: 'Central Apartment',
        city: 'Yaounde',
        street: 'Times Square',
        category: 'condo',
        image: 'http://via.placeholder.com/350X250',
        bedrooms: 3,
        shared: false,
        description: 'very nice apartment',
        dailyRate: 34,
        createAt: '24/12/2017'
      }
    ];
  }
  async cleanDb(){
   await Rental.remove({});
  }
  pushRentalToDb() {
    this.cleanDb();
     this.rentals.forEach((rental) => {
      const newRental = new Rental(rental);
      newRental.save();
    })
  }
  seedDb(){
    this.pushRentalToDb();
  }

}

module.exports= FakeDb;
