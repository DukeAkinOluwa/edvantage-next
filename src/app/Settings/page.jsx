'use client'
import React, { useState, useEffect, useContext } from 'react';
// import { BottomNavContext, TopNavContext } from "@/contexts/BottomNavContext";
import SideMenu from "@/components/SideMenu"
import PageRightHeader from "@/components/PageRightHeader"

export default function Settings(){
    const [userData, setUserData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        newEmail: '',
    });
    const [localUserData, setLocalUserData] = useState(null);
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [viewportWidth, setViewportWidth] = useState(null)
    // const { setIsBottomNavHidden } = useContext(BottomNavContext);
    // const { setIsTopNavHidden } = useContext(TopNavContext);

    // useEffect(()=>{
    //     setIsBottomNavHidden(true)
    //     setIsTopNavHidden(true)
    //     console.log("akin")
    // })

    // Fetch user data from localStorage on component mount (client-side only)
    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
        setLocalUserData(JSON.parse(storedUserData));
        }
    }, []);

    useEffect(() => {
        setViewportWidth(window.innerWidth)
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handlePasswordUpdate = (e) => {
        e.preventDefault();
        
        if (!userData.oldPassword.trim() || !userData.newPassword.trim() || !userData.confirmNewPassword.trim()) {
        setPasswordError('Please fill all input fields.');
        return;
        } else if(userData.newPassword !== userData.confirmNewPassword) {
        setPasswordError('New passwords do not match.');
        return;
        } else if (localUserData && localUserData.password !== userData.oldPassword) {
        setPasswordError('Incorrect old password.');
        return;
        } else {
        // Update password logic
        if (localUserData) {
            localUserData.password = userData.newPassword;
            localStorage.setItem('userData', JSON.stringify(localUserData));
            setPasswordError('Password updated successfully.');
        } else {
            console.log('No user data found in local storage.');
        }
        }
    };

    const isValidEmail = (newEmail) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(newEmail);
    };

    const handleEmailUpdate = (e) => {
        e.preventDefault();

        if (!isValidEmail(userData.newEmail)) {
        setEmailError('Please enter a valid email address.');
        return;
        } else {
        if (localUserData) {
            localUserData.email = userData.newEmail;
            localStorage.setItem('userData', JSON.stringify(localUserData));
            setEmailError('Email updated successfully.');
        } else {
            console.log('No user data found in local storage.');
        }
        }
    }

    return(
        <div className="settings-page">
            {viewportWidth < 1001 ? <IndividualPageHeader /> : <PageRightHeader page_title={`Settings`} userlevel="23"/>}
            {/* {viewportWidth > 655 && <PageRightHeader page_title={`Settings`} userlevel="23"/>} */}
            <div className="left">
                <form className="password-reset settings-section">
                    <h3>Password reset</h3>
                    <label>
                        <span>Previous password</span>
                        <input type="password" placeholder="****************" name="oldPassword" onChange={handleInputChange} autoComplete="on" />
                    </label>
                    <label>
                        <span>New password</span>
                        <input type="password" placeholder="****************" name="newPassword" onChange={handleInputChange} autoComplete="on" />
                    </label>
                    <label>
                        <span>Confirm new password</span>
                        <input type="password" placeholder="****************" name="confirmNewPassword" onChange={handleInputChange} autoComplete="on" />
                    </label>
                    {passwordError && <div style={{color: "red"}}>{passwordError}</div>}
                    <div className="button button1" onClick={handlePasswordUpdate}>
                        <p>Update password</p>
                    </div>
                </form>
                <form className="do-not-disturb settings-section">
                    <h3>Do not disturb</h3>
                    <div className="button button1">
                        <p>Update settings</p>
                    </div>
                </form>
                <form className="email-notifications settings-section">
                    <h3>Email notifications</h3>
                    <label>
                        <span>Preferred Email</span>
                        <input type="email" placeholder="edvantage@nomail.com" name="newEmail" onChange={handleInputChange} autoComplete="on" />
                    </label>
                    {emailError && <div style={{color: "red"}}>{emailError}</div>}
                    <div className="button button1" onClick={handleEmailUpdate}>
                        <p>Update email</p>
                    </div>
                </form>
                <form className="student-info settings-section">
                    <h3>Student information</h3>
                    <label>
                        <span>Institution name</span>
                        <input type="email" placeholder="Ed University" name="email" onChange={handleInputChange} autoComplete="on" />
                    </label>
                    <label>
                        <span>Program of study</span>
                        <input type="email" placeholder="Engineering, Law" name="email" onChange={handleInputChange} autoComplete="on" />
                    </label>
                    <label>
                        <span>Academic Level</span>
                        <input type="email" placeholder="100, 200, 500" name="email" onChange={handleInputChange} autoComplete="on" />
                    </label>
                    <div className="button button1">
                        <p>Update info</p>
                    </div>
                </form>
            </div>
            <div className="right">
                
            </div>
        </div>
    )
    function IndividualPageHeader(){
  
      function handleRefreshClick(){
        window.history.back()
      }
      
      return(
        <div className="individual-page-header">
          <svg
            width="18"
            height="18"
            viewBox="0 0 16 16"
            fill="none"
            onClick={handleRefreshClick}
          >
            <path
              d="M15 8H1M1 8L8 15M1 8L8 1"
              stroke="#101828"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h2>Settings</h2>
        </div>
      )
    }
}
