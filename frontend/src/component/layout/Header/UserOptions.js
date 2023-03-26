import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { useDispatch } from "react-redux";
import { Backdrop } from "@material-ui/core";

const UserOptions = ({ users }) => {
	const [open, setOpen] = useState(false);
	const history = useNavigate();
	const alert = useAlert();
	const dispatch = useDispatch();
	const options = [
		{ icon: <PersonIcon />, name: "Profile", func: account },
		{ icon: <ExitToAppIcon />, name: "LogOut", func: logoutUser },
	];
	if (users.role === "admin") {
		options.unshift({
			icon: <DashboardIcon />,
			name: "DashBoard",
			func: dashboard,
		});
	}

	function dashboard() {
		history("/admin/dashboard");
	}
	function account() {
		history("/account");
	}
	function logoutUser() {
		dispatch(logout());
		alert.success("Logout Sucessfully");
	}

	return (
		<Fragment>
			<Backdrop open={open} style={{ zIndex: "10" }} />
			<SpeedDial
				ariaLabel="SpeedDial tooltip example"
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				style={{ zIndex: "11" }}
				open={open}
				direction="down"
				className="speedDial"
				icon={
					<img
						className="speedDialIcon"
						src={users.avatar.url ? users.avatar.url : "/Profile.png"}
						alt="Profile"
					/>
				}>
				{options.map((item) => (
					<SpeedDialAction
						key={item.name}
						icon={item.icon}
						tooltipTitle={item.name}
						onClick={item.func}
					/>
				))}
			</SpeedDial>
		</Fragment>
	);
};

export default UserOptions;
