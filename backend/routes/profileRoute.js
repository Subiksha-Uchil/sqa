const express = require("express");
const {
	getAllProfiles,
	getAdminProfiles,
	createProfile,
	updateProfile,
	deleteProfile,
	getProfileDetails,
	createProfileReview,
	getProfileReviews,
	deleteReview,
	getAllProfilesofUser,
} = require("../controllers/profileController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/profiles").get(getAllProfiles);
router
	.route("/admin/profiles")
	.get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProfiles);
router.route("/profile/new").post(isAuthenticatedUser, createProfile);
router.route("/profile/:id").get(getProfileDetails);
router
	.route("/admin/profile/:id")
	.put(isAuthenticatedUser, authorizeRoles("admin"), updateProfile)
	.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProfile);
router.route("/review").put(isAuthenticatedUser, createProfileReview);
router
	.route("/userprofiles/:id")
	.put(isAuthenticatedUser, getAllProfilesofUser);
router
	.route("/reviews")
	.get(getProfileReviews)
	.delete(isAuthenticatedUser, deleteReview);
module.exports = router;
