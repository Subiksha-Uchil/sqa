const Profile = require("../models/profileModel");
const ErrorHandler = require("../utils/errorhandler");
const Users = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
//const getResetPasswordToken = reqire("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const crypto = require('crypto');

//register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    const users = await Users.create({
        name,
        email,
        password,
        avatar: {
            public_id: "this is a sample id",
            url: "profilepicUrl"
        },
    });

    sendToken(users,201,res);
});


//login user

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
  
    // checking if user has given password and email both
  
    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email & Password", 400));
    }
  
    const users = await Users.findOne({ email }).select("+password");
  
    if (!users) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
  
    const isPasswordMatched = await users.comparePassword(password);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
  }
  
  sendToken(users,200,res);
    
});
  

//logout user

exports.logout = catchAsyncError(async(req, res, next) => {
  
  res.cookie("token", null, {
    expire: new Date(Date.now()),
    httpOnly: true,
  })

  res.status(200).json({
    sucess: true,
    message: "logged out successfully",
  });
});

//forget password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const users = await Users.findOne({ email: req.body.email });

  if (!users) {
    return next(new ErrorHandler("User not found", 404));
  }

  const resetToken = users.getResetPasswordToken();

  await users.save({ validateBeforeSave: false });
  const resetpasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
  const message = `Your password reset was successfully generated:- \n\n${resetpasswordUrl}\n\nIf you have not requested a password reset, please ignore this message`;
  try {
    await sendEmail({
      email: users.email,
      subject: `Sakhi Password Recovery`,
      message,

    });
    res.status(200).json({
      sucess: true,
      message: `Email sent to ${users.email} sucessfully`
    })


  } catch (error) {
    users.resetPasswordToken = undefined;
    users.resetPasswordExpire = undefined;
    await users.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message,500))
    }
});

//reset password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  
  //creating token hash
  const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
    .digest("hex");
  
  const users = await Users.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!users) {
    return next(new ErrorHandler("Reset Password Token is invalid or has been expired",400));
  }

  if (req.body.password !== req.body.confirmPassword) { 
    return next(new ErrorHandler("Password doesn't match",400));
  }
  
  users.password = req.body.password;
  users.resetPasswordToken = undefined;
  users.resetPasswordExpire = undefined;

  await users.save();
  
  sendToken(users, 200, res);
});

//get user details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await Users.findById(req.user.id);

  res.status(200).json({
    sucess: true,
    user,
  });
});

//update user password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await Users.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) { 
    return next(new ErrorHandler("Password doesn't match",400));
  }

  user.password = req.body.newPassword;
   await user.save();

  sendToken(user,200,res);
});
  
//update user profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  }

 //we will add cloudinary later
  const user = await Users.findOneAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindandModify: false,
  });

  res.status(200).json({
    sucess: true,
  });
});

//get all users
exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const user = await Users.find();

  res.status(200).json({
    sucess: true,
    user,
  })
 });






//get single user profiles(admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await Users.findById(req.params.id);


  if (!user) {
    return next(new ErrorHandler(`User does not exist!!! ${req.params.id}`));
  }

  res.status(200).json({
    sucess: true,
    user,
  })
 });

//admin update user role
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  }

   await Users.findOneAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindandModify: false,
  });

  res.status(200).json({
    sucess: true,
  });
});

//delete user

exports.deleteUser = catchAsyncError(async (req, res, next) => {

 //we will remove cloudinary later
  const user = await Users.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`));
  }

  await Users.remove();

  res.status(200).json({
    sucess: true,
    message:"User Deleted Sucessfully!"
  });
});
 