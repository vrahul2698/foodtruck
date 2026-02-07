const validate = require("validator")

const RestaurantCheck = async (req, res, next) => {
    try {
        // console.log(req?.user, req?.body, 'Request');

        const AllowedRoles = ["VENDOR", "ADMIN"];
        const userStatus = req?.user?.userStatus;
        const { name, description, ownerId, cuisines, restaurantImage, contact, address, rating } = req?.body;
        const phoneRegex = /^[0-9]{10}$/;
        const pincodeRegex = /^[0-9]{6}$/;
        if (!AllowedRoles?.includes(userStatus)) {
            throw new Error("Only vendor or admin allowed")
        }
        else if (!name) {
            throw new Error("Please Enter Name")
        }
        else if (!description) {
            throw new Error("Please Enter Description")
        }
        else if (contact?.email && !validate.isEmail(contact?.email)) {
            throw new Error("Please Enter Valid Email ID")
        }
        else if (contact?.phone && !phoneRegex.test(contact?.phone)) {
            throw new Error("Please Enter Valid 10 digit mobile number")
        }
        else if (!address) {
            throw new Error("Please Enter Addrress Detais")
        }
        else if (address && !address?.line1) {
            throw new Error("Please Enter Line 1")
        }
        else if (address && !address?.city) {
            throw new Error("Please Enter City")
        }
        else if (address && !address?.state) {
            throw new Error("Please Enter State")
        }
        else if (address && !pincodeRegex.test(address?.pincode)) {
            throw new Error("Please Enter Valid pincode")
        }

        next();
    }
    catch (err) {
        res.status(400).send("Error 1: " + err.message)
    }
}

const AllowedRoles = async (req, res, next) => {
    try{
        const allowedRoles = ["VENDOR", "ADMIN"];
        if(!allowedRoles?.includes(req?.user?.userStatus)){
            throw new Error("Access denied")
        }
        next();
    }
    catch(err){
       res.status(400).send("Error 1: " + err.message)
    }
    
}

module.exports = {
    RestaurantCheck,AllowedRoles
}