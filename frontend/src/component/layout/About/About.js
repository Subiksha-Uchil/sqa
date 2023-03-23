import React from "react";
import "./aboutSection.css";
import Fade from "react-reveal/Fade";
const About = () => {
	const visitInstagram = () => {
		window.location = "https://instagram.com/meabhisingh";
	};
	return (
		<div className="aboutSection">
			<div></div>
			<div className="aboutSectionGradient"></div>
			<div className="aboutSectionContainer">
				<h1>About Us</h1>
				<div>
					<Fade left>
						<div>
							<img src="about.jpg" height={320} width={320} />
						</div>
					</Fade>
					<Fade right>
						<div className="aboutSectionContainer2">
							<h3>
								Sakhii is an online job portal for basic service providers like
								maids, baby-sitter, homechef etc.
							</h3>
							<h4>
								The idea behind Sakhiii was mainly to help women working in
								corperate office with busy working hours, to balance their
								family-life back at home. To help them manage all of their
								responsiblities evenly.
							</h4>
						</div>
					</Fade>
				</div>
			</div>
		</div>
	);
};

export default About;
