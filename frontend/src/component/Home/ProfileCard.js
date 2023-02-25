import React from 'react';
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./Home.css"


const ProfileCard = ({ profiles }) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.2)",
        activeColor: "lavendar",
        size: window.innerWidth<600?20:25,
        value: profiles.ratings,
        isHalf:true,
    };
    return (
        <Link className='profileCard' to={`/profile/${profiles._id}`}>
            <img src={profiles.images[0].url} alt={profiles.name} />
            <p> {profiles.name}</p>
            <div>
                <ReactStars {...options} /> <span>({profiles.numOfReviews} Reviews)</span>
            </div>
            <span>{`${profiles.experience} years of expertise` }</span>
        </Link>
  );
};

export default ProfileCard