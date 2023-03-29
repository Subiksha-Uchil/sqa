import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	clearErrors,
	updateProfile,
	getProfileDetails,
} from "../../actions/profileAction";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import PlaceIcon from "@mui/icons-material/Place";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_PROFILE_RESET } from "../../constants/profileConstants";

const UpdateProfile = ({}) => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const history = useNavigate();
	const { error, profile } = useSelector((state) => state.profileDetails);

	const {
		loading,
		error: updateError,
		isUpdated,
	} = useSelector((state) => state.profile);

	const [name, setName] = useState("");
	const [salary, setSalary] = useState(0);
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [location, setLocation] = useState("");
	const [images, setImages] = useState([]);
	const [oldImages, setOldImages] = useState([]);
	const [imagesPreview, setImagesPreview] = useState([]);

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
		"Hyderabad",
		"Kolkata",
		"Bangalore",
		"Agra",
		"Ahamdabad",
	];
	const profileId = useParams();

	useEffect(() => {
		if (profile && profile._id !== profileId.id) {
			dispatch(getProfileDetails(profileId.id));
		} else {
			setName(profile.name);
			setDescription(profile.description);
			setSalary(profile.salary);
			setCategory(profile.category);
			setLocation(profile.location);
			setOldImages(profile.images);
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
			alert.success("Profile Updated Successfully");
			history("/admin/profiles");
			dispatch({ type: UPDATE_PROFILE_RESET });
		}
	}, [
		dispatch,
		alert,
		error,
		history,
		isUpdated,
		profileId.id,
		profile,
		updateError,
	]);

	const updateProfileSubmitHandler = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set("name", name);
		myForm.set("salary", salary);
		myForm.set("description", description);
		myForm.set("category", category);
		myForm.set("location", location);

		images.forEach((image) => {
			myForm.append("images", image);
		});
		dispatch(updateProfile(profileId.id, myForm));
	};

	const updateProfileImagesChange = (e) => {
		const files = Array.from(e.target.files);

		setImages([]);
		setImagesPreview([]);
		setOldImages([]);

		files.forEach((file) => {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					setImagesPreview((old) => [...old, reader.result]);
					setImages((old) => [...old, reader.result]);
				}
			};

			reader.readAsDataURL(file);
		});
	};

	return (
		<Fragment>
			<MetaData title="Create Profile" />
			<div className="dashboard">
				<SideBar />
				<div className="newProfileContainer">
					<form
						className="createProfileForm"
						encType="multipart/form-data"
						onSubmit={updateProfileSubmitHandler}>
						<h1>Create Profile</h1>

						<div>
							<SpellcheckIcon />
							<input
								type="text"
								placeholder="Profile Name"
								required
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div>
							<AttachMoneyIcon />
							<input
								type="number"
								placeholder="Salary"
								required
								onChange={(e) => setSalary(e.target.value)}
								value={salary}
							/>
						</div>

						<div>
							<DescriptionIcon />

							<textarea
								placeholder="Profile Description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								cols="30"
								rows="1"></textarea>
						</div>

						<div>
							<AccountTreeIcon />
							<select
								value={category}
								onChange={(e) => setCategory(e.target.value)}>
								<option value="">Choose Category</option>
								{categories.map((cate) => (
									<option key={cate} value={cate}>
										{cate}
									</option>
								))}
							</select>
						</div>
						<div>
							<PlaceIcon />
							<select
								value={location}
								onChange={(e) => setLocation(e.target.value)}>
								<option value="">Choose Location</option>
								{locations.map((loct) => (
									<option key={loct} value={loct}>
										{loct}
									</option>
								))}
							</select>
						</div>

						{/* <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={Stock}
              />
            </div> */}

						<div id="createProfileFormFile">
							<input
								type="file"
								name="avatar"
								accept="image/*"
								onChange={updateProfileImagesChange}
								multiple
							/>
						</div>

						<div id="createProfileFormImage">
							{oldImages &&
								oldImages.map((image, index) => (
									<img key={index} src={image.url} alt="Old Profile Preview" />
								))}
						</div>

						<div id="createProfileFormImage">
							{imagesPreview.map((image, index) => (
								<img key={index} src={image} alt="Profile Preview" />
							))}
						</div>

						<Button
							id="createProfileBtn"
							type="submit"
							disabled={loading ? true : false}>
							Create
						</Button>
					</form>
				</div>
			</div>
		</Fragment>
	);
};

export default UpdateProfile;
