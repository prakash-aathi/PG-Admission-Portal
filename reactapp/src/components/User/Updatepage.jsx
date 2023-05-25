import './Updatepage.css'
import { store } from '../../store'
import { useNavigate, Link, NavLink, useParams } from 'react-router-dom';
import Studentservice, { editstudent, getStudents } from "../.././api/Studentservice"
import { useEffect, useState } from 'react';
import { UserGuard } from '../../AuthGuard/UserGuard';
function Updatepage() {
    const navigate = useNavigate();
    const { auth } = store.getState();
    const [studentdetail, setStudentdetail] = useState({});
    const { id } = useParams();
    const [userPopup, setUserPopup] = useState(false);

    const handleUserPopup = (e) => {
        e.preventDefault();
        setUserPopup(true);
    }

    const handleClick = (event) => {
        handleupdate(event).then((data) => {
            console.log("successfully edited", data)
        })
            .catch((error) => {
                console.error(error);
            });
        fetchstud().then((data) => {
            console.log("fetched student data successfully", data);
        })
            .catch((error) => {
                console.error(error)
            })
        navigate('/EnrolledCourse');
    }

    const handleLogout = () => {
        store.dispatch({ type: 'LOGOUT' })
        navigate('/login');
    }
    const fetchstud = async () => {
        const data = await getStudents();
    }
    useEffect(() => {
        console.log(auth)
        const fetchstud = async () => {
            const resp = await Studentservice.getStudents();
            console.log("all students response", resp)
            const studreg = resp.find(student => student.id == id)
            console.log("filtered", studreg)
            setStudentdetail(studreg);
        }
        fetchstud().then((data) => {
            console.log(data)
        })
            .catch((error) => {
                console.error(error)
            });
    }, [])
    const handleInput = (a, key) => {
        const currentstudentdata = {
            ...studentdetail,
        };
        currentstudentdata[key] = a.target.value;
        setStudentdetail(currentstudentdata);
    };
    const handleupdate = async (a) => {
        a.preventDefault();
        try {
            await editstudent(id, studentdetail)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <UserGuard>
            <div>
                <nav className="user-nav-container">
                    <div>
                        <NavLink to="/Navpage" >
                            <h2 className="pg-admission-heading">PG Admission</h2>
                        </NavLink>
                    </div>
                    <div className="user-navlinks-container">
                        <NavLink to="/HomePage">Institute</NavLink>
                        <NavLink to="/Enrolledcourse">Enrolledcourse</NavLink>
                        <NavLink to="/FeedBack">FeedBack</NavLink>
                    </div>
                    <button data-testid="logout" name='logout' onClick={handleLogout} >Logout</button>
                </nav>
                {
                    userPopup && (
                        <div className="user-popup-body noHover">
                            <div className="user-popup-overlay">

                            </div>
                            <div className="user-updatepage-popup">
                                <h1>Are you sure to update the data ?</h1>
                                <button
                                    className="user-updatepage-confirm-btn"
                                    type="submit"
                                    onClick={(e) => {
                                        handleClick(e);
                                        setUserPopup(false);
                                    }}
                                >
                                    confirm update
                                </button>
                                <button
                                    className="user-updatepage-cancel-btn"
                                    type="submit"
                                    onClick={() => {
                                        setUserPopup(false);
                                    }}
                                >
                                    cancel
                                </button>
                            </div>
                        </div>
                    )
                }
                <div className="bth">
                    <Link to="/HomePage"><h5>Back To Home</h5></Link>
                </div>
                <div className='user-update-heading'><h2>Student Details</h2>
                </div>

                <div key={studentdetail.id} className="user-enrolled-course">
                    <form className="user-update-form">
                        <div className="user-name">
                            <label className="user__label">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                className="user__input"
                                name="firstName"
                                value={studentdetail.firstName}
                                placeholder="Enter First Name"
                                onChange={(a) => handleInput(a, "firstName")}
                            />
                        </div>
                        <div className="user-name">
                            <label className="user__label">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                className="user__input"
                                name="lastName"
                                value={studentdetail.lastName}
                                placeholder='Enter Last Name'
                                onChange={(a) => handleInput(a, "lastName")}
                            />
                        </div>
                        <div className="user-name">
                            <label className="user__label">Father Name:</label>
                            <input
                                type="text"
                                id="fatherName"
                                className="user__input"
                                name="fatherName"
                                value={studentdetail.fatherName}
                                placeholder="Enter Father Name"
                                onChange={(a) => handleInput(a, "fatherName")}
                            />
                        </div>
                        <div className="user-name">
                            <label className="user__label">Mother Name:</label>
                            <input
                                type="text"
                                id="motherName"
                                className="user__input"
                                name="motherName"
                                value={studentdetail.motherName}
                                placeholder="Enter Mother Name"
                                onChange={(a) => handleInput(a, "motherName")}
                            />
                        </div>
                        <div className="user-mobile">
                            <label className="user__label">Phone Number 1:</label>
                            <input
                                type="text"
                                id="phoneNumber1"
                                className="user__input"
                                name="phoneNumber1"
                                value={studentdetail.phoneNumber1}
                                placeholder="Enter Phone Number1"
                                onChange={(a) => handleInput(a, "phoneNumber1")}
                            />
                        </div>
                        <div className="user-mobile">
                            <label className="user__label">Phone Number 2:</label>
                            <input
                                type="text"
                                id="phoneNumber2"
                                className="user__input"
                                name="phoneNumber2"
                                value={studentdetail.phoneNumber2}
                                placeholder="Enter Phone Number2"
                                onChange={(a) => handleInput(a, "phoneNumber2")}
                            />
                        </div>
                        <div className="user-dob">
                            <label className="user__label">Student DOB:</label>
                            <input
                                type="text"
                                id="studentDOB"
                                className="user__input"
                                name="studentDOB"
                                value={studentdetail.studentDOB}
                                placeholder="Enter Student DOB"
                                onChange={(a) => handleInput(a, "studentDOB")}
                            />
                        </div>
                        <div className="user-marks">
                            <label className="user__label">Enter SSLC marks:</label>
                            <input
                                type="text"
                                id="sslc"
                                className="user__input"
                                name="sslc"
                                value={studentdetail.sslc}
                                placeholder="Enter SSLC marks"
                                onChange={(a) => handleInput(a, "sslc")}
                            />
                        </div>
                        <div className="user-marks">
                            <label className="user__label">Enter HSC marks:</label>
                            <input
                                type="text"
                                id="hsc"
                                className="user__input"
                                name="hsc"
                                value={studentdetail.hsc}
                                placeholder="Enter HSC marks"
                                onChange={(a) => handleInput(a, "hsc")}
                            />
                        </div>
                        <div className="user-marks">
                            <label className="user__label">Enter diploma marks:</label>
                            <input
                                type="text"
                                id="diploma"
                                className="user__input"
                                name="diploma"
                                value={studentdetail.diploma}
                                placeholder="Enter diploma marks"
                                onChange={(a) => handleInput(a, "diploma")}
                            />
                        </div>
                        <div className="user-address">
                            <label className="user__label">Enter House Number:</label>
                            <input
                                type="text"
                                id="houseNumber"
                                className="user__input"
                                name="houseNumber"
                                value={studentdetail.houseNumber}
                                placeholder="Enter House Number"
                                onChange={(a) => handleInput(a, "houseNumber")}
                            />
                        </div>
                        <div className="user-address">
                            <label className="user__label">Enter Street Name:</label>
                            <input
                                type="text"
                                id="streetName"
                                className="user__input"
                                name="streetName"
                                value={studentdetail.streetName}
                                placeholder="Enter Street Name"
                                onChange={(a) => handleInput(a, "streetName")}
                            />
                        </div>
                        <div className="user-address">
                            <label className="user__label">Enter Area Name:</label>
                            <input
                                type="text"
                                id="areaName"
                                className="user__input"
                                name="areaName"
                                value={studentdetail.areaName}
                                placeholder="Enter Area Name"
                                onChange={(a) => handleInput(a, "areaName")}
                            />
                        </div>
                        <div className="user-address">
                            <label className="user__label">Enter Pincode:</label>
                            <input
                                type="text"
                                id="pincode"
                                className="user__input"
                                name="pincode"
                                value={studentdetail.pincode}
                                placeholder="Enter Pincode"
                                onChange={(a) => handleInput(a, "pincode")}
                            />
                        </div>
                        <div className="user-address">
                            <label className="user__label">Enter State:</label>
                            <input
                                type="text"
                                id="state"
                                className="user__input"
                                name="state"
                                value={studentdetail.state}
                                placeholder="Enter State"
                                onChange={(a) => handleInput(a, "state")}
                            />
                        </div>
                        <div className="user-address">
                            <label className="user__label">Enter Nationality:</label>
                            <input
                                type="text"
                                id="nationality"
                                className="user__input"
                                name="nationality"
                                value={studentdetail.nationality}
                                placeholder="Enter Nationality"
                                onChange={(a) => handleInput(a, "nationality")}
                            />
                        </div>
                    </form>
                    <div className="user-button-container">
                        <button className="user-update-button" type="submit" onClick={(a) => handleUserPopup(a)}>
                            Update
                        </button>
                        <Link to="/Admissionmodelpage" className='user-cancel-button'><button>Cancel</button></Link>
                    </div>
                </div>
            </div>
        </UserGuard>

    );

}

export default Updatepage;