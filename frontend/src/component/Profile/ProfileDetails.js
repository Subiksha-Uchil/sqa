import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProfileDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getProfileDetails } from "../../actions/profileAction";
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
const ProfileDetails = ({ match }) => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const alert = useAlert();

	const { profile, loading, error } = useSelector(
		(state) => state.profileDetails
	);

	const [open, setOpen] = useState(false);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		dispatch(getProfileDetails(id));
	}, [dispatch, id, error, alert]);

	const submitReviewToggle = () => {
		open ? setOpen(false) : setOpen(true);
	};

	const options = {
		edit: false,
		color: "rgba(20,20,20,0.2)",
		activeColor: "lavendar",
		size: window.innerWidth < 600 ? 20 : 25,
		value: profile.ratings,
		isHalf: true,
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
							<button className="submitReview">Submit Review</button>
							<button className="contactNow">Contact Now</button>
						</div>
					</div>
					<h3 className="reviewsHeading">REVIEWS</h3>
					<Dialog
						aria-labelledby="simple-dialog-title"
						open={open}
						onClose={submitReviewToggle}>
						<DialogTitle>Submit Review</DialogTitle>
						<DialogContent className="submitDialog">
							<Rating
								onChange={(e) => setRating(e.target.value)}
								value={rating}
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
							<Button>Cancel</Button>
							<Button>Submit</Button>
						</DialogActions>
					</Dialog>

					{profile.reviews && profile.reviews[0] ? (
						<div className="reviews">
							{profile.reviews &&
								profile.reviews.map((review) => <ReviewCard review={review} />)}
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
