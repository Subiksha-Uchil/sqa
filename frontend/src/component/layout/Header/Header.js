import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/s-removebg-preview.png";

import {MdAccountCircle} from "react-icons/md";
import {MdSearch} from "react-icons/md";
import {MdAddShoppingCart} from "react-icons/md";

const options = {
  burgerColorHover: "##cea6ef",
  logo,
  logoWidth: "20vmax",
  navColor1:"white",
  logoHoverSize: "15px",
  logoHoverColor: "##cea6ef",
  link1Text: "Home",
  link2Text: "Profiles",
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
  link1ColorHover: "#cea6ef",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIcon:true,
  profileIconColor:"rgba(35, 35, 35,0.8)",
  ProfileIconElement: MdAccountCircle,
  searchIconUrl: "/search",
  searchIcon:true,
  searchIconColor: "rgba(35, 35, 35,0.8)",
  SearchIconElement:MdSearch,
  cartIcon:false,
  cartIconColor: "rgba(35, 35, 35,0.8)",
  CartIconElement:MdAddShoppingCart,
  profileIconColorHover: "#cea6ef",
  searchIconColorHover: "#cea6ef",
  cartIconColorHover: "#cea6ef",
  cartIconMargin: "1vmax",
 
};

const Header = () => {
  return     <ReactNavbar {...options} />

};

export default Header;


