const User = require('../model/user');
const express = require('express');
const profileRoute = express.Router();
const { AuthSignin } = require("../middleware/AuthSignin");
const { validateProfileEditData} = require('../utils/validator');

profileRoute.get("/profile", AuthSignin, async (req, res) => {
    try {
        const user = req?.user;
        res.send(user)

    }
    catch (err) {
        console.log(err.message, "err")
        res.status(401).send("Error :" + err.message)
    }

})

profileRoute.patch("/profile/edit", AuthSignin, async (req, res) => {
    try {
        validateProfileEditData(req);
        const userId = req.user?._id;
        const user = await User.findByIdAndUpdate(userId, req?.body, { new: true });
        // console.log(user, "user Profile")
        res.status(200).send({ data: user, message: "User Update Successfully" })

    }
    catch (err) {
        res.status(400).send("Error :" + err.message)
    }

})
profileRoute.patch("/users/:id/approve-role", AuthSignin, async (req, res) => {
  try {

    const ALLOWED_ROLE = ["ADMIN"];

    if (!ALLOWED_ROLE.includes(req?.user?.userStatus)) {
      return res.status(403).json({ message: "Not allowed to approve role" });
    }

    const { id } = req.params;
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      {
        userStatus: role,
        isApproved: "ACCEPTED"
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Role approved successfully",
      data: user
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
});

module.exports = profileRoute;
