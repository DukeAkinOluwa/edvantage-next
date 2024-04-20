'use client'

import React, { useState } from 'react';
import SideMenu from "@/components/SideMenu"
import PageRightHeader from "@/components/PageRightHeader"

export default function Settings(props){
    const [userData, setUserData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        newEmail: '',
    });

    // Retrieve userData from local storage
    const storedUserData = localStorage.getItem('userData');
    // Parse the stored userData
    let localUserData = JSON.parse(storedUserData);

    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };
    
    const handlePasswordUpdate = (e) => {
        // Here you can perform actions like sending data to a server or storing it in local storage
        e.preventDefault();
        
        if (!userData.oldPassword.trim() || !userData.newPassword.trim() || !userData.confirmNewPassword.trim()) {
            setPasswordError('Please fill all input fields.');
            return;
        }else if(userData.newPassword !== userData.confirmNewPassword) {
            setPasswordError('New passwords do not match.');
            return;
        }else if(localUserData.password !== userData.oldPassword) {
            setPasswordError('Incorrect old password.');
            return;
        }else{
            if (storedUserData) {
                // Update the password
                localUserData = {
                    ...localUserData,
                    password: userData.newPassword // Update the password here
                };

                // Save the updated userData back to local storage
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

        // Validate email
        if (!isValidEmail(userData.newEmail)) {
            console.log(userData.newEmail)
            setEmailError('Please enter a valid email address.');
            return;
        }else{
            if (storedUserData) {
                // Update the email
                localUserData = {
                    ...localUserData,
                    email: userData.newEmail // Update the email here
                };

                // Save the updated userData back to local storage
                localStorage.setItem('userData', JSON.stringify(localUserData));

                // If email is valid, clear any previous error
                setEmailError('Email updated successfully.');
            } else {
                console.log('No user data found in local storage.');
            }
        }

        // Perform further form submission logic
        // (e.g., submit data to server)
    }
    

    return(
        <div className="settings-page">
            <PageRightHeader page_title={props.page_title} userlevel="23"/>
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
}