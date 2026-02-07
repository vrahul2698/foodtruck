const validate = require('validator');

const validateSignUpData = (req) => {
    const { firstName, lastName, age, gender, phoneNumber, password, emailId, userStatus, photoUrl } = req?.body;

    if (!firstName || !lastName) {
        throw new Error("Please Enter Name")
    }
    else if (!validate.isEmail(emailId)) {
        throw new Error("Please Enter Valid Email ID")
    }
  

}
const validateProfileEditData = (req) => {

        const ALLOWED_EDIT_FIELDS = ['firstName', 'lastName', 'password', 'gender', 'photoUrl'];
        const checkingUserDetails = Object.keys(req?.body).every(field => ALLOWED_EDIT_FIELDS?.includes(field));
        if (!checkingUserDetails) {
            throw new Error("Invalid Fields")
        }

}

module.exports = {
    validateSignUpData,
    validateProfileEditData
}