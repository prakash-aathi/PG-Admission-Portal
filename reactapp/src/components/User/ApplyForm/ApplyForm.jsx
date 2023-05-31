import React, { useState } from "react";
import { Link, useParams, NavLink } from "react-router-dom";
import "./ApplyForm.css";
import { useNavigate } from "react-router";
import { store } from "../../../store";
import { baseUrl } from "../../../api/authService";

let auth = "";
store.subscribe(() => {
  auth = store.getState().auth;
  console.log(auth);
});
function ApplyForm() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [userPopup, setUserPopup] = useState(false);

  const handlePopup = (e) => {
    e.preventDefault();
    setUserPopup(true);
  }

  const handlecancel = () => {
    navigate("/UserCourse");
  }
  const handleLogout = () => {
    store.dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  const data = {
    firstName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    phoneNumber1: "",
    phoneNumber2: "",
    emailId: "",
    studentDOB: "",
    sslc: "",
    hsc: "",
    diploma: "",
    houseNumber: "",
    streetName: "",
    areaName: "",
    state: "",
    pincode: "",
    nationality: "",
  };
  const [inputData, setInputData] = useState(data);
  const [flag, setFlag] = useState(false);
  function handledata(e) {
    console.log(e.target.id);
    setInputData({ ...inputData, [e.target.name]: e.target.value });
    console.log(inputData);
  }
  function handleSubmit(e) {
    e.preventDefault();
   

    if (
      !inputData.firstName ||
      !inputData.lastName ||
      !inputData.fatherName ||
      !inputData.motherName ||
      !inputData.phoneNumber1 ||
      !inputData.phoneNumber2 ||
      !inputData.emailId ||
      !inputData.studentDOB ||
      !inputData.streetName ||
      !inputData.areaName ||
      !inputData.state ||
      !inputData.pincode ||
      !inputData.nationality ||
      !inputData.sslc ||
      !inputData.hsc
    ) {
      alert("All fields are Mandatory");
    } else {
      setFlag(true);
      postdata()
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        console.error(error);
      });
      navigate("/Enrolledcourse");
    }
  }
  const postdata = async () => {
    await fetch(`${baseUrl}/user/addAdmission`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...inputData,
        courseId: courseId,
        studentIdNumber: auth.id,
      }),
    });
  };
  return (
    <>
      <pre>
        {flag ? (
          <h2 className="ui-define">
            Hello {inputData.firstName},registered successfully
          </h2>
        ) : (
          ""
        )}
      </pre>

      <nav className="user-nav-container">
        <div>
          <NavLink to="/Navpage" >
            <h2 className="pg-admission-heading">PG Admission</h2>
          </NavLink>
        </div>
        <div className="user-navlinks-container">
          <NavLink to="/Enrolledcourse">Enrolledcourse</NavLink>
          <NavLink to="/HomePage">Institute</NavLink>
          <NavLink to="/FeedBack">FeedBack</NavLink>
        </div>
        <button data-testid="logout" name='logout' onClick={handleLogout} >Logout</button>
      </nav>
      {
        userPopup && (
          <div className="user-popup-body noHover">
            <div className="user-popup-overlay">

            </div>
            <div className="user-applyform-popup">
              <h1>Are you sure to enroll the data ?</h1>
              <button
                className="user-applyform-confirm-btn"
                type="submit"
                onClick={(e) => {
                  handleSubmit(e);
                  setUserPopup(false);
                }}
              >
                confirm enroll
              </button>
              <button
                className="user-applyform-cancel-btn"
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
        <Link to="/HomePage">
          <h5>Back To Home</h5>
        </Link>
      </div>
      <div className="user-applyform-headtxt">
        Here You Go! Fill Up The Form And Enroll Now
      </div>

      <form className="info">

        <div className="user-student-form-container">
          <div className="user-student-form">
            <div className="user-form-body">
              <div className="courseId">
                <label className="form__label" htmlFor="courseId">
                  courseId{" "}
                </label>
                <input
                  type="text"
                  name="courseId"
                  id="courseId"
                  className="form__input"
                  value={courseId}
                />
              </div>
              <div className="studentIdNumber">
                <label className="form__label" htmlFor="studentIdNumber">
                  studentIdNumber
                </label>
                <input
                  type="text"
                  name="studentIdNumber"
                  id="lastName"
                  className="form__input"
                  value={auth.id}
                />
              </div>
              <div className="username">
                <label className="form__label" htmlFor="firstName">
                  First Name{" "}
                </label>
                <input
                  className="form__input"
                  name="firstName"
                  type="text"
                  id="firstName"
                  data-testid="studentName"
                  placeholder=" Enter Your First Name"
                  value={inputData.firstName}
                  onChange={handledata}
                />
              </div>
              <div className="lastname">
                <label className="form__label" htmlFor="lastName">
                  Last Name{" "}
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="form__input"
                  placeholder="Enter Your LastName"
                  value={inputData.lastName}
                  onChange={handledata}
                />
              </div>
              <div className="fathername">
                <label className="form__label" htmlFor="fatherName">
                  Father Name{" "}
                </label>
                <input
                  type="text"
                  name="fatherName"
                  id="fatherName"
                  className="form__input"
                  placeholder="Enter Your fatherName"
                  value={inputData.fatherName}
                  onChange={handledata}
                />
              </div>
              <div className="mothername">
                <label className="form__label" htmlFor="motherName">
                  Mother Name{" "}
                </label>
                <input
                  type="text"
                  name="motherName"
                  id="motherName"
                  className="form__input"
                  placeholder="Enter Your MotherName"
                  value={inputData.motherName}
                  onChange={handledata}
                />
              </div>
              {/* <div className="gender">
                                <label className="form__label" htmlFor="gender">Gender </label>
                                <input type="text" name="" id="gender" className="form__input" placeholder="Enter male or female" value={inputData.gender} onChange={handledata} />
                            </div> */}
              <div className="emailId">
                <label className="form__label" htmlFor="emailId">
                  Email{" "}
                </label>
                <input
                  type="email"
                  name="emailId"
                  id="emailId"
                  data-testid="emailId"
                  className="form__input"
                  placeholder="Enter Your Email"
                  value={inputData.emailId}
                  onChange={handledata}
                />
              </div>
              <div className="phoneNumber1">
                <label className="form__label" htmlFor="phoneNumber1">
                  phonenumber{" "}
                </label>
                <input
                  className="form__input"
                  name="phoneNumber1"
                  type="text"
                  id="phoneNumber1"
                  data-testid="mobileNumber"
                  placeholder="Enter your phonenumber"
                  value={inputData.phoneNumber1}
                  onChange={handledata}
                />
              </div>

              <div className="phoneNumber2">
                <label className="form__label" htmlFor="phoneNumber2">
                  Alternativenumber{" "}
                </label>
                <input
                  className="form__input"
                  name="phoneNumber2"
                  type="text"
                  id="phoneNumber2"
                  placeholder="Enter your alternativenumber"
                  value={inputData.phoneNumber2}
                  onChange={handledata}
                />
              </div>
              <div className="studentDOB">
                <label className="form__label" htmlFor="studentDOB">
                  Age{" "}
                </label>
                <input
                  type="text"
                  name="studentDOB"
                  id="studentDOB"
                  className="form__input"
                  placeholder="Enter Your age"
                  value={inputData.studentDOB}
                  onChange={handledata}
                />
              </div>
              <div className="sslc">
                <label className="form__label" htmlFor="sslc">
                  sslc{" "}
                </label>
                <input
                  type="text"
                  name="sslc"
                  id="sslc"
                  className="form__input"
                  placeholder="Enter SSLC marks"
                  value={inputData.sslc}
                  onChange={handledata}
                />
              </div>
              <div className="hsc">
                <label className="form__label" htmlFor="hsc">
                  hsc{" "}
                </label>
                <input
                  type="text"
                  name="hsc"
                  id="hsc"
                  className="form__input"
                  placeholder="Enter HSC marks"
                  value={inputData.hsc}
                  onChange={handledata}
                />
              </div>
              <div className="diploma">
                <label className="form__label" htmlFor="diploma">
                  diploma{" "}
                </label>
                <input
                  type="text"
                  name="diploma"
                  id="diploma"
                  className="form__input"
                  placeholder="Enter diploma marks"
                  value={inputData.diploma}
                  onChange={handledata}
                />
              </div>
              <div className="user-address-container">
                <h2>Address information</h2>
                <div className="user-address">
                  <label className="form__label" htmlFor="houseNumber">
                    HouseNo{" "}
                  </label>
                  <input
                    type="text"
                    name="houseNumber"
                    id="houseNumber"
                    className="form__input"
                    placeholder="Enter Housenumber"
                    value={inputData.houseNumber}
                    onChange={handledata}
                  />
                </div>
                <div className="user-address">
                  <label className="form__label" htmlFor="streetName">
                    Street Name{" "}
                  </label>
                  <input
                    type="text"
                    id="streetName"
                    name="streetName"
                    className="form__input"
                    placeholder="Enter the Streetname"
                    value={inputData.streetName}
                    onChange={handledata}
                  />
                </div>
                <div className="user-address">
                  <label className="form__label" htmlFor="areaname">
                    AreaName{" "}
                  </label>
                  <input
                    type="text"
                    id="areaName"
                    name="areaName"
                    data-testid="place"
                    placeholder="Enter the Areaname"
                    className="form__input"
                    value={inputData.areaName}
                    onChange={handledata}
                  />
                </div>
                <div className="user-address">
                  <label className="form__label" htmlFor="state">
                    State{" "}
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    className="form__input"
                    placeholder="Enter the State"
                    value={inputData.state}
                    onChange={handledata}
                  />
                </div>
                <div className="user-address">
                  <label className="form__label" htmlFor="pincode">
                    Pincode{" "}
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    className="form__input"
                    placeholder="Enter the Pincode"
                    value={inputData.pincode}
                    onChange={handledata}
                  />
                </div>
                <div className="user-address">
                  <label className="form__label" htmlFor="nationality">
                    Nationality{" "}
                  </label>
                  <input
                    type="text"
                    id="nationality"
                    name="nationality"
                    placeholder="Enter Nationality"
                    className="form__input"
                    value={inputData.nationality}
                    onChange={handledata}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="user-footer">
            <button className="user-enroll" type="submit" onClick={(e) => { handlePopup(e) }}>Enroll now</button>
            <button className="user-cancel" onClick={handlecancel}>cancel</button>
          </div>
        </div>
      </form>

    </>
  );
}
export default ApplyForm;
