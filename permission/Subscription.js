const common = require('../libs/common'),
    subscriptionModel = require(common.routing('models', 'Subscription.js')),
    userModel = require(common.routing('models', 'User.js'));

// simple middleware to check user subscription
const checkSubscription = (req, res, next) => {
    return next();
    // userModel.findOne({_id: req.userObj._userId}).then((user) => {
    //     if (!user) { return reject({message: 'Invalid User'})};
    //     subscriptionModel.findOne({_companyId: user._companyId, active: true}).then((subscription) => {
    //         if (!subscription) { return reject({message: 'Invalid Subscription'});}
    //         else
    //             return next();
    //     }).catch((err) => {
    //         common.fail(res, err.message);
    //     });
    // }).catch((err) => {
    //     common.fail(res, err.message);
    // });
};

module.exports = { checkSubscription };
