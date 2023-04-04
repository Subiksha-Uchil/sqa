import React, { Fragment } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
	clearErrors,
	getAdminProfile,
	deleteProfile,
} from "../../actions/profileAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./profileList.css";
import { DELETE_PROFILE_RESET } from "../../constants/profileConstants";

const ProfileList = () => {
	const { error, profiles } = useSelector((state) => state.profiles);
	const { error: deleteError, isDeleted } = useSelector(
		(state) => state.profile
	);
	const dispatch = useDispatch();
	const alert = useAlert();
	const history = useNavigate();
	const deleteProfileHandler = (id) => {
		dispatch(deleteProfile(id));
		alert.success("Profile Deleted Succesfully!");
		history("/admin/dashboard");
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (deleteError) {
			alert.error(deleteError);
			dispatch(clearErrors());
		}

		if (isDeleted) {
			alert.success("Profile Deleted Successfully");
			history("/admin/dashboard");
			dispatch({ type: DELETE_PROFILE_RESET });
		}

		dispatch(getAdminProfile());
	}, [dispatch, alert, error, deleteError, history, isDeleted]);

	const columns = [
		{
			field: "id",
			headerName: "Profile ID",
			minWidth: 70,
			flex: 0.5,
		},

		{
			field: "name",
			headerName: "Name",
			minWidth: 200,
			flex: 1,
		},

		{
			field: "salary",
			headerName: "Salary",
			type: "number",
			minWidth: 70,
			flex: 0.5,
		},

		{
			field: "category",
			headerName: "Category",
			minWidth: 200,
			flex: 1,
		},

		{
			field: "actions",
			flex: 0.3,
			headerName: "Actions",
			minWidth: 50,
			type: "number",
			sortable: false,
			renderCell: (params) => {
				return (
					<Fragment>
						<Link to={`/admin/profile/${params.id}`}>
							<EditIcon />
						</Link>

						<Button onClick={() => deleteProfileHandler(params.id)}>
							<DeleteIcon />
						</Button>
					</Fragment>
				);
			},
		},
	];

	const rows = [];

	profiles &&
		profiles.forEach((item) => {
			rows.push({
				id: item._id,
				salary: item.salary,
				category: item.category,
				name: item.name,
			});
		});

	return (
		<Fragment>
			<MetaData title={`ALL PROFILES - Admin`} />

			<div className="dashboard">
				<Sidebar />
				<div className="profileListContainer">
					<h1 className="profileListHeading">ALL PROFILES</h1>

					<DataGrid
						columnVisibilityModel={{
							// Hide columns status and traderName, the other columns will remain visible
							status: false,
							traderName: false,
						}}
						rows={rows}
						columns={columns}
						pageSize={10}
						disableSelectionOnClick
						className="profileListTable"
						autoHeight
					/>
				</div>
			</div>
		</Fragment>
	);
};

export default ProfileList;
