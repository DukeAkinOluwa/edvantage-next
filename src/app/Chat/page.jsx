"use client";

import React, { useEffect, useState, useRef, useContext } from "react";
import PageRightHeader from "@/components/PageRightHeader";
import CPTemplate from "@/components/templates/CPTemplate";
import SearchIcon from "@/icons/search";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { addTask, updateTask } from '@/utils/indexedDB';
import InAppPopupNotification from "@/components/InAppPopupNotification";
// import { BottomNavContext, TopNavContext } from "@/contexts/BottomNavContext";

export default function Chats() {
  const [viewportWidth, setViewportWidth] = useState(null);
  const [userData, setUserData] = useState(null);
  const [selectedClassification, setSelectedClassification] = useState(null);
  const [selectedUserProfile, setSelectedUserProfile] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [invisibleReset, setInvisibleReset] = useState(false);
  const [invisibleBackground, setInvisibleBackground] = useState(false);
  const [isChatSlide1Visible, setIsChatSlide1Visible] = useState(false);
  const [isChatSlide2Visible, setIsChatSlide2Visible] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [back, setBack] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [elementZIndex, setElementZIndex] = useState("");
  const [popupNotificationTitle, setPopupNotificationTitle] = useState("")
  const [popupNotificationText, setPopupNotificationText] = useState("")
  const [popupHeight, setPopupHeight] = useState(false)
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
        chat: []
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
            category: {
              name: "text"
            }
          },
          {
            sender: "Akin",
            message: "Hi",
            category: {
              name: "text"
            }
          },
          {
            sender: "Akin",
            message: "Whatsup good? I saw the text message you sent a few days back but I cheared all my chats by mistake and I kinda forgot to respond to your text.",
            category: {
              name: "text"
            }
          },
          {
            sender: "John",
            message: "Oooh ooh, that's alright.",
            category: {
              name: "text"
            }
          },
          {
            sender: "Akin",
            message: "I spoke with the photographer already and he says that he will be free throughout next week.",
            category: {
              name: "text"
            }
          },
          {
            sender: "John",
            message: "Thank God o.",
            category: {
              name: "text"
            }
          },
          {
            sender: "John",
            message: "So how much do you think he will request for?.",
            category: {
              name: "text"
            }
          },
          {
            sender: "John",
            message: "I want him to be available throughout the event and the event should last for about 3 hours.",
            category: {
              name: "text"
            }
          },
          {
            sender: "Akin",
            message: "He charges about 20k per hour but since you're coming from me, he should charge you about 15 thousand per hour.",
            category: {
              name: "text"
            }
          },
          {
            sender: "Akin",
            message: "Let's just say 15.",
            category: {
              name: "text"
            }
          },
          {
            sender: "John",
            message: "Wow.",
            category: {
              name: "text"
            }
          },
          {
            sender: "Akin",
            title: "400L Class Timetable",
            subtitle: "Mechatronics Engineering",
            message: "Checkout this Timetable.",
            category: {
              name: "timetable",
              type: "class"
            },
            events: [
              {
                  title: "MCT304",
                  startTime: "08:00",
                  endTime: "10:00",
                  type: "class",
                  date: "2024-07-08",
                  repeat: "weekly"
              },
              {
                  title: "EEE304",
                  startTime: "11:00",
                  endTime: "13:00",
                  type: "class",
                  date: "2024-07-08",
                  repeat: "weekly"
              },
              {
                  title: "MCT302",
                  startTime: "14:00",
                  endTime: "16:00",
                  type: "class",
                  date: "2024-07-08",
                  repeat: "weekly"
              },
              {
                  title: "PHY312",
                  startTime: "16:00",
                  endTime: "18:00",
                  type: "class",
                  date: "2024-07-08",
                  repeat: "weekly"
              },
              {
                  title: "ICT324",
                  startTime: "08:00",
                  endTime: "09:00",
                  type: "class",
                  date: "2024-07-09",
                  repeat: "weekly"
              },
              {
                  title: "MCT308",
                  startTime: "10:00",
                  endTime: "12:00",
                  type: "class",
                  date: "2024-07-09",
                  repeat: "weekly"
              },
              {
                  title: "ENG302",
                  startTime: "14:00",
                  endTime: "16:00",
                  type: "class",
                  date: "2024-07-09",
                  repeat: "weekly"
              },
              {
                  title: "GES302",
                  startTime: "16:00",
                  endTime: "18:00",
                  type: "class",
                  date: "2024-07-09",
                  repeat: "weekly"
              },
              {
                  title: "EEE306",
                  startTime: "07:00",
                  endTime: "08:00",
                  type: "class",
                  date: "2024-07-10",
                  repeat: "weekly"
              },
              {
                  title: "ENG302",
                  startTime: "08:00",
                  endTime: "10:00",
                  type: "class",
                  date: "2024-07-10",
                  repeat: "weekly"
              },
              {
                  title: "CEN304",
                  startTime: "10:00",
                  endTime: "12:00",
                  type: "class",
                  date: "2024-07-10",
                  repeat: "weekly"
              },
              {
                  title: "EEE306",
                  startTime: "08:00",
                  endTime: "10:00",
                  type: "class",
                  date: "2024-07-11",
                  repeat: "weekly"
              },
              {
                  title: "CEN302",
                  startTime: "12:00",
                  endTime: "14:00",
                  type: "class",
                  date: "2024-07-11",
                  repeat: "weekly"
              }
            ]
          },
        ],
      },
      {
        type: "Private",
        imageid: "Debo.png",
        title: "Debo",
        lasttext: "ENG305",
        noofmembers: 86,
        chat: []
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

    const handleResize = () => {
      setViewportWidth(window.innerWidth);
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
    
  useEffect(() => {
      const timeout = setTimeout(() => {
          setPopupHeight(false)
      }, 4000);
  
      return () => clearTimeout(timeout);
  }, [popupHeight]);

  function handleSetBack(booleanValue, elementIndex) {
    setBack(booleanValue);
    setElementZIndex(elementIndex);
  }
  
  function handleShowPopupNotification(title, text, pheight){
    setPopupNotificationTitle(title)
    setPopupNotificationText(text)
    setPopupHeight(pheight)
  }

  const handleClassificationClick = (classification) => {
    setSelectedClassification(classification);
  };

  const handleShowAllChats = () => {
    setSelectedClassification(null);
  };

  const handleUserProfileClick = (userProfile) => {
    setSelectedUserProfile(userProfile);
    setCurrentPage(2);
    handleReset();
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

  const handleReset = () => {
    setFilteredList([]);
    setSearchValue("");
    setInvisibleReset(false);
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
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  function getWholeChatSection() {
    function getIndividualPageHeader() {
      switch (true) {
        case viewportWidth < 1001:
          return(
            <IndividualPageHeader />
          )
        default:
          break;
      }
    }
    switch (true) {
      case viewportWidth < 656 && currentPage === 1:
        return (
          <div className="whole-chat-section">
            <IndividualPageHeader />
            <ChatPageLeft />
            <AddChat />
          </div>
        );
      case viewportWidth < 656 && currentPage === 2:
        return (
          <div className="whole-chat-section">
            <UserProfileDetails
              selectedUserProfile={selectedUserProfile}
            />
          </div>
        );
      case viewportWidth >= 656:
        return (
          <div className="whole-chat-section">
            {getIndividualPageHeader()}
            <ChatPageLeft />
            <UserProfileDetails
              selectedUserProfile={selectedUserProfile}
            />
            <AddChat />
          </div>
        );
      default:
        return null; // Handle unexpected cases
    }
  }
  

  return (
    <>
      <span className="chat-page">
        {getWholeChatSection()}
      </span>
      <InAppPopupNotification popupNotificationText={popupNotificationText} popupNotificationTitle={popupNotificationTitle} popupHeight={popupHeight} />
    </>
  );
  function UserProfileDetails({ selectedUserProfile }) {
    const [showScrollToBottom, setShowScrollToBottom] = useState(false);
    const [isAboutProfileVisible, setIsAboutProfileVisible] = useState(false);
    const chatEndRef = useRef(null);
    const chatBodyRef = useRef(null);
    const [fileType, setFileType] = useState("image")

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

    function getSelectedUserProfile() {
      switch (selectedUserProfile) {
        case null:
          return(
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
          )
        default:
          return(
            <>
              <div className="chat-header" onClick={() => setIsAboutProfileVisible(true)}>
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" onClick={handleRefreshClick}>
                  <path d="M15 8H1M1 8L8 15M1 8L8 1" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <Image src={`/Images/profile/${selectedUserProfile.imageid}`} alt="profile" height={40} width={40}/>
                <h3>{selectedUserProfile.title}</h3>
              </div>
              <div className="chat-body" ref={chatBodyRef}>
                {getChatBody()}
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
          );
      }
    }
    
    function getChatBody() {
      function getChatTextContent(content) {
        switch (content.category.name) {
          case "text":
            return(
              <div className="text" style={{
                alignSelf:
                  content.sender === selectedUserProfile.title
                    ? "flex-end"
                    : "flex-start",
                backgroundColor:
                  content.sender === selectedUserProfile.title
                    ? "#2A52BE"
                    : "#F2F2F7",
                color:
                  content.sender === selectedUserProfile.title
                    ? "#FEFAFA"
                    : "",
              }}
            >
              <p>{content.message}</p>
            </div>
            )
          default:
            break;
        }
      }
      function getChatTimetableContent(content) {
        function handleAddChatTimetable(){
          content.events.map((timetableclass)=>{
            addTask(timetableclass)
          })
          handleShowPopupNotification("Timetable Added Successfully", "Events have been added to your Calendar", true)
        }
        switch (content.category.name) {
          case "timetable":
            return(
              <div className="chat-timetable" style={{
                alignSelf:
                  content.sender === selectedUserProfile.title
                    ? "flex-end"
                    : "flex-start",
                backgroundColor:
                  content.sender === selectedUserProfile.title
                    ? "#2A52BE"
                    : "#F2F2F7",
                color:
                  content.sender === selectedUserProfile.title
                    ? "#FAFBFD"
                    : "",
                }}
              >
                <div className="highlight">
                  {/* <h3>{content.category.type === "class" ? "Class " : "Exam "} Timetable</h3> */}
                </div>
                <div className="texts">
                  <h3>{content.title}</h3>
                  <p>{content.subtitle}</p>
                </div>
                <div className="options">
                  <div className="button">
                    <p>Edit</p>
                  </div>
                  <div className="button" onClick={handleAddChatTimetable}>
                    <p>Add</p>
                  </div>
                </div>
              </div>
            )
            break;
        
          default:
            break;
        }
      }
      switch (selectedUserProfile.chat.length) {
        case 0:
          return(
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
          )
        default:
          return(
            <>
              {selectedUserProfile.chat.map((chat, index) => {
                return(
                  <>
                    {getChatTextContent(chat)}
                    {getChatTimetableContent(chat)}
                  </>
                )
              })}
              <div ref={chatEndRef} />
            </>
          )
      }
    }

    return (
      <div className="right">
        {getSelectedUserProfile()}
        {getChatAboutProfile()}
      </div>
    );
    function getChatAboutProfile(){
      function getFileTemplate(file, index) {
        switch (file.type) {
          case "image":
            return(
              <MediaFileTemplate name={file.name} size={file.size} key={index}/>
            )
          case "link":
            return(
              <LinkFileTemplate name={file.name} url={file.url} key={index}/>
            )
          case "document":
            return(
              <DocumentFileTemplate name={file.name} size={file.size} key={index}/>
            )
          default:
            break;
        }
      }
      switch (isAboutProfileVisible) {
        case true:
          return(
            <div className="chat-about-profile">
              <Image src={`/Images/profile/${selectedUserProfile.imageid}`} alt="profile" height={350} width={300} />
              <div className="back-arrow-cont">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" onClick={() => setIsAboutProfileVisible(false)} className="back-arrow" >
                  <path d="M15 8H1M1 8L8 15M1 8L8 1" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="files">
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
                      {getFileTemplate(file, index)}
                    </>
                  ))
                }
              </div>
            </div>
          )
        default:
          break;
      }
    }
  }
  function ChatPageLeft() {
    function getChatClassificationComponent() {
      switch (filteredList.length) {
        case 0:
          return(
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
          )
        default:
          break;
      }
    }
    function getChatProfiles() {
      switch (true) {
        case (chatdata && searchValue.length === 0):
          return (
            <div className="chat-profiles" style={{ zIndex: `${elementZIndex}` }}>
              {chatdata
                .filter((chat) =>
                  selectedClassification ? chat.type === selectedClassification : true
                )
                .map((chat, index) => (
                  <CPTemplate
                    key={index}
                    data={chat}
                    onUserProfileClick={handleUserProfileClick}
                  />
                ))}
            </div>
          );
        case (((searchValue !== `${[]}`) && (filteredList.length !== 0))):
          return (
            <div style={{ display: "" }}>
              {filteredList.map((item, index) => {
                return(
                  <CPTemplate
                    key={index}
                    data={item}
                    onUserProfileClick={handleUserProfileClick}
                  />
                )
              })}
            </div>
          );
        case ((searchValue !== `${[]}`) && (filteredList.length === 0)):
          return <div className="chat-profiles" style={{ zIndex: `${elementZIndex}` }}>User Profile not found</div>;
        default:
          return null; // Handle unexpected cases or empty data
      }
    }

    return (
      <>
        <div className="left">
          <SearchBar />
          {getChatClassificationComponent()}
          <div className="chat-profiles" style={{ zIndex: `${elementZIndex}` }}>
            {getChatProfiles()}
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
    const [isImageExpanded, setIsImageExpanded] = useState(false)
    function getImageExpanded(){
      switch (isImageExpanded) {
        case true:
          return(
            <>
              <div className="image-expanded">
                <Image src={`/Images/chatmedia/${name}`} width={400} height={1000} alt=""></Image>
                <div className="image-expanded-header">
                  <svg width="18" height="18" viewBox="0 0 16 16" onClick={() => setIsImageExpanded(false)} className="back-arrow" >
                    <path d="M15 8H1M1 8L8 15M1 8L8 1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p>{name}</p>
                </div>
              </div>
            </>
          )
        default:
          break;
      }
    }
    return(
      <>
        <div className="media-file" onClick={() => setIsImageExpanded(true)}>
          <Image src={`/Images/chatmedia/${name}`} height={100} width={100} alt=""></Image>
        </div>
        {getImageExpanded()}
      </>
    )
  }
  function LinkFileTemplate({name, url}){
    function getFirstTwoValidChars(word) {
      // Handle empty string or strings with less than 2 characters
      if (!word || word.length < 2) {
        return "";
      }
    
      const firstChar = word.charAt(0);
      const secondChar = word.charAt(1);
    
      // Check if both characters are alphanumeric (letters or numbers)
      if (/\w/.test(firstChar) && /\w/.test(secondChar)) {
        return(
          <h1>{firstChar + secondChar}</h1>
        );
      } else {
        // If not valid, return an empty string
        return(
          <h1>Li</h1>
        )
      }
    }
    return(
      <Link href={url} className="link-file">
        <div className="link-image"><h4>{getFirstTwoValidChars(name)}</h4></div>
        <div className="text">
          <h3>{name}</h3>
          <p>{url}</p>
        </div>
      </Link>
    )
  }
  function DocumentFileTemplate(){
    return(
      <div className="doc-file"></div>
    )
  }
}