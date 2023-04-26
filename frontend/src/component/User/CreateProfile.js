import React, { Fragment, useEffect, useState } from "react";
import "./CreateProfile.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { clearErrors, createProfile } from "../../actions/profileAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import PlaceIcon from "@mui/icons-material/Place";
import EmailIcon from "@mui/icons-material/Email";
import ContactsIcon from "@mui/icons-material/Contacts";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import SchoolIcon from "@mui/icons-material/School";
import HistoryIcon from "@mui/icons-material/History";
// import SideBar from "./Sidebar.js";
import { NEW_PROFILE_RESET } from "../../constants/profileConstants";

const CreateProfile = ({}) => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const history = useNavigate();

	const { loading, error, success } = useSelector((state) => state.newProfile);
	const { users } = useSelector((state) => state.users);

	const [name, setName] = useState("");
	const [salary, setSalary] = useState(0);
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [location, setLocation] = useState("");
	const [experience, setExperience] = useState("");
	const [images, setImages] = useState([]);
	const [education, setEducation] = useState("");
	const [workingHours, setWorkingHours] = useState(0);
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [imagesPreview, setImagesPreview] = useState([]);
	const [createdBy, setCreatedBy] = useState("");
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

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (success) {
			alert.success("Profile Created Successfully");
			history("/account");
			dispatch({ type: NEW_PROFILE_RESET });
		}
	}, [dispatch, alert, error, history, success]);

	const createProfileSubmitHandler = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set("name", name);
		myForm.set("salary", salary);
		myForm.set("description", description);
		myForm.set("category", category);
		myForm.set("location", location);
		myForm.set("experience", experience);
		myForm.set("education", education);
		myForm.set("workingHours", workingHours);
		myForm.set("email", email);
		myForm.set("phoneNumber", phoneNumber);
		myForm.set("createdBy", users._id);
		images.forEach((image) => {
			myForm.append("images", image);
		});
		dispatch(createProfile(myForm));
	};

	const createProfileImagesChange = (e) => {
		const files = Array.from(e.target.files);

		setImages([]);
		setImagesPreview([]);

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
			<div className="create profile">
				<div className="newProfileContainer">
					<form
						className="createProfileForm"
						encType="multipart/form-data"
						onSubmit={createProfileSubmitHandler}>
						<h1>Create Profile</h1>

						<div>
							<SpellcheckIcon />
							<input
								type="text"
								placeholder="Name"
								required
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div>
							<AttachMoneyIcon />
							<input
								type="number"
								placeholder="Expected Salary"
								required
								onChange={(e) => setSalary(e.target.value)}
							/>
						</div>

						<div>
							<DescriptionIcon />

							<textarea
								placeholder="Enter Description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								cols="30"
								rows="1"></textarea>
						</div>

						<div>
							<AccountTreeIcon />
							<select onChange={(e) => setCategory(e.target.value)}>
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
							<select onChange={(e) => setLocation(e.target.value)}>
								<option value="">Choose Location</option>
								{locations.map((loct) => (
									<option key={loct} value={loct}>
										{loct}
									</option>
								))}
							</select>
						</div>

						<div>
							<EmailIcon />
							<input
								type="string"
								placeholder="Email ID"
								required
								ValidateEmail
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						<div>
							<ContactsIcon />
							<input
								type="string"
								placeholder="Phone Number"
								required
								maxLength={10}
								onChange={(e) => setPhoneNumber(e.target.value)}
							/>
						</div>
						<div>
							<HourglassBottomIcon />
							<input
								type="number"
								placeholder="Working Hours"
								required
								onChange={(e) => setWorkingHours(e.target.value)}
							/>
						</div>
						<div>
							<SchoolIcon />
							<input
								type="string"
								placeholder="Education"
								required
								onChange={(e) => setEducation(e.target.value)}
							/>
						</div>
						<div>
							<HistoryIcon />
							<input
								type="number"
								placeholder="Experience in years"
								required
								onChange={(e) => setExperience(e.target.value)}
							/>
						</div>

						<div id="createProfileFormFile">
							<input
								type="file"
								name="avatar"
								accept="image/*"
								onChange={createProfileImagesChange}
								multiple
							/>
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

export default CreateProfile;
