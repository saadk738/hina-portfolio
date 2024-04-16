import React, { useEffect, useState } from 'react'
import { db } from '../config/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import './AdminPanel.css'
import { Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Snack from '../components/snack/Snack';
import Loader from '../components/loader/Loader';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AdminPanel() {

    let [pageNumber, setPageNumber] = useState(1);
    let [totalUsers, setTotalUsers] = useState(0);
    let [limit, setLimit] = useState(0)
    let [usersData, setUsersData] = useState([]);
    let [isLoading, setIsLoading] = useState(false);
    let [openSnack, setOpenSnack] = useState(false);
    let [severity, setSeverity] = useState('error')
    let [snackMsg, setSnackMsg] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const usersCollectionRef = collection(db,'users')

  const getUsers = async () => {
    const usersSnapshot = await getDocs(usersCollectionRef);
    const usersList = usersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id}))
    setUsersData(usersList);
    setTotalUsers(usersList.length)
  }

  useEffect(()=>{
    const status = location.state
    if(!status){
      navigate('/')
    }
  })

  useEffect(()=>{
    getUsers();
  },[])



    // pagination 

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [usersToRender, setUsersToRender] = useState([]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentUsers = usersData?.slice(startIndex, endIndex);
        setUsersToRender(currentUsers);

    }, [currentPage, usersData]);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(usersData.length / itemsPerPage)) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
        else {
           setSnackMsg('Your are already at the last page.');
            setOpenSnack(true);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
        else {
            setSnackMsg('Your are already at the first page.');
            setOpenSnack(true);
        }
    };

    const handleCloseSnack = () => {
        setOpenSnack(false);
        setSnackMsg('');
        setSeverity('error');
    }



    return (
        <div className='dashboard-ap'>
            <div className="ap-upperMost">
                <div className="dashboard-pd">
                    <div>
                        <div className="dashboard-pd-heading">
                            <span>Hello, Hina siddique</span>
                        </div>
                        <div className="dashboard-pd-subHeading">Check users activities in this dashboard.</div>
                    </div>
                </div>
            </div>

            <div className="ap-table-data">
                <div className="ap-table-data-header">
                    <div>
                        <div className="ap-table-data-heading">All Users</div>
                        <div className="ap-table-data-subHeading">Total Users : {totalUsers}</div>
                    </div>
                    <div onClick={() =>navigate('/')} className="ap-delete-btn">
                                                    Back to Home Screen
                                                </div>

                </div>
                <div className="table-data-headings-Box">
                    <Grid container spacing={3}>
                        <Grid item sm={1.5}>
                            <div className="table-data-heading">
                                Name
                            </div>
                        </Grid>
                        <Grid item sm={2.25}>
                            <div className="table-data-heading">
                                Email
                            </div>
                        </Grid>
                        <Grid item sm={1.25}>
                            <div className="table-data-heading">
                                Date
                            </div>
                        </Grid>
                        <Grid item sm={5}>
                            <div className="table-data-heading">
                                Message
                            </div>
                        </Grid>
                        <Grid item sm={2}>
                            <div className="table-data-heading">
                                Processed
                            </div>
                        </Grid>
                      
                        {/* <Grid item sm={2}>
                            <div className="table-data-heading">
                                Actions
                            </div>
                        </Grid> */}
                    </Grid>
                </div>
                <div className="table-data-content-box">
                    {usersToRender && usersToRender.length > 0 &&
                        usersToRender.map((item, index) => {
                            return (
                                <div key={index} className="table-data-content-item">
                                    <Grid container spacing={3}>
                                        <Grid item sm={1.5} xs={12}>
                                            <div className="table-data-item-text">
                                                <span>Name: </span>
                                                {item?.name}
                                            </div>
                                        </Grid>
                                        <Grid item sm={2.25} xs={12}>
                                            <div className="table-data-item-text">
                                                <span>Email: </span>
                                                {item?.email}
                                            </div>
                                        </Grid>
                                        <Grid item sm={1.25} xs={12}>
                                            <div className="table-data-item-text">
                                                <span>Date: </span>
                                                {item?.date}
                                            </div>
                                        </Grid>
                                        <Grid item sm={5} xs={12}>
                                            <div className="table-data-item-text">
                                                <span>Message: </span>
                                                {item?.message}
                                            </div>
                                        </Grid>
                                        <Grid item sm={2} xs={12}>
                                            <div className="table-data-item-text">
                                                <span>Message: </span>
                                                {item?.isProcessed}
                                            </div>
                                        </Grid>
                                        {/* <Grid item sm={2} xs={12}>
                                            <div className="table-data-item-btns">
                                                <div onClick={() =>{}} className="ap-edit-btn">
                                                    Edit
                                                </div>
                                                <div onClick={() => {}}
                                                    className="ap-delete-btn">
                                                    Delete
                                                </div>
                                            </div>
                                        </Grid> */}
                                    </Grid>
                                </div>
                            )
                        })
                    }
                    {usersData && usersData.length > 0 &&
                        <div className='ap-pagination-style' >
                            <span onClick={handlePrevPage} ><ArrowBackIcon /></span>
                            <div> Page no.{currentPage} of {Math.ceil(usersData.length / itemsPerPage)}</div>
                            <span onClick={handleNextPage}><ArrowForwardIcon /></span>
                        </div>
                    }
                </div>
            </div>
            <Snack msg={snackMsg} open={openSnack} onClose={handleCloseSnack} severity={severity} />
            <Loader isLoading={isLoading} />
        </div>
    )
}
