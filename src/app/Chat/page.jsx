"use client";

import React, { useEffect, useState, useRef, useContext } from "react";
import PageRightHeader from "@/components/PageRightHeader";
import CPTemplate from "@/components/templates/CPTemplate";
import SearchIcon from "@/icons/search";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
// import { BottomNavContext, TopNavContext } from "@/contexts/BottomNavContext";

export default function Chats() {
  const [viewportWidth, setViewportWidth] = useState(null);
  const [userData, setUserData] = useState(null);
  const [selectedClassification, setSelectedClassification] = useState(null);
  const [selectedUserProfile, setSelectedUserProfile] = useState(null);
  const [chatTexts, setChatTexts] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [invisibleReset, setInvisibleReset] = useState(false);
  const [invisibleBackground, setInvisibleBackground] = useState(false);
  const [isChatSlide1Visible, setIsChatSlide1Visible] = useState(false);
  const [isChatSlide2Visible, setIsChatSlide2Visible] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [back, setBack] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [elementZIndex, setElementZIndex] = useState("");
  const chatdata = userData && userData.chats;

  const chatEndRef = useRef(null);

  // const { setIsBottomNavHidden } = useContext(BottomNavContext);
  // const { setIsTopNavHidden } = useContext(TopNavContext);

  const dummyData = {
    username: "AkinOluwa",
    password: "AkinAkin",
    email: "akin@gmail.com",
    courses: [
      {
        coursename: "Eng Mathematics",
        coursecode: "Eng 301",
        duedate: "Tue",
        status: "Completed",
      },
      {
        coursename: "Eng Drawing",
        coursecode: "Eng 303",
        duedate: "Fri",
        status: "Pending",
      },
      {
        coursename: "Machine Drawing",
        coursecode: "Eng 305",
        duedate: "Sat",
        status: "Pending",
      },
      {
        coursename: "Eng Mathematics",
        coursecode: "Eng 305",
        duedate: "Tue",
        status: "Completed",
      },
      {
        coursename: "Eng Drawing",
        coursecode: "Eng 307",
        duedate: "Fri",
        status: "Pending",
      },
      {
        coursename: "Machine Drawing",
        coursecode: "Eng 309",
        duedate: "Sat",
        status: "Completed",
      },
      {
        coursename: "Machine Drawing",
        coursecode: "Eng 311",
        duedate: "Sat",
        status: "Pending",
      },
      {
        coursename: "Eng Mathematics",
        coursecode: "Eng 313",
        duedate: "Tue",
        status: "Completed",
      },
      {
        coursename: "Eng Drawing",
        coursecode: "Eng 315",
        duedate: "Fri",
        status: "Pending",
      },
      {
        coursename: "Machine Drawing",
        coursecode: "Eng 317",
        duedate: "Sat",
        status: "Completed",
      },
      {
        coursename: "Machine Drawing",
        coursecode: "Eng 319",
        duedate: "Sat",
        status: "Pending",
      },
      {
        coursename: "Eng Mathematics",
        coursecode: "Eng 321",
        duedate: "Tue",
        status: "Completed",
      },
      {
        coursename: "Eng Drawing",
        coursecode: "Eng 323",
        duedate: "Fri",
        status: "Pending",
      },
      {
        coursename: "Machine Drawing",
        coursecode: "Eng 325",
        duedate: "Sat",
        status: "Completed",
      },
    ],
    assignments: [
      {
        coursecode: "CSC 301",
        status: "Completed",
        duedate: 25,
        progress: 1,
        priority: "High",
      },
      {
        coursecode: "ENG 303",
        status: "Pending",
        duedate: 86,
        progress: 2,
        priority: "Low",
      },
      {
        coursecode: "MEE 305",
        status: "Pending",
        duedate: 12,
        progress: 3,
        priority: "High",
      },
      {
        coursecode: "ENG 307",
        status: "Completed",
        duedate: 18,
        progress: 4,
        priority: "Low",
      },
      {
        coursecode: "ICT 301",
        status: "Completed",
        duedate: 23,
        progress: 1,
        priority: "High",
      },
      {
        coursecode: "AMS 303",
        status: "Pending",
        duedate: 32,
        progress: 2,
        priority: "Low",
      },
      {
        coursecode: "TCE 305",
        status: "Pending",
        duedate: 85,
        progress: 3,
        priority: "High",
      },
      {
        coursecode: "ENG 307",
        status: "Completed",
        duedate: 97,
        progress: 4,
        priority: "Low",
      },
    ],
    chats: [
      {
        type: "Group",
        imageid: "SmartGlassEngineers.png",
        title: "Smart Glass Engineers",
        lasttext: "A community of like minded engineers focused",
        noofmembers: 18,
      },
      {
        type: "Private",
        imageid: "Akin.png",
        title: "Akin",
        lasttext: "ENG303",
        noofmembers: 25,
        chat: [
          {
            sender: "John",
            message: "Hello",
          },
          {
            sender: "Akin",
            message: "Hi",
          },
          {
            sender: "Akin",
            message:
              "Whatsup good? I saw the text message you sent a few days back but I cheared all my chats by mistake and I kinda forgot to respond to your text.",
          },
          {
            sender: "John",
            message: "Oooh ooh, that's alright.",
          },
          {
            sender: "Akin",
            message:
              "I spoke with the photographer already and he says that he will be free throughout next week.",
          },
          {
            sender: "John",
            message: "Thank God o.",
          },
          {
            sender: "John",
            message: "So how much do you think he will request for?.",
          },
          {
            sender: "John",
            message:
              "I want him to be available throughout the event and the event should last for about 3 hours.",
          },
          {
            sender: "Akin",
            message:
              "He charges about 20k per hour but since you're coming from me, he should charge you about 15 thousand per hour.",
          },
          {
            sender: "Akin",
            message: "Let's just say 15.",
          },
          {
            sender: "John",
            message: "Wow.",
          },
        ],
      },
      {
        type: "Private",
        imageid: "Debo.png",
        title: "Debo",
        lasttext: "ENG305",
        noofmembers: 86,
      },
    ],
  };
  
  const fileData = [
    // Media (10)
    { id: 1, type: "image", name: "photo.jpg", size: 1024578 },
    { id: 2, type: "image", name: "vacation_pic.jpg", size: 873214 },
    { id: 3, type: "image", name: "funny_clip.jpg", size: 25165489 },
    { id: 4, type: "image", name: "presentation.jpg", size: 3847219 },
    { id: 5, type: "image", name: "screenshot.jpg", size: 231456 },
    { id: 6, type: "image", name: "cat_video.jpg", size: 14587932 },
    { id: 7, type: "image", name: "mountain_view.jpg", size: 987412 },
    { id: 8, type: "image", name: "cooking_tutorial.jpg", size: 42893716 },
    { id: 9, type: "image", name: "profile_pic.jpg", size: 512348 },
    { id: 10, type: "image", name: "gameplay.jpg", size: 78932145 },
  
    // Links (10)
    { id: 11, type: "link", name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Main_Page/dgsjcvhbsa" },
    { id: 12, type: "link", name: "YouTube", url: "https://www.youtube.com/" },
    { id: 13, type: "link", name: "Google Search", url: "https://www.google.com/" },
    { id: 14, type: "link", name: "Stack Overflow", url: "https://stackoverflow.com/" },
    { id: 15, type: "link", name: "GitHub", url: "https://github.com/" },
    { id: 16, type: "link", name: "MDN Web Docs", url: "https://developer.mozilla.org/" },
    { id: 17, type: "link", name: "FreeCodeCamp", url: "https://www.freecodecamp.org/" },
    { id: 18, type: "link", name: "Khan Academy", url: "https://www.khanacademy.org/" },
    { id: 19, type: "link", name: "Coursera", url: "https://www.coursera.org/" },
    { id: 20, type: "link", name: "Udemy", url: "https://www.udemy.com/" },
  
    // Documents (10)
    { id: 21, type: "document", name: "report.pdf", size: 2348712 },
    { id: 22, type: "document", name: "presentation.pptx", size: 1873241 },
    { id: 23, type: "document", name: "budget.xlsx", size: 432891 },
    { id: 24, type: "document", name: "contract.docx", size: 987421 },
    { id: 25, type: "document", name: "research_paper.odt", size: 1523847 },
    { id: 26, type: "document", name: "meeting_notes.txt", size: 12345 },
    { id: 27, type: "document", name: "instructions.pdf", size: 789321 },
    { id: 28, type: "document", name: "invoice.csv", size: 321456 },
    { id: 29, type: "document", name: "email.eml", size: 874123 },
    { id: 30, type: "document", name: "code.txt", size: 543281 }
  ];
  

  useEffect(() => {
    setViewportWidth(window.innerWidth);
    // if (window.innerWidth > 654)  {
    //   setIsTopNavHidden(false);
    //   setIsBottomNavHidden(true)
    // }else{
    //   setIsTopNavHidden(true)
    //   setIsBottomNavHidden(true)
    // }

    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      // if (window.innerWidth > 654)  {
      //   setIsTopNavHidden(false);
      //   setIsBottomNavHidden(true)
      // }//else if (selectedUserProfile !== null) {
      //   // console.log("hi")
      //   // setIsBottomNavHidden(true)
      //   // setIsTopNavHidden(true)}
      //   else{
      //   setIsTopNavHidden(true)
      //   setIsBottomNavHidden(true)
      // }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [selectedUserProfile]);

  useEffect(() => {
    const fetchDataFromLocalStorage = async () => {
      try {
        const storedData = localStorage.getItem("userData");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setUserData(parsedData);
        } else {
          console.log("No user data found in local storage.");
          setUserData(dummyData);
        }
      } catch (error) {
        console.error("Error fetching data from local storage:", error);
      }
    };

    fetchDataFromLocalStorage();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    setElementZIndex(0);
  }, []);

  useEffect(() => {
    const handleBackButton = (event) => {
      if (selectedUserProfile !== null) {
        event.preventDefault();
        handleRefreshClick();
      } else {
        // No selected user profile - navigate back
        window.history.back();
      }
    };
  
    const updateHistoryState = () => {
      window.history.pushState(null, "", window.location.pathname);
    };
  
    if (selectedUserProfile !== null) {
      updateHistoryState();
    }
  
    window.addEventListener("popstate", handleBackButton);
  
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [selectedUserProfile]);

  function handleSetBack(booleanValue, elementIndex) {
    setBack(booleanValue);
    setElementZIndex(elementIndex);
  }

  const handleClassificationClick = (classification) => {
    setSelectedClassification(classification);
  };

  const handleShowAllChats = () => {
    setSelectedClassification(null);
  };

  const handleUserProfileClick = (userProfile, chatTexts) => {
    setSelectedUserProfile(userProfile);
    setChatTexts(chatTexts);
    setCurrentPage(2);
    handleReset();
    // hideNav();
    // Add logic to show the chat section
    document.querySelector(".whole-chat-section").classList.add("show-chat");
  };

  const handleSearchFilter = (searchInputValue) => {
    setSearchValue(searchInputValue);
    if (searchInputValue.length === 0) {
      setFilteredList([]);
    } else if (searchInputValue !== "") {
      const newFilteredList = [];

      const exactMatches = chatdata.filter(
        (list) => list.title.toLowerCase() === searchInputValue.toLowerCase()
      );
      newFilteredList.push(...exactMatches);

      const patternMatches = chatdata
        .filter((list) =>
          list.title.toLowerCase().includes(searchInputValue.toLowerCase())
        )
        .filter((list) => !exactMatches.includes(list));
      newFilteredList.push(...patternMatches);

      const characterMatches = chatdata
        .filter((list) =>
          [...searchInputValue.toLowerCase()].every((char) =>
            list.title.toLowerCase().includes(char)
          )
        )
        .filter(
          (list) =>
            !exactMatches.includes(list) && !patternMatches.includes(list)
        );
      newFilteredList.push(...characterMatches);

      setFilteredList(newFilteredList);
    }
  };

  const handleShowSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
    setInvisibleReset(true);
    handleSetBack(!isSearchBarVisible, isSearchBarVisible ? "" : 1);
  };

  const handleReset = () => {
    setFilteredList([]);
    setSearchValue("");
    setInvisibleReset(false);
    setIsSearchBarVisible(false);
  };

  const toggleAddChatSlide1 = () => {
    if (isChatSlide1Visible) {
      setIsChatSlide1Visible(null);
      setInvisibleBackground(false);
      handleSetBack(false, 0);
    } else {
      setIsChatSlide1Visible(true);
      setInvisibleBackground(true);
      handleSetBack(true, 0);
    }
  };

  const toggleAddChatSlide2 = () => {
    setIsChatSlide1Visible(false);
    setIsChatSlide2Visible(!isChatSlide2Visible);
    setInvisibleBackground(!isChatSlide2Visible);
    if (isChatSlide1Visible) {
    } else {
      handleSetBack(false, 0);
    }
  };

  const handleClearAll = () => {
    setIsChatSlide1Visible(false);
    setIsChatSlide2Visible(false);
    setInvisibleBackground(false);
  };

  const handleRefreshClick = () => {
    setCurrentPage(1);
    setSelectedUserProfile(null);
    // showNav();
  };

  // const hideNav = () => {
  //   setIsBottomNavHidden(true);
  //   if (viewportWidth < 655) {
  //     setIsTopNavHidden(true);
  //   }
  // };

  // const showNav = () => {
  //   setIsBottomNavHidden(false);
  //   setIsTopNavHidden(false);
  // };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <span className="chat-page">
      {/* {viewportWidth < 768 && currentPage === 2 ? (
              <></>
            ) : (
              <PageRightHeader
                  page_title={`Settings`}
                  userlevel="23"
                  handleShowSearchBar={handleShowSearchBar}
                  handleSetBack={handleSetBack}
                  elementIndex={"-1"}
              />
            )} */}
      {viewportWidth < 656 ? (
        <>
          {currentPage === 1 && (
            <div className="whole-chat-section">
              <IndividualPageHeader />
              <ChatPageLeft />
              <AddChat />
            </div>
          )}
          {currentPage === 2 && (
            <div className="whole-chat-section">
              <UserProfileDetails
                selectedUserProfile={selectedUserProfile}
                chatTexts={chatTexts}
              />
            </div>
          )}
        </>
      ) : (
        <div className="whole-chat-section">
          {(viewportWidth < 1001) ?
          (
            <IndividualPageHeader />
          ) : (<></>)}
          <ChatPageLeft />
          <UserProfileDetails
            selectedUserProfile={selectedUserProfile}
            chatTexts={chatTexts}
          />
          <AddChat />
        </div>
      )}
    </span>
  );
  function UserProfileDetails({ selectedUserProfile, chatTexts }) {
    const [showScrollToBottom, setShowScrollToBottom] = useState(false);
    const [isAboutProfileVisible, setIsAboutProfileVisible] = useState(false);
    const chatEndRef = useRef(null);
    const chatBodyRef = useRef(null);

    useEffect(() => {
      scrollToBottom();
    }, [selectedUserProfile?.chat]);

    useEffect(() => {
      const handleScroll = () => {
        if (chatBodyRef.current) {
          const { scrollTop, clientHeight, scrollHeight } = chatBodyRef.current;
          setShowScrollToBottom(scrollTop + clientHeight < scrollHeight);
        }
      };

      if (chatBodyRef.current) {
        chatBodyRef.current.addEventListener("scroll", handleScroll);
      }

      return () => {
        if (chatBodyRef.current) {
          chatBodyRef.current.removeEventListener("scroll", handleScroll);
        }
      };
    }, []);

    const scrollToBottom = () => {
      if (chatEndRef.current) {
        chatEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    console.log(isAboutProfileVisible)

    return (
      <div className="right">
        {selectedUserProfile ? (
          <>
            <div className="chat-header" onClick={() => setIsAboutProfileVisible(true)}>
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
              <Image
                src={`/Images/profile/${selectedUserProfile.imageid}`}
                alt="profile"
                height={40}
                width={40}
              />
              <h3>{selectedUserProfile.title}</h3>
            </div>
            <div className="chat-body" ref={chatBodyRef}>
              {selectedUserProfile.chat ? (
                <>
                  {selectedUserProfile.chat.map((chat, index) => (
                    <div
                      key={index}
                      className="text"
                      style={{
                        alignSelf:
                          chat.sender === selectedUserProfile.title
                            ? "flex-end"
                            : "flex-start",
                        backgroundColor:
                          chat.sender === selectedUserProfile.title
                            ? "#2A52BE"
                            : "#F2F2F7",
                        color:
                          chat.sender === selectedUserProfile.title
                            ? "#FEFAFA"
                            : "",
                      }}
                    >
                      <p>{chat.message}</p>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </>
              ) : (
                <div className="empty-chat-body">
                  <div className="display-container">
                    <Image
                      src={`/Images/svg-alternatives/empty-chat-svg2.png`}
                      alt="chatimage"
                      height={250}
                      width={250}
                      sizes="(max-width: 100%), (max-height: 70%)"
                    />
                    <p>
                      Welcome to {selectedUserProfile.title}
                      <br />
                      <br />
                      Start a chat
                    </p>
                  </div>
                </div>
              )}
              {showScrollToBottom && (
                <div className="scroll-to-bottom" onClick={scrollToBottom}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 16L8 12H16L12 16Z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="chat-input-box">
              <form action="">
                <label>
                  <input
                    type="text"
                    placeholder="Start typing..."
                    name="chat-input"
                    autoComplete="off"
                  />
                </label>
              </form>
            </div>
          </>
        ) : (
          <div className="chat-body empty-chat-body">
            <div className="display-container">
              <Image
                src={`/Images/svg-alternatives/empty-chat-svg.png`}
                alt="chatimage"
                height={211}
                width={465}
                sizes="(max-width: 100%), (max-height: 70%)"
              />
              <p>
                Pick a person or group from left sidebar chat list, and start
                your conversation.
              </p>
              <div className="button">
                <p>Invite People</p>
              </div>
            </div>
          </div>
        )}
        {isAboutProfileVisible === true ?
          <ChatAboutProfile /> : <></>
        }
      </div>
    );
    function ChatAboutProfile(){
      const [fileType, setFileType] = useState("image")
      return(
          <div className="chat-about-profile">
            <Image src={`/Images/profile/${selectedUserProfile.imageid}`} alt="profile" height={350} width={300} />
            <div className="back-arrow-cont">
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" onClick={() => setIsAboutProfileVisible(false)} className="back-arrow" >
                <path
                  d="M15 8H1M1 8L8 15M1 8L8 1" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="files-header">
              <div className="media" style={{color: `${fileType === "image" ? "#2A52BE" : ""}`}} onClick={() => setFileType("image")}>
                <p>Media</p>
              </div>
              <div className="links" style={{color: `${fileType === "link" ? "#2A52BE" : ""}`}} onClick={() => setFileType("link")}>
                <p>Links</p>
              </div>
              <div className="docs" style={{color: `${fileType === "document" ? "#2A52BE" : ""}`}} onClick={() => setFileType("document")}>
                <p>Docs</p>
              </div>
            </div>
            <div className="files">
              {
                fileData
                .filter((file) =>{
                  // switch (fileType) {
                  //   case "media":
                  //     return file.type === "image" || file.type === "video";
                  //   case "links":
                  //     return file.type === "link";
                  //   case "docs":
                  //     return file.type === "document";
                  //   default:
                  //     return false;
                  // }
                  return file.type === fileType
                }
                )
                .map((file, index) => (
                  <>
                    {file.type === "image" ? <MediaFileTemplate name={file.name} size={file.size} key={index}/> : <></>}
                    {file.type === "link" ? <LinkFileTemplate name={file.name} url={file.url} key={index}/> : <></>}
                    {file.type === "document" ? <DocumentFileTemplate name={file.name} size={file.size} key={index}/> : <></>}
                  </>
                ))
              }
            </div>
          </div>
      )
    }
  }
  function ChatPageLeft() {
    return (
      <>
        <div className="left">
          <SearchBar />
          <div className="chat-classification">
            <div onClick={handleShowAllChats} className="classification" style={{backgroundColor: `${selectedClassification === null && "#0177fb1a"}`, color: `${selectedClassification === null && "#2A52BE"}`}}>
              <p>General</p>
            </div>
            <div
              onClick={() => handleClassificationClick("Group")}
              className="classification groups"
              style={{backgroundColor: `${selectedClassification === "Group" && "#0177fb1a"}`, color: `${selectedClassification === "Group" && "#2A52BE"}`}}
            >
              <p>Groups</p>
            </div>
            <div
              onClick={() => handleClassificationClick("Private")}
              className="classification private"
              style={{backgroundColor: `${selectedClassification === "Private" && "#0177fb1a"}`, color: `${selectedClassification === "Private" && "#2A52BE"}`}}
            >
              <p>Private</p>
            </div>
          </div>
          <div className="chat-profiles" style={{ zIndex: `${elementZIndex}` }}>
            {chatdata && filteredList.length === 0 ? (
              chatdata
                .filter((chat) =>
                  selectedClassification
                    ? chat.type === selectedClassification
                    : true
                )
                .map((chat, index) => (
                  <CPTemplate
                    key={index}
                    data={chat}
                    onUserProfileClick={handleUserProfileClick}
                  />
                ))
            ) : (
              <div style={{ display: searchValue === `${[]}` ? "none" : "" }}>
                {filteredList ? (
                  filteredList.map((item, index) => (
                    <CPTemplate
                      key={index}
                      data={item}
                      onUserProfileClick={handleUserProfileClick}
                    />
                  ))
                ) : (
                  <>{searchDataType} not found</>
                )}
              </div>
            )}
            <div className="add-chat-icon" onClick={() => toggleAddChatSlide1()}>
              <div className="cross-vert-line"></div>
              <div className="cross-horiz-line"></div>
            </div>
          </div>
          {/* <div className="left-bottom">
          </div> */}
        </div>
        {invisibleBackground && (
          <div
            className="invisible-background"
            onClick={() => handleClearAll()}
          />
        )}
      </>
    );
  }
  function AddChat() {
    return (
      <>
        {isChatSlide1Visible && (
          <div className="add-new-chat-profile">
            <label>
              <h4>Group name</h4>
              <input
                type="text"
                placeholder="Enter group name"
                name="chat-input"
                autoComplete="off"
              />
            </label>
            <label>
              <h4>Course Title</h4>
              <input
                type="text"
                placeholder="Enter course title"
                name="chat-input"
                autoComplete="off"
              />
            </label>
            <label className="long-label">
              <h4>Group description</h4>
              <input
                type="text"
                placeholder="Group Description"
                name="chat-input"
                autoComplete="off"
              />
            </label>
            <div className="action-div">
              <div className="button button1" onClick={toggleAddChatSlide2}>
                <p>Next</p>
              </div>
              <div className="button button2" onClick={toggleAddChatSlide1}>
                <p>Cancel</p>
              </div>
            </div>
          </div>
        )}
        {isChatSlide2Visible && (
          <div className="add-new-chat-profile">
            <h3>Add group members</h3>
            <p>Add a group member by email or use invite link.</p>
            <label>
              <input
                type="text"
                placeholder="Eg. akin@gmail.com"
                name="chat-input"
                autoComplete="off"
              />
            </label>
            <div className="action-div">
              <div className="button button1">
                <p>Send</p>
              </div>
              <div className="button button2" onClick={toggleAddChatSlide2}>
                <p>Copy invite link</p>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
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
        <h2>Chats</h2>
      </div>
    )
  }
  function SearchBar() {
    const handleInputClick = () => {};

    return (
      <>
        {invisibleReset && (
          <div className="invisible-reset" onClick={handleReset} />
        )}
        <div className="search-bar">
          <SearchIcon />
          <input
            type="search"
            name="search"
            id="search"
            value={searchValue}
            placeholder={`Search for ${
              selectedClassification ? selectedClassification : ""
            } Chat`}
            onChange={(event) => handleSearchFilter(event.target.value)}
            onClick={handleInputClick}
          />
        </div>
      </>
    );
  }
  function MediaFileTemplate({name, size}){
    return(
      <div className="media-file">
        <Image src={`/Images/chatmedia/${name}`} height={100} width={100} alt=""></Image>
      </div>
    )
  }
  function LinkFileTemplate({name, url}){
    return(
      <Link href={url} className="link-file">
        <div className="link-image"></div>
        <p>{url}</p>
      </Link>
    )
  }
  function DocumentFileTemplate(){
    return(
      <div className="doc-file"></div>
    )
  }
}
