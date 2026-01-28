const validate = require('validator');

const validateSignUpData = (req) => {
    const { firstName, lastName, age, gender, phoneNumber, password, emailId, userStatus } = req?.body;

    if (!firstName || !lastName) {
        throw new Error("Please Enter Name")
    }
    else if (!validate.isEmail(emailId)) {
        throw new Error("Please Enter Valid Email ID")
    }
    else if (!validate.isStrongPassword(password)) {
        throw new Error("Please Enter Strong Password")
    }

}

module.exports = {
    validateSignUpData
}