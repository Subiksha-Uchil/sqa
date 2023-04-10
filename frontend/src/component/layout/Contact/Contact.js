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
import Iframe from "react-iframe";

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
								<Iframe
									url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.5245977154364!2d72.8624055140782!3d19.128500755292787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8272ee1f6dd%3A0x98c56b8aa4118d25!2sTolani%20College%20of%20Commerce!5e0!3m2!1sen!2sin!4v1681124900110!5m2!1sen!2sin"
									width="100%"
									height="250rem"
									display="block"
									position="relative"
									top="10%"
								/>
								<div className="detail">
									<p className="home">
										<EmailIcon className="me-3" />
										<a className="home" href="mailto:sakhiportal@gmail.com">
											sakhiportal@gmail.com
										</a>
									</p>
									<p className="home">
										<PhoneIcon className="me-3" /> + 01 234 567 88
									</p>
								</div>
								<div className="socialcontact">
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
