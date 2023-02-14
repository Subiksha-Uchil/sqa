const express = require('express');
const { getAllProfiles, createProfile, updateProfile, deleteProfile, getProfileDetails, createProfileReview, getProfileReviews, deleteReview } = require('../controllers/profileController');
const { isAuthenticatedUser,authorizeRoles } = require('../middleware/auth');
const router = express.Router();


router.route("/profiles").get( getAllProfiles);
router.route("/profiles/new").post(isAuthenticatedUser,createProfile);
router.route("/profiles/:id").put(isAuthenticatedUser,updateProfile).get(getProfileDetails);
router.route("/admin/profiles/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProfile);
router.route("/review").put(isAuthenticatedUser, createProfileReview);
router.route("/reviews").get(getProfileReviews).delete(isAuthenticatedUser,deleteReview);
module.exports = router
