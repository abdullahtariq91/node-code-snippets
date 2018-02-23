let common = require('./common.js');

// functions to retrieve user details for further authentication
const getUserId = (val) => {
    return new Promise((resolve, reject) => {
        let descToken = decrypt(val);
        let userId = require('jwt-simple').decode(descToken,
            require(common.routing('configurations', 'key.js')).password);
        if(!(require('mongoose').Types.ObjectId.isValid(userId))){
            return reject({message: 'Invalid token'});
        }
        return resolve(userId);
    });
};

const getUserRoleType = (roleId) => {
    return new Promise((resolve, reject) => {
        require(common.routing('models', 'Role.js')).findOne({_id: roleId}).then((role) => {
            if(!role) return reject({message: common.routing('configurations', 'text.js').dbError});
            return resolve(role);
        }).catch(() => {
            return reject({message: common.routing('configurations', 'text.js').dbError});
        });
    });
};

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        require(common.routing('models', 'User.js')).findOne({_id: id, status: 'active'}).then((user) => {
            if(!user || user._id == undefined){
                reject({message: 'Fail get user'});
            }
            getUserRoleType(user._roleId).then((role) => {
                return resolve({user: user, role: role});
            }).catch(() => {
                return reject({message: common.routing('configurations', 'text.js').dbError});
            });
        }).catch(() => {
            return reject({message: common.routing('configurations', 'text.js').dbError});
        });
    });
};

const getUserDetail = (userId) => {
    return new Promise((resolve, reject) => {
        require(common.routing('models', 'UserDetail.js')).findOne({_userId: userId}).then((data) => {
            if(!data || data._id === undefined){
                return reject({message: 'Fail get account id and information'});
            }
            return resolve(data);
        }).catch(() => {
            return reject({message: common.routing('configurations', 'text.js').dbError});
        });
    });
};

const encrypt = (userId) => {
    const ENCRYPTION_KEY = require('../configurations/key').value;
    const IV_LENGTH = 16;

    let iv = require('crypto').randomBytes(IV_LENGTH);
    let cipher = require('crypto').createCipheriv(require('../configurations/key').algorithm,
        new Buffer(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(userId);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
};

const decrypt = (text) => {
    const ENCRYPTION_KEY = require('../configurations/key').value;

    let textParts = text.split(':');
    let iv = new Buffer(textParts.shift(), 'hex');
    let encryptedText = new Buffer(textParts.join(':'), 'hex');
    let decipher = require('crypto').createDecipheriv(require('../configurations/key').algorithm,
        new Buffer(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
};

const authenticating = (req, res, next) => {
    if(!(req.headers['authorization'])){
        common.fail(res, 'Missing authorization in request header');
    } else {
        //TODO: Authorization --- [token-type] [token]
        let val = req.headers['authorization'].split(" ");
        getUserId(val[1]).then( (userId) => {
            getUser(userId).then( (data) => {
                req.userId = data.user._id.toString();
                req.userRoleName = data.role.name;
                req.userRoleCode = data.role.code;
                getUserDetail(req.userId).then((userDetail) => {
                    req.userObj = userDetail;
                    return next();
                }).catch( (err) => {
                    common.fail(res, err.message);
                });
            }).catch((err) => {
                common.fail(res, err.message);
            });
        }).catch( (err) => {
            common.fail(res, err.message);
        });
    }
};

module.exports = {
    authenticating, encrypt, getUser, getUserId
};
