const db = require('./connection');
const { User, Product, Category, Review } = require('../models');
const cleanDB = require('./cleanDB');
const { faker } = require('@faker-js/faker');
// import { faker } from '@faker-js/faker';

db.once('open', async () => {
  await cleanDB('Category', 'categories');
  await cleanDB('Product', 'products');
  await cleanDB('User', 'users');

  const categories = await Category.insertMany([
    { name: 'Food' },
    { name: 'Household Supplies' },
    { name: 'Electronics' },
    { name: 'Books' },
    { name: 'Toys' }
  ]);

  console.log('categories seeded');

  const products = await Product.insertMany([
    {
      name: 'Tin of Cookies',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cookie-tin.jpg',
      category: categories[0]._id,
      price: 2.99,
      quantity: 500,
    },
    {
      name: 'Canned Coffee',
      description:
        'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.',
      image: 'canned-coffee.jpg',
      category: categories[0]._id,
      price: 1.99,
      quantity: 500
    },
    {
      name: 'Toilet Paper',
      category: categories[1]._id,
      description:
        'Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.',
      image: 'toilet-paper.jpg',
      price: 7.99,
      quantity: 20
    },
    {
      name: 'Handmade Soap',
      category: categories[1]._id,
      description:
        'Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.',
      image: 'soap.jpg',
      price: 3.99,
      quantity: 50
    },
    {
      name: 'Set of Wooden Spoons',
      category: categories[1]._id,
      description:
        'Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.',
      image: 'wooden-spoons.jpg',
      price: 14.99,
      quantity: 100
    },
    {
      name: 'Camera',
      category: categories[2]._id,
      description:
        'Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex. Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, tellus at pulvinar venenatis, erat augue cursus erat, eu ullamcorper eros lectus ultrices ipsum. Integer rutrum, augue vitae auctor venenatis, turpis turpis elementum orci, at sagittis risus mi a leo.',
      image: 'camera.jpg',
      price: 399.99,
      quantity: 30
    },
    {
      name: 'Tablet',
      category: categories[2]._id,
      description:
        'In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.',
      image: 'tablet.jpg',
      price: 199.99,
      quantity: 30
    },
    {
      name: 'Tales at Bedtime',
      category: categories[3]._id,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.',
      image: 'bedtime-book.jpg',
      price: 9.99,
      quantity: 100
    },
    {
      name: 'Spinning Top',
      category: categories[4]._id,
      description: 'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',
      image: 'spinning-top.jpg',
      price: 1.99,
      quantity: 1000
    },
    {
      name: 'Set of Plastic Horses',
      category: categories[4]._id,
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      image: 'plastic-horses.jpg',
      price: 2.99,
      quantity: 1000
    },
    {
      name: 'Teddy Bear',
      category: categories[4]._id,
      description:
        'Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.',
      image: 'teddy-bear.jpg',
      price: 7.99,
      quantity: 100
    },
    {
      name: 'Alphabet Blocks',
      category: categories[4]._id,
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      image: 'alphabet-blocks.jpg',
      price: 9.99,
      quantity: 600
    }
  ]);

  console.log('Products Seeded');

  const reviews = await Review.insertMany([
    {
        title: 'These cookies are so good!',
        content: 'I always order these cookies and I eat them with milk! They are also the best when you warm them up.',
        productId: products[0]._id,
        userId: '6577bd7bc56bb834d9a90b4a',
        rating: 9
    },
    {
        title: "Don't buy!",
        content: 'Do not buy this canned coffee, it is not good!.',
        productId: products[1]._id,
        userId: '6577bd7bc56bb834d9a90b4a',
        rating: 2
    },
    {
        title: 'This stuff rocks!',
        content: 'This toilet paper is soft and strong. A little bit goes a long way.',
        productId: products[2]._id,
        userId: '6577bd7bc56bb834d9a90b4a',
        rating: 10
    },{
        title: 'Smells awesome!',
        content: 'This handmade soap smells awesome and makes your hands soft. Highly recomend!',
        productId: products[3]._id,
        userId: '6577bd7bc56bb834d9a90b4a',
        rating: 9
    },
    {
        title: "It's a set of wooden spoons.",
        content: 'There is nothing extraordinary about these. They just scoop things like a spoon should.',
        productId: products[4]._id,
        userId: '6577bd7bc56bb834d9a90b4a',
        rating: 5
    },
    {
        title: 'The best camera on the market!',
        content: 'This is hands down the best camera on the market! I would recomend this for beginers and experts!',
        productId: products[5]._id,
        userId: '6577bd7bc56bb834d9a90b4f',
        rating: 10
    },
    {
        title: 'No thank you',
        content: 'This tablet does not have enough storage space and the screen is pixelated.',
        productId: products[6]._id,
        userId: '6577bd7bc56bb834d9a90b4f',
        rating: 2
    },
    {
        title: 'My kids love this book!',
        content: 'My kids absolutely love this book and want to read it every night.',
        productId: products[7]._id,
        userId: '6577bd7bc56bb834d9a90b4f',
        rating: 9
    },
    {
        title: 'It spins!',
        content: 'This top actually spins like the description says it does!',
        productId: products[8]._id,
        userId: '6577bd7bc56bb834d9a90b4f',
        rating: 5
    },
    {
        title: 'Could have done more.',
        content: 'The designers could have done a lot more with this set of wooden horses.',
        productId: products[9]._id,
        userId: '6577bd7bc56bb834d9a90b4f',
        rating: 3
    }
]);

console.log('Reviews Seeded');

  const users = await User.create([
    {
    _id: '6577bd7bc56bb834d9a90b4a',
    firstName: 'Chase',
    lastName: 'Ostien',
    email: 'test@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ],
  },
  {
    _id: '6577bd7bc56bb834d9a90b4f',
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345',
    orders: [
        {
          products: [products[0]._id, products[0]._id, products[1]._id]
        }
      ],
    }
]);

await Promise.all([
    Review.updateOne({ _id: reviews[0]._id }, { userId: users[0]._id, productId: products[0]._id }),
    Review.updateOne({ _id: reviews[1]._id }, { userId: users[0]._id, productId: products[1]._id }),
    Review.updateOne({ _id: reviews[2]._id }, { userId: users[0]._id, productId: products[2]._id }),
    // ... (similar updates for the second user's reviews)
    Review.updateOne({ _id: reviews[3]._id }, { userId: users[1]._id, productId: products[3]._id }),
    Review.updateOne({ _id: reviews[4]._id }, { userId: users[1]._id, productId: products[4]._id }),
    Review.updateOne({ _id: reviews[5]._id }, { userId: users[1]._id, productId: products[5]._id }),
    User.updateOne({ _id: users[0]._id }, { reviews: [reviews[0]._id, reviews[1]._id, reviews[2]._id] }),
    User.updateOne({ _id: users[1]._id }, { reviews: [reviews[3]._id, reviews[4]._id, reviews[5]._id] }),
    Product.updateOne({ _id: products[0]._id }, { reviews: [reviews[0]._id] }),
    Product.updateOne({ _id: products[1]._id }, { reviews: [reviews[1]._id] }),
    Product.updateOne({ _id: products[2]._id }, { reviews: [reviews[2]._id] }),
    Product.updateOne({ _id: products[3]._id }, { reviews: [reviews[3]._id] }),
    Product.updateOne({ _id: products[4]._id }, { reviews: [reviews[4]._id] }),
    Product.updateOne({ _id: products[5]._id }, { reviews: [reviews[5]._id] }),
    Product.updateOne({ _id: products[6]._id }, { reviews: [reviews[6]._id] }),
    Product.updateOne({ _id: products[7]._id }, { reviews: [reviews[7]._id] }),
    Product.updateOne({ _id: products[8]._id }, { reviews: [reviews[8]._id] }),
    Product.updateOne({ _id: products[9]._id }, { reviews: [reviews[9]._id] }),
]);

// reviews: [
//     {
//     _id: reviews[0]._id,
//     userId: '6577bd7bc56bb834d9a90b4a',
//     productId: products[0]._id,
//     },
//     {
//     _id: reviews[1]._id,
//     userId: '6577bd7bc56bb834d9a90b4a',
//     productId: products[1]._id,
//     },
//     {
//     _id: reviews[2]._id,
//     userId: '6577bd7bc56bb834d9a90b4a',
//     productId: products[2]._id,
//     }
// ]

// reviews: [
//     {
//         _id: reviews[3]._id,
//         userId: '6577bd7bc56bb834d9a90b4f',
//         productId: products[3]._id,
//         },
//         {
//         _id: reviews[4]._id,
//         userId: '6577bd7bc56bb834d9a90b4f',
//         productId: products[4]._id,
//         },
//         {
//         _id: reviews[5]._id,
//         userId: '6577bd7bc56bb834d9a90b4f',
//         productId: products[5]._id,
//         }
// ]

  console.log('users seeded');

  process.exit();
});