import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import "./Footer.css";

const Footer = () => {
	return (
		<footer id="footer">
			<div className="leftFooter">
				<h2>Useful Links:</h2>
				<p>
					<a href="/login" className="text-reset">
						Login/Sign-Up
					</a>
				</p>
				<p>
					<a href="profiles" className="text-reset">
						Services
					</a>
				</p>
				<p>
					<a href="/" className="text-reset">
						Home
					</a>
				</p>
				<p>
					<a href="about" className="text-reset">
						About
					</a>
				</p>
				<p>
					<a href="contact" className="text-reset">
						Contact Us
					</a>
				</p>
			</div>

			<div className="midFooter">
				<h1>Sakhi - Online Job Portal.</h1>
				<p>Success in Service</p>

				<p>Copyrights 2023 &copy; Sakhi Online Portal</p>

				<div className="social">
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

			<div className="rightFooter">
				<h4>Contact Us</h4>
				<p>
					<HomeIcon className="me-2" />
					Mumbai, Mahrashtra, India
				</p>
				<p>
					<EmailIcon className="me-3" />
					sakhiportal@gmail.com
				</p>
				<p>
					<PhoneIcon className="me-3" /> + 01 234 567 88
				</p>
			</div>
		</footer>
	);
};

export default Footer;
