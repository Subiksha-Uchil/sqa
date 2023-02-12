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





