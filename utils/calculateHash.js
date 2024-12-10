exports.calculateHash = async (message) => {
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(message).digest('hex');
}