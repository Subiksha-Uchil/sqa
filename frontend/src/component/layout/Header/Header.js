import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/s-removebg-preview.png";

import { MdAccountCircle } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";

const options = {
	burgerColorHover: "#F5EBEB",
	logo,
	logoWidth: "30vmax",
	navColor1: "#DEB6AB",
	logoHoverSize: "25px",
	logoHoverColor: "#F5EBEB",
	logoAnimationTime: "1",
	link1Text: "Home",
	link2Text: "Services",
	link3Text: "Contact",
	link4Text: "About",
	link1Url: "/",
	link2Url: "/profiles",
	link3Url: "/contact",
	link4Url: "/about",
	link1Size: "2.5vmax",
	link1Color: "rgba(35, 35, 35,0.8)",
	nav1justifyContent: "flex-end",
	nav2justifyContent: "flex-end",
	nav3justifyContent: "flex-start",
	nav4justifyContent: "flex-start",
	link1ColorHover: "#F5EBEB",
	link1Margin: "1vmax",
	profileIconUrl: "/login",
	profileIcon: true,
	profileIconColor: "rgba(35, 35, 35,0.8)",
	ProfileIconElement: MdAccountCircle,
	searchIconUrl: "/search",
	searchIcon: true,
	searchIconColor: "rgba(35, 35, 35,0.8)",
	SearchIconElement: MdSearch,
	cartIcon: false,
	cartIconColor: "rgba(35, 35, 35,0.8)",
	CartIconElement: MdAddShoppingCart,
	profileIconColorHover: "#F5EBEB",
	searchIconColorHover: "#F5EBEB",
	cartIconColorHover: "#F5EBEB",
	cartIconMargin: "1vmax",
};

const Header = () => {
	return <ReactNavbar {...options} />;
};

export default Header;
