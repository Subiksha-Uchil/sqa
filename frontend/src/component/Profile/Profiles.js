import React, { Fragment, useEffect, useState } from 'react';
import "./Profile.css";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { clearErrors, getProfile } from '../../actions/profileAction';
import Loader from '../layout/Loader/Loader';
import ProfileCard from '../Home/ProfileCard';
import Pagination from "react-js-pagination";

const Profiles = ({match}) => {
    const dispatch = useDispatch();
    const { keyword } = useParams();
    const [currentPage, setCurrentPage] = useState(1);

    const { profiles, loading, error, profilesCount,resultPerPage } = useSelector((state) => state.profiles);
    
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProfile(keyword, currentPage));
    }, [dispatch, keyword,currentPage]);

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
                    <div className='paginationBox'>
                       <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={profilesCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
                    </div>
            </Fragment>}
        </Fragment>
  )
};

export default Profiles