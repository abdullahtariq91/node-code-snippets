// define urls a specific user role can access
const _accessList = [
    {
        roles: 'a',
        allows: [
            { resources: [
            ], permissions: '*' },
        ]
    },
    {
        roles: 'b',
        allows: [
            { resources: [
            ], permissions: '*' },
        ]
    },
    {
        roles: 'c',
        allows: [
            { resources: [
            ], permissions: '*' },
        ]
    },
    {
        roles: 'd',
        allows: [
            { resources: [
            ], permissions: '*' },
        ]
    }
];


module.exports = {
    _accessList
};
