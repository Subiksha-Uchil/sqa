import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useNavigate } from "react-router-dom";

const UserOptions = ({ users }) => {
	const [open, setOpen] = useState(false);
	const history = useNavigate();
	const options = [
		{ icon: <PersonIcon />, name: "Profile", func: account },
		{ icon: <ExitToAppIcon />, name: "Profile", func: logoutUser },
	];
	if (users.role === "admin") {
		options.unshift({
			icon: <DashboardIcon />,
			name: "DashBoard",
			func: dashboard,
		});
	}

	function dashboard() {
		history.push("/dashboard");
	}
	function account() {
		history.push("/account");
	}
	function logoutUser() {
		// dispatch(logout());
		alert.sucess("Logout Sucessfully");
	}

	return (
		<Fragment>
			<SpeedDial
				ariaLabel="SpeedDial tooltip example"
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				open={open}
				direction="down"
				icon={
					<img
						className="speedDialIcon"
						src={users.avatar.url ? users.avatar.url : "/Profile.png"}
						alt="Profile"
					/>
				}>
				<SpeedDialAction icon={<DashboardIcon />} tooltipTitle="Dashboard" />
			</SpeedDial>
		</Fragment>
	);
};

export default UserOptions;
