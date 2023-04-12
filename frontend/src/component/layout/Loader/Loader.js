import React from "react";
import "./Loader.css";
import GifLoader from "react-gif-loader";

const Loader = () => {
	const imageStyle = { imageStyle: { height: "10px", width: "10px" } };
	return (
		<div className="loading">
			<div>
				<GifLoader
					loading={true}
					imageSrc="https://img.wattpad.com/7aa89868baf6ee5de7f403c4268647c3b79b22d8/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f734936746a613772424c4c4b6b673d3d2d313236343335303932332e313731303439326530656433376464623436393936383138383338312e676966"
					imageStyle={imageStyle}
					overlayBackground="rgba(255, 255, 255)"
				/>
			</div>
		</div>
	);
};

export default Loader;
