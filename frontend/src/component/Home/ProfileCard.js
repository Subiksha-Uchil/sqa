import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./Home.css";

const ProfileCard = ({ profiles }) => {
	const options = {
		edit: false,
		color: "rgba(20,20,20,0.2)",
		activeColor: "rgb(172, 125, 136)",
		size: window.innerWidth < 600 ? 20 : 25,
		value: profiles.ratings,
		isHalf: true,
	};
	return (
		<Link className="profileCard" to={`/profile/${profiles._id}`} style={{}}>
			<img src={profiles.images[0].url} alt={profiles.name} style={{}} />
			<p> {profiles.name}</p>
			<div>
				<ReactStars {...options} />
				<span>{profiles.category}</span>
			</div>
			<span>{`Experience: ${profiles.experience}years`}</span>
			<span>{`Expected Salary: ${profiles.salary}/-per month`}</span>
		</Link>
	);
};

export default ProfileCard;
