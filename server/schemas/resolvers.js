const { Order, User, Product, Review, Category } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
        categories: async () => {
            // Finds all categories
            return await Category.find();
        },
        products: async (parent, { category, name }) => {
            const params = {};

            if (category) {
                params.category = category;
            }

            if (name) {
                params.name = {
                    $regex: name,
                  };
            }

            return await Product.find(params).populate('category').populate('reviews');
        },
        product: async (parent, { _id }) => {
            const product = await Product.findById(_id).populate('category').populate('reviews');
            console.log(product);
            return product;
    },
        user: async (parent, args, context) => {
            if(context.user) {
            const user = await User.findById(context.user._id).populate({
                path: 'orders.products',
                populate: 'category',
            });
        
            user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

            return user;
        }
        throw AuthenticationError;
    },
        order: async (parent, { _id }, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.products',
                    populate: 'category'
                });

                return user.orders.id(_id);
            }

            throw AuthenticationError;
        },
        checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            // We map through the list of products sent by the client to extract the _id of each item and create a new Order.
            await Order.create({ products: args.products.map(({ _id }) => _id) });
            const line_items = [];
  
            for (const product of args.products) {
            line_items.push({
                price_data: {
                currency: 'usd',
                product_data: {
                    name: product.name,
                    description: product.description,
                    images: [`${url}/images/${product.image}`],
                },
                unit_amount: product.price * 100,
                },
                quantity: product.purchaseQuantity,
            });
        }
  
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${url}/`,
        });
  
        return { session: session.id };
      },
      review: async (parent, { _id }) => {
        return await Review.findById(_id)
      },
      reviews: async (parent, { userId, productId }, context) => {
        const params = {};

        if(userId) {
            params.userId = userId;
            console.log(params.userId);
        }

        if(productId) {
            params.productId = productId;
            console.log(params.productId);
        }

        return await Review.find(params);
      }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        addOrder: async (parent, { products }, context) => {
            if (context.user) {
                const order = new Order({ products });

                await User.findByIdAndUpdate(context.user._id, {
                    $push: { orders: order },
                });

                return order;
            }
            
            throw AuthenticationError;
        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, {
                    new: true,
                });
            }

            throw AuthenticationError;
        },
        createReview: async (parent, args, context) => {
            if(context.user) {
                return await Review.create(args);
            }
            throw AuthenticationError;
        },
        updateReview: async (parent, args, context) => {
            if(context.user) {
                return await Review.findByIdAndUpdate(context.user._id, args, {
                    new: true,
                });
            }

            throw AuthenticationError;
        },
        updateProduct: async (parent, { _id, quantity }) => {
            const decrement = Math.abs(quantity) * -1;

            return await Product.findByIdAndUpdate(
                _id,
                { $inc: { quantity: decrement } },
                { new: true }
            );
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if(!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        },
    },
};

module.exports = resolvers;