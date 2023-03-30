import React from "react";
import Sidebar from "./Sidebar.js";
import "./sidebar.css";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getAdminProfile } from "../../actions/profileAction";

const Dashboard = () => {
	const dispatch = useDispatch();
	const { error, profiles } = useSelector((state) => state.profiles);
	const { users } = useSelector((state) => state.allUsers);
	const lineState = {
		labels: ["Initial Amount", "Amount Earned"],
		datasets: [
			{
				label: "TOTAL AMOUNT",
				backgroundColor: ["tomato"],
				hoverBackgroundColor: ["rgb(197, 72, 49)"],
				data: [0, 4000],
			},
		],
	};

	useEffect(() => {
		dispatch(getAdminProfile());
	}, [dispatch]);

	return (
		<div className="dashboard">
			<Sidebar />
			<div className="dashboardContainer">
				<Typography component="h1">DashBoard</Typography>
				<div className="dashboardSummary">
					<div>
						<p>
							Total Amount <br /> Rs.2000
						</p>
					</div>
					<div className="dashboardSummaryBox2">
						<Link to="/admin/profiles">
							<p>Profiles</p>
							<p>{profiles && profiles.length}</p>
						</Link>
						<Link to="/admin/users">
							<p>Users</p>
							<p>{users && users.length}</p>
						</Link>
					</div>
				</div>
				<div className="lineChart">
					<Line data={lineState} />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
