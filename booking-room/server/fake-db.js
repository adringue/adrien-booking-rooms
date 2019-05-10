const Rental = require('./models/rental');
const User=  require('./models/user');
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
    this.users=[{
      username: "Test User",
      email: "test@gmail.com",
      password: "testtest"
    },
    {
      username: "Test User1",
      email: "test1@gmail.com",
      password: "testtest1"
    }
  ];
  }
  async cleanDb(){
   await User.remove({});
   await Rental.remove({});
  }
  pushDataToDb() {
    // this.cleanDb();
    const user=new User(this.users[0]);
    const user2=new User(this.users[1]);

     this.rentals.forEach((rental) => {
      const newRental = new Rental(rental);
      newRental.user=user;
      user.rentals.push(newRental);
      newRental.save();
    });
    user.save();
    user2.save();
  }
  async seedDb(){
    await this.cleanDb();
    this.pushDataToDb();
  }

}

module.exports= FakeDb;
