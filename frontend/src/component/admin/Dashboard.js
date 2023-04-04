import React from "react";
import Sidebar from "./Sidebar.js";
import "./sidebar.css";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getAdminProfile } from "../../actions/profileAction";

const Dashboard = () => {
	const dispatch = useDispatch();
	const { users } = useSelector((state) => state.allUsers);
	const { error, profiles } = useSelector((state) => state.profiles);

	const doughnutState = {
		labels: ["users", "profiles"],
		datasets: [
			{
				backgroundColor: ["#AC7D88", "#85586F"],
				hoverBackgroundColor: ["#F8EAD8", "#DEB6AB"],
				data: [users.length, profiles.length],
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
							Welcome Admin!!!! <br />
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
				<div className="doughnutChart">
					<Doughnut data={doughnutState} />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
