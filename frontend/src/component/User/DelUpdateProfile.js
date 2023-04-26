import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import { useState } from "react";

const DelUpdateProfile = () => {
	const { users } = useSelector((state) => state.users);

	const { error, profiles } = useSelector((state) => state.profiles);

	useEffect(() => {
		console.log(profiles.createdBy);
		console.log("Hii");
	});
	const [profileId, setProfileId] = useState("");
	const alert = useAlert();
	if (users._id === profiles.createdBy) {
		profileId = profiles.createdBy;
	}
	return (
		<div>
			<h2>Hiiii{`${profiles.createdBy}`}</h2>
		</div>
	);
};

export default DelUpdateProfile;
