import React from "react";
import { render } from "react-dom";
import { useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

const ProtectedRoute = ({ children, isAuthenticated }) => {
	const { loading, users } = useSelector((state) => state.users);
	if (loading === false) {
		if (isAuthenticated === false) {
			return <Navigate to="/login" />;
		}

		return children ? children : <Outlet />;
	}
};
export default ProtectedRoute;
