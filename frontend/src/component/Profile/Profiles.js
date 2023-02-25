import React, { Fragment, useEffect } from 'react';
import "./Profile.css";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { clearErrors, getProfile } from '../../actions/profileAction';
import Loader from '../layout/Loader/Loader';
import ProfileCard from '../Home/ProfileCard';

const Profiles = ({match}) => {
    const dispatch = useDispatch();
    const { keyword } = useParams();
    

    const { profiles, loading, error } = useSelector((state) => state.profiles);
    
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProfile(keyword));
    }, [dispatch, keyword, error, alert]);

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <h2 className='profileHeading'>Profiles</h2>
                    <div className='profiles'>
                        {profiles && profiles.map((profiles) => (
                            <ProfileCard key={profiles._id} profiles={profiles}/>
                        ))}
                    </div>
            </Fragment>}
        </Fragment>
  )
};

export default Profiles