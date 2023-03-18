import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Profile from "./ProfileCard.js";
import MetaData from "../layout/MetaData";
import { getProfile, clearErrors } from "../../actions/profileAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import BackgroundSlider from "./BackgroundSlider";

const Home = () => {
	const alert = useAlert();
	const dispatch = useDispatch();
	const { loading, error, profiles, profilesCount } = useSelector(
		(state) => state.profiles
	);

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		dispatch(getProfile());
	}, [dispatch, error, alert]);

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<MetaData title="Sakhiii!!" />
					<div className="title">
						<img src="logo.png" height={100} width={100} />
						<h1>Sakhiiii</h1>
						<p>help you hire the right one</p>
					</div>
					<div className="banner">
						<BackgroundSlider />
					</div>
					<h2 className="homeHeading">Featured Profiles</h2>
					<div className="container" id="container">
						{profiles &&
							profiles.map((profiles) => <Profile profiles={profiles} />)}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Home;
