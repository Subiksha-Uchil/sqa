import React, { Fragment, useState, useEffect } from "react";
import "./UpdateAccount.css";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateAccount } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_ACCOUNT_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router";

const UpdateAccount = () => {
	const dispatch = useDispatch();
	const history = useNavigate();
	const alert = useAlert();

	const { users } = useSelector((state) => state.users);
	const { error, isUpdated, loading } = useSelector((state) => state.account);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [avatar, setAvatar] = useState();
	const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

	const updateAccountSubmit = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set("name", name);
		myForm.set("email", email);
		myForm.set("avatar", avatar);
		dispatch(updateAccount(myForm));
	};

	const updateAccountDataChange = (e) => {
		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === 2) {
				setAvatarPreview(reader.result);
				setAvatar(reader.result);
			}
		};

		reader.readAsDataURL(e.target.files[0]);
	};

	useEffect(() => {
		if (users) {
			setName(users.name);
			setEmail(users.email);
			setAvatarPreview(users.avatar.url);
		}

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			alert.success("Account Updated Successfully");
			dispatch(loadUser());

			history("/account");

			dispatch({
				type: UPDATE_ACCOUNT_RESET,
			});
		}
	}, [dispatch, error, alert, history, users, isUpdated]);
	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<MetaData title="Update Account" />
					<div className="updateAccountContainer">
						<div className="updateAccountBox">
							<h2 className="updateAccountHeading">Update Account</h2>

							<form
								className="updateAccountForm"
								encType="multipart/form-data"
								onSubmit={updateAccountSubmit}>
								<div className="updateAccountName">
									<FaceIcon />
									<input
										type="text"
										placeholder="Name"
										required
										name="name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
								<div className="updateAccountEmail">
									<MailOutlineIcon />
									<input
										type="email"
										placeholder="Email"
										required
										name="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>

								<div id="updateAccountImage">
									<img src={avatarPreview} alt="Avatar Preview" />
									<input
										type="file"
										name="avatar"
										accept="image/*"
										onChange={updateAccountDataChange}
									/>
								</div>
								<input
									type="submit"
									value="Update"
									className="updateAccountBtn"
								/>
							</form>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default UpdateAccount;
