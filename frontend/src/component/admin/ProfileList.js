import React, { Fragment } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getAdminProfile } from "../../actions/profileAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import "./profileList.css";

const ProfileList = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const { id } = useParams();
	const { error, profiles } = useSelector((state) => state.profiles);

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		// if (deleteError) {
		//   alert.error(deleteError);
		//   dispatch(clearErrors());
		// }

		// if (isDeleted) {
		//   alert.success("Product Deleted Successfully");
		//   history.push("/admin/dashboard");
		//   dispatch({ type: DELETE_PRODUCT_RESET });
		// }

		dispatch(getAdminProfile());
	}, [dispatch, alert, error]);

	const columns = [
		{ field: "id", headerName: "Profile ID", minWidth: 70, flex: 0.5 },

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
			field: "actions",
			flex: 0.3,
			headerName: "Actions",
			minWidth: 50,
			type: "number",
			sortable: false,
			renderCell: (params) => {
				return (
					<Fragment>
						<Link to={`/admin/profile/${params.getValue(params.id, "id")}`}>
							<EditIcon />
						</Link>

						<Button
						// onClick={() =>
						//     deleteProfileHandler(params.getValue(params.id, "id"))
						// }
						>
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
				price: item.salary,
				name: item.name,
			});
		});

	return (
		<Fragment>
			<MetaData title={`ALL PROFILES - Admin`} />

			<div className="dashboard">
				<Sidebar />
				<div className="profileListContainer">
					<h1 id="profileListHeading">ALL PROFILES</h1>

					<DataGrid
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
