import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Profile from "./ProfileCard.js";
import MetaData from "../layout/MetaData";
import { getProfile, clearErrors } from "../../actions/profileAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const {loading,error,profiles,profilesCount} = useSelector((state)=>state.profiles)


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProfile());
    }, [dispatch, error,alert]);



    return (
        <Fragment>
            {loading?(<Loader />):(
            <Fragment>
            <MetaData title="Sakhiii!!"/>
        <div className="banner">
                <h1>Welcome to Sakhi - an Online Job Portal Website </h1>
                <p> Find the right candidate for all your daily household requirements!!</p>
                
                <a href="#container">
                    <button> Scroll
                        <CgMouse/>
                    </button>
                </a>
            </div>
            <h2 className="homeHeading">Featured Profiles</h2>
            <div className="container" id="container">
                {profiles && profiles.map((profiles)=> <Profile profiles= {profiles}/> )}
             </div>
            </Fragment>
            )}
        </Fragment>
    );
};

export default Home;