import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProfileDetails from "./component/Profile/ProfileDetails.js";
import Profiles from "./component/Profile/Profiles.js";
import Search from "./component/Profile/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";

function App() {
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
			<Routes>
				{isAuthenticated && <UserOptions users={users} />}
				<Route exact path="/" element={<Home />} />
				<Route exact path="/profile/:id" element={<ProfileDetails />} />
				<Route exact path="/profiles" element={<Profiles />} />
				<Route exact path="/profiles/:keyword" element={<Profiles />} />
				<Route path="/search" element={<Search />} />
				<Route exact path="/login" element={<LoginSignUp />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
