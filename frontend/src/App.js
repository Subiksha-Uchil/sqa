import "./App.css";
import Header from "./component/layout/Header/Header.js";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Switch,
} from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProfileDetails from "./component/Profile/ProfileDetails.js";
import Profiles from "./component/Profile/Profiles.js";
import Search from "./component/Profile/Search.js";
import Account from "./component/User/Account.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateAccount from "./component/User/UpdateAccount.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import CreateProfile from "./component/User/CreateProfile.js";
import About from "./component/layout/About/About";
import Contact from "./component/layout/Contact/Contact";
import Dashboard from "./component/admin/Dashboard.js";
import ProfileList from "./component/admin/ProfileList.js";
import UpdateProfile from "./component/admin/UpdateProfile.js";
import UsersList from "./component/admin/UsersList.js";
import UpdateUser from "./component/admin/UpdateUser.js";
import ReviewsList from "./component/admin/ProfileReviews.js";

function App() {
	const { loading, isAuthenticated, isAdmin, users } = useSelector(
		(state) => state.users
	);

	React.useEffect(() => {
		WebFont.load({
			google: {
				families: ["Poppins"],
			},
		});
		store.dispatch(loadUser());
	}, []);

	return (
		<Router>
			<Header />
			{isAuthenticated && <UserOptions users={users} />}
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/profile/:id" element={<ProfileDetails />} />
				<Route exact path="/profiles" element={<Profiles />} />
				<Route exact path="/profiles/:keyword" element={<Profiles />} />
				<Route path="/search" element={<Search />} />
				<Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
					<Route path="/account" element={<Account />} />
					<Route path="/me/update" element={<UpdateAccount />} />
					<Route path="/password/update" element={<UpdatePassword />} />
					<Route path="/profile/new" element={<CreateProfile />} />
					<Route
						isAdmin={true}
						path="/admin/dashboard"
						element={<Dashboard />}
					/>
					<Route
						isAdmin={true}
						path="/admin/profiles"
						element={<ProfileList />}
					/>

					<Route
						isAdmin={true}
						path="/admin/profile"
						element={<CreateProfile />}
					/>

					<Route
						isAdmin={true}
						path="/admin/profile/:id"
						element={<UpdateProfile />}
					/>

					<Route isAdmin={true} path="/admin/users" element={<UsersList />} />
					<Route
						isAdmin={true}
						path="/admin/user/:id"
						element={<UpdateUser />}
					/>
					<Route
						isAdmin={true}
						path="/admin/reviews"
						element={<ReviewsList />}
					/>
				</Route>
				{/* other way */}
				{/* <Route
					path="/account"
					element={
						<ProtectedRoute isAuthenticated={isAuthenticated}>
							<Account />
						</ProtectedRoute>
					}
				/> */}

				<Route path="/password/forgot" element={<ForgotPassword />} />
				<Route path="/password/reset/:token" element={<ResetPassword />} />
				<Route exact path="/login" element={<LoginSignUp />} />
			</Routes>
			<Footer />
			<Routes>
				<Route exact path="/about" element={<About />} />
				<Route exact path="/contact" element={<Contact />} />
			</Routes>
		</Router>
	);
}

export default App;
