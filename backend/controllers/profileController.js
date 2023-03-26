const { response } = require("../app");
const Profile = require("../models/profileModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

//create profile
exports.createProfile = catchAsyncError(async (req, res, next) => {
	let images = [];

	if (typeof req.body.images === "string") {
		images.push(req.body.images);
	} else {
		images = req.body.images;
	}

	const imagesLinks = [];

	for (let i = 0; i < images.length; i++) {
		const result = await cloudinary.v2.uploader.upload(images[i], {
			folder: "profiles",
		});

		imagesLinks.push({
			public_id: result.public_id,
			url: result.secure_url,
		});
	}

	req.body.images = imagesLinks;
	req.body.users = req.user.id;

	const profile = await Profile.create(req.body);

	res.status(201).json({
		success: true,
		profile,
	});
});
//get all profile

exports.getAllProfiles = catchAsyncError(async (req, res, next) => {
	const resultPerPage = 5;
	const profilesCount = await Profile.countDocuments();
	const Apifeature = new ApiFeatures(Profile.find(), req.query)
		.search()
		.filter();
	let profiles = await Apifeature.query;
	let filteredProfilesCount = profiles.length;

	Apifeature.pagination(resultPerPage);

	profiles = await Apifeature.query.clone();
	res.status(200).json({
		success: true,
		profiles,
		profilesCount,
		resultPerPage,
		filteredProfilesCount,
	});
});

// Get All Product (Admin)
exports.getAdminProfiles = catchAsyncError(async (req, res, next) => {
	const profiles = await Profile.find();

	res.status(200).json({
		success: true,
		profiles,
	});
});

//get single profile details
exports.getProfileDetails = catchAsyncError(async (req, res, next) => {
	const profile = await Profile.findById(req.params.id);

	if (!profile) {
		return next(new ErrorHandler("Profile Not found", 404));
	}
	res.status(200).json({
		sucess: true,
		profile,
	});
});

//update profile--admin
exports.updateProfile = catchAsyncError(async (req, res, next) => {
	let profile = await Profile.findById(req.params.id);

	if (!profile) {
		return next(new ErrorHandler("Profile Not found", 404));
	}

	profile = await Profile.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindandModify: false,
	});

	res.status(200).json({
		sucess: true,
		profile,
	});
});

//delete profile
exports.deleteProfile = catchAsyncError(async (req, res, next) => {
	const profile = await Profile.findById(req.params.id);

	if (!profile) {
		return next(new ErrorHandler("Profile Not found", 404));
	}
	await profile.remove();

	res.status(200).json({
		sucess: true,
		message: "Profile successfully removed",
	});
});

//create new review or update a review
exports.createProfileReview = catchAsyncError(async (req, res, next) => {
	const { ratings, comment, profileId } = req.body;

	const review = {
		users: req.user._id,
		name: req.user.name,
		ratings: Number(ratings),
		comment,
	};

	const profile = await Profile.findById(profileId);

	const isReviewed = profile.reviews.find(
		(rev) => rev.user.toString() === req.user._id.toString()
	);

	if (isReviewed) {
		profile.reviews.forEach((rev) => {
			if (rev.user.toString() === req.user._id.toString())
				(rev.ratings = ratings), (rev.comment = comment);
		});
	} else {
		profile.reviews.push(review);
		profile.numOfReviews = profile.reviews.length;
	}

	let avg = 0;

	profile.reviews.forEach((rev) => {
		avg += rev.ratings;
	});

	profile.ratings = avg / profile.reviews.length;

	await profile.save({ validateBeforeSave: false });

	res.status(200).json({
		success: true,
	});
});

//get all reviews of a profile
exports.getProfileReviews = catchAsyncError(async (req, res, next) => {
	const profile = await Profile.findById(req.query.id);

	if (!profile) {
		return next(new ErrorHandler("Profile not found", 404));
	}

	res.status(200).json({
		success: true,
		reviews: profile.reviews,
	});
});

// Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
	const profile = await Profile.findById(req.query.profileId);

	if (!profile) {
		return next(new ErrorHandler("Profile not found", 404));
	}

	const reviews = profile.reviews.filter(
		(rev) => rev._id.toString() !== req.query.id.toString()
	);

	let avg = 0;

	reviews.forEach((rev) => {
		avg += rev.ratings;
	});

	let ratings = 0;

	if (reviews.length === 0) {
		ratings = 0;
	} else {
		ratings = avg / reviews.length;
	}

	const numOfReviews = reviews.length;

	await Profile.findByIdAndUpdate(
		req.query.profileId,
		{
			reviews,
			ratings,
			numOfReviews,
		},
		{
			new: true,
			runValidators: true,
			useFindAndModify: false,
		}
	);

	res.status(200).json({
		success: true,
	});
});
