import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import "./Account.css";

const Account = () => {
	const { users, loading, isAuthenticated } = useSelector(
		(state) => state.users
	);

	const history = useNavigate();

	useEffect(() => {
		if (isAuthenticated === false) {
			history("/login");
		}
	}, [history, isAuthenticated]);

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<MetaData title={`${users.name}'s Account`} />
					<div className="accountContainer">
						<div>
							<h1>My Profile</h1>
							<img src={users.avatar.url} alt={users.name} />
							<Link to="/me/update">Edit Profile</Link>
						</div>
						<div>
							<div>
								<h4>Full Name</h4>
								<p>{users.name}</p>
							</div>
							<div>
								<h4>Email</h4>
								<p>{users.email}</p>
							</div>
							<div>
								<h4>Joined On</h4>
								<p>{String(users.createdAt).substr(0, 10)}</p>
							</div>

							<div>
								<Link to="/password/update">Change Password</Link>
							</div>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Account;
