const common = require('../libs/common');

// functions to check if user is allowed access based on user role
const checkerFunction = (userId, resource, action) => {
    return new Promise((resolve, reject) => {
        ACL.isAllowed(userId, resource, action, (err, result) => {
            if(err) { return reject(err.message)};
            if(result === false) {
                let err = new Error('User does not have enough permission');
                return reject(err.message);
            }
            resolve(true);
        });
    });
};

const accessChecker = (req, res, next ) => {
    let resource = (req.accessUrl === undefined) ? req.originalUrl : req.accessUrl;
    let action = req.method.toLowerCase();
    ACL.isAllowed(req.userId, resource, action, (err, result) => {
        if (err) common.fail(res, err.message);
        else {
            if (result) next();
            else {
                let denny = new Error('User does not have enough permission');
                common.fail(res, denny.message);
            }
        }
    });
};

module.exports = { checkerFunction, accessChecker };
