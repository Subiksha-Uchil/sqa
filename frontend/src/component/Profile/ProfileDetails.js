import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProfileDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
	clearErrors,
	newReview,
	getProfileDetails,
} from "../../actions/profileAction";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/profileConstants";

import DialogContentText from "@mui/material/DialogContentText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { red } from "@material-ui/core/colors";

const ProfileDetails = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const alert = useAlert();

	const { profile, loading, error } = useSelector(
		(state) => state.profileDetails
	);
	const { success, error: reviewError } = useSelector(
		(state) => state.newReview
	);

	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	const options = {
		edit: false,
		color: "rgba(20,20,20,0.2)",
		activeColor: "lavendar",
		size: window.innerWidth < 600 ? 20 : 25,
		value: profile.ratings,
		isHalf: true,
	};

	const { isAuthenticated, users } = useSelector((state) => state.users);

	const [openReview, setOpenReview] = useState(false);
	const [openContact, setOpenContact] = useState(false);
	const [ratings, setRating] = useState(0);
	const [comment, setComment] = useState("");

	const submitReviewToggle = () => {
		if (!isAuthenticated) {
			alert.show("Login/SignUp to access this resource");
		} else {
			openReview ? setOpenReview(false) : setOpenReview(true);
		}
	};

	const handleClose = () => {
		setOpenContact(false);
	};

	const reviewSubmitHandler = () => {
		const myForm = new FormData();

		myForm.set("ratings", ratings);
		myForm.set("comment", comment);
		myForm.set("profileId", id);

		dispatch(newReview(myForm));

		setOpenReview(false);
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (reviewError) {
			alert.error(reviewError);
			dispatch(clearErrors());
		}

		if (success) {
			alert.success("Review Submitted Successfully!!!");
			dispatch({ type: NEW_REVIEW_RESET });
		}

		dispatch(getProfileDetails(id));
	}, [dispatch, id, error, alert]);
	const contactInfo = () => {
		if (!isAuthenticated) {
			alert.show("Login/SignUp to access this resource");
		} else {
			setOpenContact(true);
		}
	};

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<MetaData title={`${profile.name}-----Sakhi Portal`} />
					<div className="ProfileDetails">
						<Carousel>
							{profile.images &&
								profile.images.map((item, i) => (
									<img
										className="CarouselImage"
										key={item.url}
										src={item.url}
										alt={`${i}Slide`}
									/>
								))}
						</Carousel>

						<div>
							<div className="detailsBlock-1">
								<h1>{profile.name}</h1>
								<p>Profile #{profile._id}</p>
							</div>
							<div className="detailsBlock-2">
								<ReactStars {...options} />
								<span>({profile.numOfReviews} Reviews)</span>
							</div>
							<div className="detailsBlock-3">
								<p>{`${profile.experience} years of experience`}</p>

								<h2>{`Expected Salary: ${profile.salary}`}</h2>
								<p>All salaries are calculated per day basis.</p>
								<h2>{`Preferred Location:${profile.location}`}</h2>
							</div>
							<div className="detailsBlock-4">
								Description:<p>{profile.description}</p>
							</div>
							<button className="submitReview" onClick={submitReviewToggle}>
								Submit Review
							</button>
							<button className="contactNow" onClick={contactInfo}>
								Contact Now
							</button>
						</div>
					</div>
					<h3 className="reviewsHeading">REVIEWS</h3>
					<Dialog
						aria-labelledby="simple-dialog-title"
						open={openReview}
						onClose={submitReviewToggle}>
						<DialogTitle>Submit Review</DialogTitle>
						<DialogContent className="submitDialog">
							<Rating
								onChange={(e) => setRating(e.target.value)}
								value={ratings}
								size="large"
							/>

							<textarea
								className="submitDialogTextArea"
								cols="30"
								rows="5"
								value={comment}
								onChange={(e) => setComment(e.target.value)}></textarea>
						</DialogContent>
						<DialogActions>
							<Button onClick={submitReviewToggle} color="secondary">
								Cancel
							</Button>
							<Button onClick={reviewSubmitHandler} color="primary">
								Submit
							</Button>
						</DialogActions>
					</Dialog>

					<Dialog
						// className="Contact"
						fullScreen={fullScreen}
						open={openContact}
						onClose={handleClose}>
						<DialogTitle id="contact-info" style={{ minWidth: 300 }}>
							Contact Details of {profile.name}
						</DialogTitle>
						<DialogContentText
							style={{
								padding: 10,
							}}>
							Contact Number: `{profile.phoneNumber}`{" "}
						</DialogContentText>
						<DialogContentText
							style={{
								padding: 10,
							}}>
							Email ID:`{profile.email}`
						</DialogContentText>
						<DialogActions>
							<Button autoFocus onClick={handleClose}>
								Close
							</Button>
						</DialogActions>
					</Dialog>

					{profile.reviews && profile.reviews[0] ? (
						<div className="reviews">
							{profile.reviews &&
								profile.reviews.map((reviews) => (
									<ReviewCard review={reviews} />
								))}
						</div>
					) : (
						<p className="noReviews">No Reviews Yet</p>
					)}
				</Fragment>
			)}
		</Fragment>
	);
};

export default ProfileDetails;
