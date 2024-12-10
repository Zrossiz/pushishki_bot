const { calculateHash } = require("../utils/calculateHash")

const checkHash = async (req, res, next) => {
    try {
        const bodyString = JSON.stringify(req.body);
        const computedHash = await calculateHash(bodyString);
    
        if (bodyString !== computedHash) {
            return res.sendStatus(401)
        }
    
        next();
    } catch (err) {
        console.log(err);
        return res.status(500)
    }
}

module.exports = checkHash