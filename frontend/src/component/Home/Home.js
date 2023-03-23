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
import Fade from "react-reveal/Fade";
import { redirect, useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Home = () => {
	const alert = useAlert();
	const dispatch = useDispatch();
	const history = useNavigate();
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
					<Fade bottom>
						<div className="services">
							<h1>Our Services</h1>

							<div className="service1" rowSpacing={1}>
								<Card
									sx={{
										minWidth: 300,
										backgroundColor: "#fff",
										textAlign: "center",
									}}>
									<CardContent>
										<Typography
											sx={{
												fontSize: 14,
											}}
											color="text.secondary"
											gutterBottom>
											<img
												style={{
													height: 50,
													width: 50,
													// borderRadius: 30,
												}}
												src="maid.png"
											/>
										</Typography>
										<Typography
											sx={{ mb: 1.5, borderBottom: 1 }}
											color="text.secondary">
											Maid
										</Typography>
										<Typography variant="body2">
											Professional help in household chores.
											<br />
											{"Washing and Cleaning."}
										</Typography>
									</CardContent>
								</Card>
								<Card
									sx={{
										minWidth: 300,
										backgroundColor: "#fff",
										textAlign: "center",
									}}>
									<CardContent>
										<Typography
											sx={{
												fontSize: 14,
											}}
											color="text.secondary"
											gutterBottom>
											<img
												style={{
													height: 50,
													width: 50,
													// borderRadius: 30,
												}}
												src="cooking.png"
											/>
										</Typography>
										<Typography
											sx={{ mb: 1.5, borderBottom: 1 }}
											color="text.secondary">
											Home-Chef
										</Typography>
										<Typography variant="body2">
											Chef to help at daily cooking at home.
											<br />
											{"Could be any cuisine of your choice."}
										</Typography>
									</CardContent>
								</Card>
								<Card
									sx={{
										minWidth: 300,
										backgroundColor: "#fff",
										textAlign: "center",
									}}>
									<CardContent>
										<Typography
											sx={{
												fontSize: 14,
											}}
											color="text.secondary"
											gutterBottom>
											<img
												style={{
													height: 50,
													width: 50,
													// borderRadius: 30,
												}}
												src="babysitter.png"
											/>
										</Typography>
										<Typography
											sx={{ mb: 1.5, borderBottom: 1 }}
											color="text.secondary">
											Baby-Sitter
										</Typography>
										<Typography variant="body2">
											Professional help in taking care of your
											<br />
											{"infant or toddler of any age."}
										</Typography>
									</CardContent>
								</Card>
							</div>
							<div className="service1" spacing={1}>
								<Card
									sx={{
										minWidth: 300,
										backgroundColor: "#fff",
										textAlign: "center",
									}}>
									<CardContent>
										<Typography
											sx={{
												fontSize: 14,
											}}
											color="text.secondary"
											gutterBottom>
											<img
												style={{
													height: 50,
													width: 50,
													// borderRadius: 30,
												}}
												src="massage.png"
											/>
										</Typography>
										<Typography
											sx={{ mb: 1.5, borderBottom: 1 }}
											color="text.secondary">
											Massage Therapist
										</Typography>
										<Typography variant="body2">
											Highly skilled massage therapist
											<br />
											{"to relieve your body's strain."}
										</Typography>
									</CardContent>
								</Card>
								<Card
									sx={{
										minWidth: 300,
										backgroundColor: "#fff",
										textAlign: "center",
									}}>
									<CardContent>
										<Typography
											sx={{
												fontSize: 14,
											}}
											color="text.secondary"
											gutterBottom>
											<img
												style={{
													height: 50,
													width: 50,
													// borderRadius: 30,
												}}
												src="electrician.png"
											/>
										</Typography>
										<Typography
											sx={{ mb: 1.5, borderBottom: 1 }}
											color="text.secondary">
											Electrician
										</Typography>
										<Typography variant="body2">
											Here to help you at your electricity
											<br />
											{"emergencies and power-cuts"}
										</Typography>
									</CardContent>
								</Card>
								<Card
									sx={{
										minWidth: 300,
										backgroundColor: "#fff",
										textAlign: "center",
									}}>
									<CardContent>
										<Typography
											sx={{
												fontSize: 14,
											}}
											color="text.secondary"
											gutterBottom>
											<img
												style={{
													height: 50,
													width: 50,
													// borderRadius: 30,
												}}
												src="plumber.png"
											/>
										</Typography>
										<Typography
											sx={{ mb: 1.5, borderBottom: 1 }}
											color="text.secondary">
											Plumber
										</Typography>
										<Typography variant="body2">
											Professionals to help you fix your
											<br />
											{"water emergencies."}
										</Typography>
									</CardContent>
								</Card>
							</div>
							<div className="explore">
								<button onClick={() => history("/profiles")}>
									Explore these services..
								</button>
							</div>
						</div>
					</Fade>
					<Fade bottom>
						<h2 className="homeHeading">Featured Profiles</h2>
						<div className="container" id="container">
							{profiles &&
								profiles.map((profiles) => <Profile profiles={profiles} />)}
						</div>
					</Fade>
					<Fade bottom>
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
										<CardMedia
											component="img"
											height="185"
											image="6333040.jpg"
										/>
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
										<CardMedia
											component="img"
											height="180"
											image="build.avif"
										/>
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
										<CardMedia
											component="img"
											height="180"
											image="hired.avif"
										/>
										<CardContent height="50" font-family="Tahoma, sans-serif">
											<h3>Get Hired</h3>
										</CardContent>
										<CardActions></CardActions>
									</Card>
								</Grid>
							</Grid>
						</div>
					</Fade>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Home;
