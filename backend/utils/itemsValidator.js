const validate = require('validator');

const validateItemsCreate = (req, pagename) => {
    const { category, itemname, description, foodType, basePrice, image, name, price } = req.body;
    const numberRegex = /^[0-9]+$/;
    if (!category && pagename === "CategoryMaster") {
        throw new Error("Please Enter Category Name")
    } else if (!itemname) {
        throw new Error("Please Enter Item Name")
    } else if (!description) {
        throw new Error("Please Enter Description")
    } else if (!foodType) {
        throw new Error("Please Select Food Type")
    }
    else if (!["VEG", "NON_VEG", "EGG"].includes(foodType)) {
        throw new Error("Please Select Valid Food Type")
    }
    else if (!numberRegex.test(basePrice)) {
        throw new Error("Please Enter Valid Base Price");
    }
    else if (!image) {
        throw new Error("Please Upload Items Image");
    }
    else if (!name) {
        throw new Error("Please Enter Variant Name");
    }
    else if (!numberRegex.test(price)) {
        throw new Error("Please Enter Valid Variant Price");
    }

}

module.exports = { validateItemsCreate }