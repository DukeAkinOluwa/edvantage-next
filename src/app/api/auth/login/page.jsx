"use client"

import Link from "next/link";
import Image from "next/image";
import { AuthContext } from "@/contexts/BottomNavContext"
import { useContext, useState, useEffect } from "react"
import uniData from "@/DB/universitydata.json"
import { signIn } from "next-auth/react";

export default function Login(){
    
    const [loginError, setLoginError] = useState("");
    const [isShowLogin, setIsShowLogin] = useState(true)
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const { login } = useContext(AuthContext);

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };
    

    const handleLogin = async () => {
        setLoginError("");
        setIsLoggingIn(true);
        const result = await signIn('credentials', {
            redirect: false,
            email: userData.email,
            password: userData.password
        });

        if (result.error) {
            setLoginError(result.error);
            setIsLoggingIn(false);
        } else {
            setLoginError("");
            window.location.href = "https://edvantage.com.ng/";  // Or any other page after login
        }
    };

    

    const uniList = uniData.universities
    
    const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(() => {
        // Ensure currentPage is initialized properly
        setCurrentPage(1);
    }, []);
    
    const handleNextPage = () => {
        setIsOpen(false);
        setCurrentPage((prevPage) => prevPage + 1);
    };
    
    const handlePrevPage = () => {
        setIsOpen(false);
        setCurrentPage((prevPage) => prevPage - 1);
    };
    
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUni, setSelectedUni] = useState("");
    const [academicMajor, setAcademicMajor] = useState("");
    const academicLevels = uniData.academicLevels;
    const [academicLevel, setAcademicLevel] = useState("");
    const [selectedUniPrograms, setSelectedUniPrograms] = useState("");

    const handleUniClick = (university) => {
        setSelectedUni(university.name);
        setSelectedUniPrograms(university.programs)
        setIsOpen(false);
        setUserData((prevData) => ({
            ...prevData,
            institutionName: university.name,
        }));
    };
    const handleUniProgramClick = (program) => {
        setAcademicMajor(program.name);
        setIsOpen(false);
        setUserData((prevData) => ({
            ...prevData,
            academicMajor: program.name,
        }));
    }
    const handleAcademicLevelClick = (level) => {
        setAcademicLevel(level.name);
        setIsOpen(false);
        setUserData((prevData) => ({
            ...prevData,
            academicLevel: level.name,
        }));
    }
    const handleSignup = (userData) => {
        // Here you can perform actions like sending data to a server or storing it in local storage
        // console.log("Final User Data:", userData);
        login(userData)
        window.location.href = "/";
    };
    
    return(
        <div className="login-signup">
            {isShowLogin &&
                <>
            <div className="left">
                <h1>Welcome Back To Edvantage</h1>
                <p>To continue, please sign in</p>
                <Image src="/Images/login-signup/Image1.png" alt="Imagee" width={1000} height={1000}></Image>
            </div>
            <div className="right">
                <div className="phone-design">
                    <p>Welcome Back</p>
                    <h2>Log In to your Account</h2>
                    <label>
                        <span>Email</span>
                        <input type="email" placeholder="Type in your Email" name="email" onChange={handleInputChange} autoComplete="on" />
                    </label>
                    <label>
                        <span>Password</span>
                        <input type="password" placeholder="Type in your Password" name="password" onChange={handleInputChange} autoComplete="on" />
                    </label>
                    <div className="remember-me-forgot-password">
                        <div className="remember-me">
                            <input type="checkbox" name="checkbox" />
                            <p>Remember me</p>
                        </div>
                        <h5>Forgot Password?</h5>
                    </div>
                    {loginError && <div style={{color: "red"}}>{loginError}</div>}
                    {isLoggingIn ?
                        <div className="button1" style={{opacity: ".4"}}><p>Login in...</p></div> :
                        <div className="button1" onClick={() => handleLogin(userData)}><p>Continue</p></div>}
                    <div className="or-div">
                        <div className="line"></div>
                        <div className="text">Or</div>
                    </div>
                    <div className="button1 githubbtn" onClick={() => signIn('github')}><p>Login with GitHub</p></div>
                    <div className="alternative" onClick={()=>setIsShowLogin(false)}>
                        <p>New User?</p><p className="highlight">SIGNUP HERE</p>
                    </div>
                </div>
            </div>
                </>
            }
            {!isShowLogin &&
                <>
                {currentPage === 1 && (
                    <>
                        <div className="left">
                            <h1>Welcome To Edvantage</h1>
                            <p>To get started, please sign in</p>
                            <Image src="/Images/login-signup/Image2.png" alt="Imagee"  width={1000} height={1000}></Image>
                        </div>
                        <div className="right">
                            <div className="phone-design">
                                <p>LET&apos;S GET YOU STARTED</p>
                                <h2>Create an Account</h2>
                                <label>
                                    <span>Name</span>
                                    <input type="text" placeholder="Full Name" name="fullName" onChange={handleInputChange} autoComplete="on" />
                                </label>
                                <label>
                                    <span>Email</span>
                                    <input type="email" placeholder="edvantage@nomail.com" name="email" onChange={handleInputChange} autoComplete="on" />
                                </label>
                                <label>
                                    <span>Password</span>
                                    <input type="password" placeholder="Type in your Password" name="password" onChange={handleInputChange} autoComplete="off" />
                                </label>
                                <div className="button1" onClick={handleNextPage}><p>Continue</p></div>
                                <div className="or-div">
                                    <div className="line"></div>
                                    <div className="text">Or</div>
                                </div>
                                <div className="alternative" onClick={()=>setIsShowLogin(true)}>
                                    <p>Already have an account?</p><p className="highlight">LOGIN HERE</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {currentPage === 2 && (
                    <>
                        <div className="right onboarding-right">
                            <div className="container">
                                <h2>Knowing your educational institution helps us tailor your academic needs.</h2>
                                <label>
                                    <span>What is your institution name?</span>
                                    <input type="text" placeholder="Select Institution" name="institutionName" value={selectedUni} onClick={() => setIsOpen(!isOpen)} readOnly />
                                </label>
                                {isOpen && (
                                    <div className="options">
                                        {uniList.map((university, index) => (
                                            <div key={index} className="option" onClick={() => handleUniClick(university)} >
                                                {university.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="switch-screen">
                                    <div className="button2" onClick={handleNextPage}><p>Next</p></div>
                                    <div className="button1" onClick={handlePrevPage}><p>Previous</p></div>
                                </div>
                            </div>
                        </div>
                        <div className="left">
                            <Image src="/Images/login-signup/Image2.png" alt="Imagee"  width={1000} height={1000}></Image>
                        </div>
                    </>
                )}
                {currentPage === 3 && (
                    <>
                    <div className="right onboarding-right">
                        <div className="container">
                            <h2>Understanding your major or program allows for customized academic support.</h2>
                            <label>
                                <span>What’s your Academic Program/Major</span>
                                <input type="text" placeholder="Enter Academic Program/Major" name="academicMajor" value={academicMajor} onClick={() => setIsOpen(!isOpen)} readOnly />
                            </label>
                            {isOpen && (
                                <>
                                {selectedUniPrograms.length > 0 ? (
                                    <div className="options">
                                    {selectedUniPrograms.map((program, index) => (
                                        <div
                                        key={index}
                                        className="option"
                                        onClick={() => handleUniProgramClick(program)}
                                        >
                                        {program.name}
                                        </div>
                                    ))}
                                </div>
                                ) : (
                                    <p>Please Select your institution or skip this section</p>
                                )}
                                </>
                            )}
                            <div className="switch-screen">
                                <>
                                    {selectedUniPrograms.length > 0 ?(
                                        <div className="button2" onClick={handleNextPage}><p>Next</p></div>
                                    ) : (
                                        <div className="button2" onClick={handlePrevPage}><p>Select Institution</p></div>
                                    )}
                                </>
                                <>
                                    {selectedUniPrograms.length > 0 ?(
                                        <div className="button1" onClick={handlePrevPage}><p>Previous</p></div>
                                    ) : (
                                        <div className="button1" onClick={handleNextPage}><p>Skip</p></div>
                                    )}
                                </>
                            </div>
                        </div>
                    </div>
                    <div className="left">
                        <Image src="/Images/login-signup/Image4.png" alt="Imagee"  width={1000} height={1000}></Image>
                    </div>
                </>
                )}
                {currentPage === 4 && (
                <>
                    <div className="right onboarding-right">
                        <div className="container">
                            <h2>What&apos;s your main objective in Dukes Panthera? Your choice here won&apos;t limit what you can do</h2>
                            <label>
                                <span>What is your institution name?</span>
                                <input type="text" placeholder="Enter Institution" name="institutionName" onChange={handleInputChange} autoComplete="on" />
                            </label>
                            <div className="switch-screen">
                                <div className="button2" onClick={handleNextPage}><p>Next</p></div>
                                <div className="button1" onClick={handlePrevPage}><p>Previous</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="left">
                        <Image src="/Images/login-signup/Image5.png" alt="Imagee"  width={1000} height={1000}></Image>
                    </div>
                </>
                )}
                {currentPage === 5 && (
                    <>
                    <div className="right onboarding-right">
                        <div className="container">
                            <h2>Stating your academic level helps provide relevant resources.</h2>
                            <label>
                                <span>What’s your Academic Level?</span>
                                <input type="text" placeholder="Enter Institution" name="academicLevel"  value={academicLevel} onClick={() => setIsOpen(!isOpen)} readOnly/>
                            </label>
                            {isOpen && (
                                <div className="options">
                                    {academicLevels.map((level, index) => (
                                        <div key={index} className="option" onClick={() => handleAcademicLevelClick(level)} >
                                        {level.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="switch-screen">
                                <div className="button2" onClick={handleNextPage}><p>Next</p></div>
                                <div className="button1" onClick={handlePrevPage}><p>Previous</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="left">
                        <Image src="/Images/login-signup/Image6.png" alt="Imagee"  width={1000} height={1000}></Image>
                    </div>
                </>
                )}
                {currentPage === 6 && (
                <>
                    <div className="all">
                        <h2>Congratulations {userData.fullName}</h2>
                        <p>You&apos;re all set</p>
                        <Image src="/Images/login-signup/Image7.png" alt="Imagee"  width={1000} height={1000} />
                        <div className="button1" onClick={()=>handleSignup(userData)}><Link href="/">Continue</Link></div>
                    </div>
                </>
                )}
                </>
            }
        </div>
    )
}