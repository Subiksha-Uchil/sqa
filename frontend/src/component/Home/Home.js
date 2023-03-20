import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Profile from "./ProfileCard.js";
import MetaData from "../layout/MetaData";
import { getProfile, clearErrors } from "../../actions/profileAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import BackgroundSlider from "./BackgroundSlider";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const Home = () => {
	const alert = useAlert();
	const dispatch = useDispatch();
	const { loading, error, profiles, profilesCount } = useSelector(
		(state) => state.profiles
	);

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		dispatch(getProfile());
	}, [dispatch, error, alert]);

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<MetaData title="Sakhiii!!" />
					<div className="title">
						<img src="logo.png" height={100} width={100} />
						<h1>Sakhiiii</h1>
						<p>help you hire the right one</p>
					</div>
					<div className="banner">
						<BackgroundSlider />
					</div>
					<div class="main">
						<h1>
							This is your opportunity to:{" "}
							<div class="roller">
								<span id="rolltext">
									HIRE
									<br />
									OR
									<br />
									Get HIRED
									<br />
									<span id="spare-time">Sakhiii is here to help you</span>
									<br />
								</span>
							</div>
						</h1>
					</div>
					<div className="services">
						<h1>Our Services</h1>
						<Grid className="service1" container rowSpacing={5} spacing={1}>
							<Grid Item xs={4} className="service">
								<Card sx={{ maxWidth: 345 }}>
									<CardActionArea>
										<CardMedia
											component="img"
											height="220"
											image="maid.png"
											alt="maid"
										/>
										<CardContent>
											<Typography gutterBottom variant="h5" component="div">
												Lizard
											</Typography>
											<Typography variant="body2" color="text.secondary">
												Lizards are a widespread group of squamate reptiles,
												with over 6,000 species, ranging across all continents
												except Antarctica
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
							<Grid Item xs={4} className="service">
								<Card sx={{ maxWidth: 345 }}>
									<CardActionArea>
										<CardMedia
											component="img"
											height="220"
											image="babysitter.png"
											alt="maid"
										/>
										<CardContent>
											<Typography gutterBottom variant="h5" component="div">
												Lizard
											</Typography>
											<Typography variant="body2" color="text.secondary">
												Lizards are a widespread group of squamate reptiles,
												with over 6,000 species, ranging across all continents
												except Antarctica
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
							<Grid Item xs={4} className="service">
								<Card sx={{ maxWidth: 345 }}>
									<CardActionArea>
										<CardMedia
											component="img"
											height="220"
											image="cooking.png"
											alt="maid"
										/>
										<CardContent>
											<Typography gutterBottom variant="h5" component="div">
												Lizard
											</Typography>
											<Typography variant="body2" color="text.secondary">
												Lizards are a widespread group of squamate reptiles,
												with over 6,000 species, ranging across all continents
												except Antarctica
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
						</Grid>
						<Grid container className="service2" rowSpacing={2} spacing={2}>
							<Grid Item xs={4} className="service">
								<Card sx={{ maxWidth: 345 }}>
									<CardActionArea>
										<CardMedia
											component="img"
											height="220"
											image="massage.png"
											alt="maid"
										/>
										<CardContent>
											<Typography gutterBottom variant="h5" component="div">
												Lizard
											</Typography>
											<Typography variant="body2" color="text.secondary">
												Lizards are a widespread group of squamate reptiles,
												with over 6,000 species, ranging across all continents
												except Antarctica
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
							<Grid Item xs={4} className="service">
								<Card sx={{ maxWidth: 345 }}>
									<CardActionArea>
										<CardMedia
											component="img"
											height="220"
											image="plumber.png"
											alt="maid"
										/>
										<CardContent>
											<Typography gutterBottom variant="h5" component="div">
												Lizard
											</Typography>
											<Typography variant="body2" color="text.secondary">
												Lizards are a widespread group of squamate reptiles,
												with over 6,000 species, ranging across all continents
												except Antarctica
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
							<Grid Item xs={4} className="service">
								<Card sx={{ maxWidth: 345 }}>
									<CardActionArea>
										<CardMedia
											component="img"
											height="220"
											image="electrician.png"
											alt="maid"
										/>
										<CardContent>
											<Typography gutterBottom variant="h5" component="div">
												Lizard
											</Typography>
											<Typography variant="body2" color="text.secondary">
												Lizards are a widespread group of squamate reptiles,
												with over 6,000 species, ranging across all continents
												except Antarctica
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
						</Grid>
					</div>

					<h2 className="homeHeading">Featured Profiles</h2>
					<div className="container" id="container">
						{profiles &&
							profiles.map((profiles) => <Profile profiles={profiles} />)}
					</div>
					<div className="how">
						<h1>Want to get hired, this is how it works</h1>
					</div>

					<div className="cards">
						<Grid container rowSpacing={2} spacing={2}>
							<Grid Item className="grid" xs={4}>
								<Card
									sx={{
										maxWidth: 345,
										bgcolor: "#E4D0D0",
										borderRadius: 2,
										maxHeight: 400,
									}}>
									<CardMedia component="img" height="185" image="6333040.jpg" />
									<CardContent height="50" font-family="Tahoma, sans-serif">
										<h3> Register Yourself</h3>
									</CardContent>
								</Card>
							</Grid>
							<Grid Item className="grid" xs={4}>
								<Card
									sx={{
										maxWidth: 345,
										maxHeight: 400,
										bgcolor: "#E4D0D0",
									}}>
									<CardMedia component="img" height="180" image="build.avif" />
									<CardContent height="50" font-family="Tahoma, sans-serif">
										<h3>Create your own Profile</h3>
									</CardContent>
									<CardActions></CardActions>
								</Card>
							</Grid>
							<Grid Item className="grid" xs={4}>
								<Card
									sx={{
										maxWidth: 345,
										bgcolor: "#E4D0D0",
										borderRadius: 2,
									}}>
									<CardMedia component="img" height="180" image="hired.avif" />
									<CardContent height="50" font-family="Tahoma, sans-serif">
										<h3>Get Hired</h3>
									</CardContent>
									<CardActions></CardActions>
								</Card>
							</Grid>
						</Grid>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Home;
