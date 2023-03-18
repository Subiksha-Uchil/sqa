import React, { useEffect } from "react";
import "./BackgroundSlider.css";
import { useState } from "react";
const imageSlide = [
	{
		url: "1e0dbec6-2a34-4134-bf1e-41f135b3117d.png",
		title: "Help you find the Balance",
		body: "Sakhi will help you find the right person to assist you in balancing your work-life and family-life.",
	},
	{
		url: "08f26915-eee4-4640-90aa-e3bd790a8ed9.png",
		title: "Are Trustworthy",
		body: "All Service-Providers mentioned are genuine and can be trusted enough to be around your loved ones.",
	},
	{
		url: "8f8c694c-ade9-4be1-af1b-39906d4047a0.png",
		title: "Are Highly-Professional",
		body: "These Service-Providers are mature, experienced and highly professional at their respective job.",
	},
];

const BackgroundSlider = () => {
	const [currentState, setCurrentState] = useState(0);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (currentState == 2) {
				setCurrentState(0);
			} else {
				setCurrentState(currentState + 1);
			}
		}, 5000);
		return () => clearTimeout(timer);
	}, [currentState]);
	const bgImageStyle = {
		backgroundImage: `url(${imageSlide[currentState].url})`,
		backgroundPosition: "center",
		backgroundSize: "cover",
		height: "100%",
	};
	const goToNext = (currentState) => {
		setCurrentState(currentState);
	};
	return (
		<div className="countiner-style">
			<div style={bgImageStyle}></div>
			<div>
				<div className="description">
					<h1>{imageSlide[currentState].title}</h1>
					<p>{imageSlide[currentState].body}</p>
				</div>
			</div>
			<div className="carousel-boult">
				{imageSlide.map((imageSlide, currentState) => (
					<span
						key={currentState}
						onClick={() => goToNext(currentState)}></span>
				))}
			</div>
		</div>
	);
};

export default BackgroundSlider;
