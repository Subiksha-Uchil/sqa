import React, { useRef, useState } from "react";
import "./Contact.css";
import Fade from "react-reveal/Fade";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import { newMessage } from "../../../actions/userAction";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";

const Contact = () => {
	const history = useNavigate();
	const { id } = useParams();
	const dispatch = useDispatch();
	const alert = useAlert();
	const { error, loading, isAuthenticated } = useSelector(
		(state) => state.users
	);

	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const { success, error: reviewError } = useSelector(
		(state) => state.newMessage
	);

	const messageSubmitHandler = () => {
		if (!isAuthenticated) {
			alert.show("Login/SignUp to access this resource");
		} else {
			const myForm = new FormData();

			myForm.set("email", email);
			myForm.set("message", message);
			myForm.set("userId", id);

			dispatch(newMessage(myForm));
			alert.show("Thanks for your message!!");
		}
	};

	return (
		<div>
			<div className="aboutSection">
				<div></div>
				<div className="aboutSectionGradient"></div>
				<div className="aboutSectionContainer">
					<h1>Contact Us</h1>
					<div>
						<Fade left>
							<div>
								<h2 className="feedback">
									Feedbacks and messages are always welcome, please enter your
									email, and your message, we'll get back to you shortly.
								</h2>
								<form className="messageForm" onSubmit={messageSubmitHandler}>
									<input
										className="emailInput"
										type="email"
										placeholder="Email"
										required
										name="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
									<input
										className="messageInput"
										type="text"
										placeholder="Message"
										required
										name="message"
										value={message}
										onChange={(e) => setMessage(e.target.value)}
									/>
									<input type="submit" value="Submit" className="SubmitBtn" />
								</form>
							</div>
						</Fade>
						<Fade right>
							<div className="aboutSectionContainer2">
								<div className="detail">
									<h3>Contact Details:</h3>
									<p className="home">
										<HomeIcon className="me-2" />
										Mumbai, Mahrashtra, India
									</p>
									<p className="home">
										<EmailIcon className="me-3" />
										sakhiportal@gmail.com
									</p>
									<p className="home">
										<PhoneIcon className="me-3" /> + 01 234 567 88
									</p>
								</div>

								<div className="socialcontact">
									<h3 className="soci">Our Social Handles</h3>
									<li>
										<a href="http://facebook.com/sakhi">
											<FacebookIcon />
										</a>
									</li>
									<li>
										<a href="http://instagram.com/sakhi">
											<InstagramIcon />
										</a>
									</li>
									<li>
										<a href="http://twitter.com/sakhi">
											<TwitterIcon />
										</a>
									</li>
									<li>
										<a href="http://gmail.com/sakhi">
											<GoogleIcon />
										</a>
									</li>
								</div>
							</div>
						</Fade>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
