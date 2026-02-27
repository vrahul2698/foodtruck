const validate = require("validator")

const RestaurantCheck = (req, role) => {
        console.log(req, 'Request');

        const AllowedRoles = ["VENDOR", "ADMIN"];
        const userStatus = role;
        const { name, description, cuisines, restaurantImage, contact, address, resOwnerId, isOpened } = req;
        console.log("ADDRESS:", address);
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
}



const ValidateRestaurantEditFields = (req) => {
    const restaurant = req.body;
    const AllowedEditFields = ['description', 'cuisines', 'restaurantImage', 'contact', 'address'];
    const checkRestaurantDetails = Object.keys(restaurant).every(field => AllowedEditFields.includes(field));

    if (!checkRestaurantDetails) {
        throw new Error("Invalid Fields")
    }
}

module.exports = {
    RestaurantCheck, ValidateRestaurantEditFields
}