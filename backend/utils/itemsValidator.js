const validate = require('validator');

// MENU CATEGORY
const validateMenuCategoryCreate = (req) => {
    const { category } = req.body;
    if (!category && pagename === "CategoryMaster") {
        throw new Error("Please Enter Category Name")
    }

}
const AllowedMenuCategoryFields = (req) => {
    const { category } = req.body;
    const AllowedFields = ["category"];
            const checkingItemsCategoryDetails = Object.keys(req?.body).every(field => AllowedFields?.includes(field));

    if (!checkingItemsCategoryDetails) {
         throw new Error("Invalid Fields")
    }
    else if (!category) {
        throw new Error("Please Enter Category Name")
    }

}

// MENU ITEMS
const validateMenuItemsCreate = (req) => {
    const { itemname, description, foodType, basePrice, image } = req.body;
    console.log(req.body  ,"req.body")
    const numberRegex = /^[0-9]+$/;
    if (!itemname) {
        throw new Error("Please Enter Item Name")
    } else if (!description) {
        throw new Error("Please Enter Description")
    } else if (!foodType) {
        throw new Error("Please Select Food Type")
    }
    else if (!["VEG", "NON_VEG", "EGG"].includes(foodType)) {
        throw new Error("Please Select Valid Food Type")
    }
    else if (!basePrice) {
        throw new Error("Please Enter Base Price")
    }
    else if (!numberRegex.test(basePrice)) {
        throw new Error("Please Enter Valid Base Price");
    }
    else if (!image) {
        throw new Error("Please Upload Items Image");
    }

}
const validateMenuVariantsCreate = (req) => {
    const { name, price } = req.body;
    const numberRegex = /^[0-9]+$/;
    if (!name) {
        throw new Error("Please Enter Variant Name");
    }
    else if (!numberRegex.test(price)) {
        throw new Error("Please Enter Valid Variant Price");
    }

}

module.exports = { validateMenuCategoryCreate,AllowedMenuCategoryFields, validateMenuItemsCreate, validateMenuVariantsCreate }