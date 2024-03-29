import React, { Fragment, useEffect } from "react";

import { DataGrid } from "@mui/x-data-grid";
import "./profileList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UsersList = ({}) => {
	const dispatch = useDispatch();

	const alert = useAlert();
	const history = useNavigate();
	const { error, users } = useSelector((state) => state.allUsers);

	const {
		error: deleteError,
		isDeleted,
		message,
	} = useSelector((state) => state.account);

	const deleteUserHandler = (id) => {
		dispatch(deleteUser(id));
		history("/admin/users");
		alert.success("User Deleted Sucessfully!");
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
			alert.success(message);

			dispatch({ type: DELETE_USER_RESET });
		}

		dispatch(getAllUsers());
	}, [dispatch, alert, error, deleteError, history, isDeleted, message]);

	const columns = [
		{ field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

		{
			field: "email",
			headerName: "Email",
			minWidth: 200,
			flex: 1,
		},
		{
			field: "name",
			headerName: "Name",
			minWidth: 150,
			flex: 0.5,
		},

		{
			field: "role",
			headerName: "Role",
			type: "number",
			minWidth: 150,
			flex: 0.3,
			cellClassName: (params) => {
				return params.id === "admin" ? "greenColor" : "redColor";
			},
		},

		{
			field: "actions",
			flex: 0.3,
			headerName: "Actions",
			minWidth: 150,
			type: "number",
			sortable: false,
			renderCell: (params) => {
				return (
					<Fragment>
						<Link to={`/admin/user/${params.id}`}>
							<EditIcon />
						</Link>

						<Button onClick={() => deleteUserHandler(params.id)}>
							<DeleteIcon />
						</Button>
					</Fragment>
				);
			},
		},
	];

	const rows = [];

	users &&
		users.forEach((item) => {
			rows.push({
				id: item._id,
				role: item.role,
				email: item.email,
				name: item.name,
			});
		});

	return (
		<Fragment>
			<MetaData title={`ALL USERS - Admin`} />

			<div className="dashboard">
				<SideBar />
				<div className="profileListContainer">
					<h1 className="profileListHeading">ALL USERS</h1>

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

export default UsersList;
