module.exports = {
    database: {
        development : 'mongodb://127.0.0.1:27017/database-name',
        production  : ''
    },
    role: [
        {
            name: 'Super Admin',
            code: 'a'
        },
        {
            name: 'Small Admin',
            code: 'b'
        },
        {
            name: 'Company User',
            code: 'c'
        },
        {
            name: 'Private User',
            code: 'd'
        }
    ]
};
