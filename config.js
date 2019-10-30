module.exports = {
    ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    URL: process.env.BASE_URL || 'https://guarded-savannah-22827.herokuapp.com',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://abc1234:abc1234@cluster0-t8dzl.mongodb.net/test?retryWrites=true&w=majority'
}