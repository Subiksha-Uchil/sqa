const { response } = require("../app");
const Profile = require("../models/profileModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");


//create profile--admin
exports.createProfile = catchAsyncError(async (req, res, next) => {

    req.body.user = req.user.id;
    const profile = await Profile.create(req.body);

    res.status(201).json({
        sucess: true,
        profile
    });
});


//get all profile

exports.getAllProfiles = catchAsyncError(async (req, res) => {

    const resultPerPage = 5;
    const profileCount = await Profile.countDocuments();
    const Apifeature = new ApiFeatures(Profile.find(), req.query).search().filter().pagination(resultPerPage);
    
    const profile = await Apifeature.query;
    res.status(200).json({
        sucess: true,
        profile,
        profileCount,
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
        profile
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
        useFindandModify: false
    });

    res.status(200).json({
        sucess: true,
        profile
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
        message: 'Profile successfully removed',
    });
});


//create new review or update a review
exports.createProfileReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, profileId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const profile = await Profile.findById(profileId);
  
    const isReviewed = profile.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      profile.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      profile.reviews.push(review);
      profile.numOfReviews = profile.reviews.length;
    }
  
    let avg = 0;
  
    profile.reviews.forEach((rev) => {
      avg += rev.rating;
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