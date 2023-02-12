const express = require('express');
const { getAllProfiles, createProfile, updateProfile, deleteProfile, getProfileDetails } = require('../controllers/profileController');
const { isAuthenticatedUser,authorizeRoles } = require('../middleware/auth');
const router = express.Router();


router.route("/profiles").get( getAllProfiles);
router.route("/profiles/new").post(isAuthenticatedUser,createProfile);
router.route("/profiles/:id").put(isAuthenticatedUser,updateProfile).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProfile).get(getProfileDetails);

module.exports = router
