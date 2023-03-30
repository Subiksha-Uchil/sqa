import React, { Fragment, useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import "./profileReviews.css";
import { useSelector, useDispatch } from "react-redux";
import {
	clearErrors,
	getAllReviews,
	deleteReviews,
} from "../../actions/profileAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";

import SideBar from "./Sidebar";
import { DELETE_REVIEW_RESET } from "../../constants/profileConstants";
import { useNavigate } from "react-router";

const ProfileReviews = () => {
	const dispatch = useDispatch();
	const history = useNavigate();
	const alert = useAlert();

	const { error: deleteError, isDeleted } = useSelector(
		(state) => state.review
	);

	const { error, reviews, loading } = useSelector(
		(state) => state.profileReviews
	);

	const [profileId, setProfileId] = useState("");

	const deleteReviewHandler = (reviewId) => {
		dispatch(deleteReviews(reviewId, profileId));
	};

	const profileReviewsSubmitHandler = (e) => {
		e.preventDefault();
		dispatch(getAllReviews(profileId));
	};

	useEffect(() => {
		if (profileId.length === 24) {
			dispatch(getAllReviews(profileId));
		}
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (deleteError) {
			alert.error(deleteError);
			dispatch(clearErrors());
		}

		if (isDeleted) {
			alert.success("Review Deleted Successfully");
			history("/admin/reviews");
			dispatch({ type: DELETE_REVIEW_RESET });
		}
	}, [dispatch, alert, error, deleteError, history, isDeleted, profileId]);

	const columns = [
		{ field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

		{
			field: "user",
			headerName: "User",
			minWidth: 200,
			flex: 0.6,
		},

		{
			field: "comment",
			headerName: "Comment",
			minWidth: 350,
			flex: 1,
		},

		{
			field: "rating",
			headerName: "Rating",
			type: "number",
			minWidth: 180,
			flex: 0.4,

			cellClassName: (params) => {
				return params.id >= 3 ? "greenColor" : "redColor";
			},
		},

		{
			field: "actions",
			flex: 0.3,
			headerName: "Actions",
			minWidth: 150,
			type: "number",
			sortable: false,
			renderCell: (params) => {
				return (
					<Fragment>
						<Button onClick={() => deleteReviewHandler(params.id)}>
							<DeleteIcon />
						</Button>
					</Fragment>
				);
			},
		},
	];

	const rows = [];

	reviews &&
		reviews.forEach((item) => {
			rows.push({
				id: item._id,
				rating: item.rating,
				comment: item.comment,
				user: item.name,
			});
		});

	return (
		<Fragment>
			<MetaData title={`ALL REVIEWS - Admin`} />

			<div className="dashboard">
				<SideBar />
				<div className="profileReviewsContainer">
					<form
						className="profileReviewsForm"
						onSubmit={profileReviewsSubmitHandler}>
						<h1 className="profileReviewsFormHeading">ALL REVIEWS</h1>

						<div>
							<Star />
							<input
								type="text"
								placeholder="Profile Id"
								required
								value={profileId}
								onChange={(e) => setProfileId(e.target.value)}
							/>
						</div>

						<Button
							id="createProfileBtn"
							type="submit"
							disabled={
								loading ? true : false || profileId === "" ? true : false
							}>
							Search
						</Button>
					</form>

					{reviews && reviews.length > 0 ? (
						<DataGrid
							rows={rows}
							columns={columns}
							pageSize={10}
							disableSelectionOnClick
							className="profileListTable"
							autoHeight
						/>
					) : (
						<h1 className="profileReviewsFormHeading">No Reviews Found</h1>
					)}
				</div>
			</div>
		</Fragment>
	);
};

export default ProfileReviews;
