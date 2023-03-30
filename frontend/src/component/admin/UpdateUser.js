import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SideBar from "./Sidebar";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import {
	getUserDetails,
	updateUser,
	clearErrors,
} from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";
import { useNavigate, useParams } from "react-router";

const UpdateUser = ({}) => {
	const dispatch = useDispatch();
	const alert = useAlert();

	const { loading, error, user } = useSelector((state) => state.userDetails);

	const {
		loading: updateLoading,
		error: updateError,
		isUpdated,
	} = useSelector((state) => state.account);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [role, setRole] = useState("");
	const history = useNavigate();
	const userId = useParams();

	useEffect(() => {
		if (user && user._id !== userId.id) {
			dispatch(getUserDetails(userId.id));
		} else {
			setName(user.name);
			setEmail(user.email);
			setRole(user.role);
		}
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (updateError) {
			alert.error(updateError);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			dispatch({ type: UPDATE_USER_RESET });
		}
	}, [
		dispatch,
		alert,
		error,
		history,
		isUpdated,
		updateError,
		user,
		userId.id,
	]);

	const updateUserSubmitHandler = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set("name", name);
		myForm.set("email", email);
		myForm.set("role", role);

		dispatch(updateUser(userId.id, myForm));
		alert.success("User Updated Successfully");
		history("/admin/users");
	};

	return (
		<Fragment>
			<MetaData title="Update User" />
			<div className="dashboard">
				<SideBar />
				<div className="newProfileContainer">
					{loading ? (
						<Loader />
					) : (
						<form
							className="createProfileForm"
							onSubmit={updateUserSubmitHandler}>
							<h1>Update User</h1>

							<div>
								<PersonIcon />
								<input
									type="text"
									placeholder="Name"
									required
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div>
								<MailOutlineIcon />
								<input
									type="email"
									placeholder="Email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							<div>
								<VerifiedUserIcon />
								<select value={role} onChange={(e) => setRole(e.target.value)}>
									<option value="">Choose Role</option>
									<option value="admin">Admin</option>
									<option value="user">User</option>
								</select>
							</div>

							<Button
								className="createProfileBtn"
								type="submit"
								disabled={
									updateLoading ? true : false || role === "" ? true : false
								}>
								Update
							</Button>
						</form>
					)}
				</div>
			</div>
		</Fragment>
	);
};

export default UpdateUser;
