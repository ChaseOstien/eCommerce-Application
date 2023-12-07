const typeDefs = `
    type Category {
        _id: ID
        name: String
    }

    type Product {
        _id: ID
        name: String
        description: String
        image: String
        quantity: Int
        price: Float
        category: Category
        reviews: [Review]
    }

    type Review {
        _id: ID
        title: String
        content: String
        productID: ID
        userID: ID
        rating: Float
        createdAt: String
        updatedAt: String
    }

    type Order {
        _id: ID
        purchaseDate: String
        products: [Product]
    }

    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        phoneNumber: String
        password: String
        orders: [Order]
        reviews: [Review]
    }

    type Checkout {
        session: ID
    }

    type Auth {
        token: ID
        user: User
    }

    input ProductInput {
        _id: ID
        purchaseQuantity: Int
        name: String
        image: String
        price: Float
        quantity: Int
    }

    type Query {
        categories: [Category]
        products(category: ID, name: String): [Product]
        product(_id: ID!): Product
        user: User
        order(_id: ID!): Order
        checkout(products: [ProductInput]): Checkout
        reviews(User: ID): [Review]
    }

    interface MutationResponse {
        code: String!
        success: Boolean!
        message: String!
    }

    type Mutation {
        addUser(firstName: String!, lastName: String!, email: String!, phoneNumber: String!, password: String!): Auth
        addOrder(products: [ID!]): Order
        updateUser(firstName: String, lastName: String, email: String, phoneNumber: String, password: String): User
        createReview(title: String!, content: String!, rating: Float!): Review
        updateReview(title: String!, content: String!, rating: Float!): Review
        updateProduct(_id: ID!, name: String, description: String, quantity: Int, price: Float): Product
        login(email: String!, password: String!): Auth
    }

    type addUserMutationResponse {
        code: String!
        success: Boolean!
        message: String!
        auth: Auth
    }

    type addOrderMutationResponse {
        code: String!
        success: Boolean!
        message: String!
        order: Order
    }

    type updateUserMutationResponse {
        code: String!
        success: Boolean!
        message: String!
        user: User
    }

    type createReviewMutationResponse {
        code: String!
        success: Boolean!
        message: String!
        review: Review
    }

    type updateReviewMutationResponse {
        code: String!
        success: Boolean!
        message: String!
        review: Review
    }

    type updateProductMutationResponse {
        code: String!
        success: Boolean!
        message: String!
        product: Product
    }

    type loginMutationResponse {
        code: String!
        success: Boolean!
        message: String!
        auth: Auth
    }
`;

module.exports = typeDefs;