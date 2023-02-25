const express = require('express');
const { getAllProfiles, createProfile, updateProfile, deleteProfile, getProfileDetails, createProfileReview, getProfileReviews, deleteReview } = require('../controllers/profileController');
const { isAuthenticatedUser,authorizeRoles } = require('../middleware/auth');
const router = express.Router();


router.route("/profiles").get( getAllProfiles);
router.route("/profile/new").post(isAuthenticatedUser,createProfile);
router.route("/profile/:id").put(isAuthenticatedUser,updateProfile).get(getProfileDetails);
router.route("/admin/profile/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProfile);
router.route("/review").put(isAuthenticatedUser, createProfileReview);
router.route("/reviews").get(getProfileReviews).delete(isAuthenticatedUser,deleteReview);
module.exports = router
