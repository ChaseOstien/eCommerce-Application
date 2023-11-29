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
        reviews: Review
    }

    type Review {
        _id: ID
        title: String
        content: String
        productID: ID
        userID: ID
        rating: Float
        createdAt: DateTime
        updatedAt: DateTime
    }
`