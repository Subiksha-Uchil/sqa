import React, { Fragment, useEffect, useState } from "react";
import "./Profile.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { clearErrors, getProfile } from "../../actions/profileAction";
import Loader from "../layout/Loader/Loader";
import ProfileCard from "../Home/ProfileCard";
import Pagination from "react-js-pagination";
import Typography from "@material-ui/core/Typography";
import { Slider, Dropdown } from "@material-ui/core";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

const categories = [
	"Maid",
	"HomeChef",
	"BabySitter",
	"Massage-Therapist",
	"Plumber",
	"Electrician",
];
const locations = [
	"Mumbai",
	"Pune",
	"Delhi",
	"Kolkata",
	"Bangalore",
	"Ahamdabad",
];
const Profiles = ({ props }) => {
	const dispatch = useDispatch();
	const { keyword } = useParams();
	const [currentPage, setCurrentPage] = useState(1);
	const [salary, setSalary] = useState([0, 25000]);
	const [category, setCategory] = useState("");
	const [location, setLocation] = useState("");
	const [ratings, setRatings] = useState(0);

	const {
		profiles,
		loading,
		error,
		profilesCount,
		resultPerPage,
		filteredProfilesCount,
	} = useSelector((state) => state.profiles);
	const alert = useAlert();
	const setCurrentPageNo = (e) => {
		setCurrentPage(e);
	};

	const salaryHandler = (event, newSalary) => {
		setSalary(newSalary);
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		dispatch(
			getProfile(keyword, currentPage, salary, category, location, ratings)
		);
	}, [
		dispatch,
		keyword,
		currentPage,
		salary,
		category,
		location,
		ratings,
		alert,
		error,
	]);

	let count = filteredProfilesCount;

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<MetaData title="Profiles----Sakhi Portal" />
					<h1 className="profileHeading">Profiles of all Service Providers</h1>
					<div className="profiles">
						{profiles &&
							profiles.map((profiles) => (
								<ProfileCard key={profiles._id} profiles={profiles} />
							))}
					</div>
					<div className="filterBox">
						<Typography className="salary">Salary</Typography>
						<Slider
							value={salary}
							onChange={salaryHandler}
							valueLabelDisplay="auto"
							aria-aria-labelledby="range-slider"
							min={0}
							max={25000}
						/>
						<Typography>Job Category</Typography>
						<ul className="categoryBox">
							{categories.map((category) => (
								<li
									className="category-link"
									key={category}
									onClick={() => setCategory(category)}>
									{category}
								</li>
							))}
						</ul>

						<Typography component="legend">Ratings Above</Typography>
						<Slider
							value={ratings}
							onChange={(e, newRating) => {
								setRatings(newRating);
							}}
							min={0}
							max={5}
							aria-labelledby="continuous-sider"
							valueLabelDisplay="auto"
						/>
						<Typography>Job Location</Typography>
						<ul className="categoryBox">
							{locations.map((location) => (
								<li
									className="category-link"
									key={location}
									onClick={() => setLocation(location)}>
									{location}
								</li>
							))}
						</ul>
					</div>

					{resultPerPage < count && (
						<div className="paginationBox">
							<Pagination
								activePage={currentPage}
								itemsCountPerPage={resultPerPage}
								totalItemsCount={profilesCount}
								onChange={setCurrentPageNo}
								nextPageText="Next"
								prevPageText="Prev"
								firstPageText="1st"
								lastPageText="Last"
								itemClass="page-item"
								linkClass="page-link"
								activeClass="pageItemActive"
								activeLinkClass="pageLinkActive"
							/>
						</div>
					)}
				</Fragment>
			)}
		</Fragment>
	);
};

export default Profiles;
