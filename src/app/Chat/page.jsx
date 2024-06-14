"use client";

import React, { useEffect, useState, useRef, useContext } from "react";
import PageRightHeader from "@/components/PageRightHeader";
import CPTemplate from "@/components/templates/CPTemplate";
import SearchIcon from "@/icons/search";
import Image from "next/image";
import { BottomNavContext, TopNavContext } from "@/contexts/BottomNavContext";

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

  const { setIsBottomNavHidden } = useContext(BottomNavContext);
  const { setIsTopNavHidden } = useContext(TopNavContext);

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

  useEffect(() => {
    setViewportWidth(window.innerWidth);

    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      if (window.innerWidth > 654)  {
        setIsTopNavHidden(false);
        setIsBottomNavHidden(true)
      }else if (selectedUserProfile !== null) {
        console.log("hi")
        setIsBottomNavHidden(true)
        setIsTopNavHidden(true)
      }else{
        setIsTopNavHidden(true)
        setIsBottomNavHidden(false)
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [selectedUserProfile, setIsTopNavHidden]);

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
    hideNav();
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

  const hideNav = () => {
    setIsBottomNavHidden(true);
    if (viewportWidth < 655) {
      setIsTopNavHidden(true);
    }
  };

  const showNav = () => {
    setIsBottomNavHidden(false);
    setIsTopNavHidden(false);
  };

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
      {viewportWidth < 655 ? (
        <>
          {currentPage === 1 && (
            <div className="whole-chat-section">
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
    const chatEndRef = useRef(null);
    const chatBodyRef = useRef(null);

    useEffect(() => {
      const handleBackButton = (event) => {
        event.preventDefault();
        console.log("Back button clicked!");
        handleRefreshClick();
      };

      const addHistoryState = () => {
        window.history.pushState(null, "", window.location.pathname);
      };

      addHistoryState();
      window.addEventListener("popstate", handleBackButton);

      return () => {
        window.removeEventListener("popstate", handleBackButton);
      };
    }, []);

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

    const handleRefreshClick = () => {
      setCurrentPage(1);
      setSelectedUserProfile(null);
      showNav();
    };

    return (
      <div className="right">
        {selectedUserProfile ? (
          <>
            <div className="chat-header">
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
              <label>
                <input
                  type="text"
                  placeholder="Start typing..."
                  name="chat-input"
                  autoComplete="off"
                />
              </label>
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
      </div>
    );
  }
  function ChatPageLeft() {
    return (
      <div className="left">
        {isSearchBarVisible && <SearchBar />}
        <div className="chat-classification">
          <div onClick={handleShowAllChats} className="classification">
            <p>All Chats</p>
          </div>
          <div
            onClick={() => handleClassificationClick("Group")}
            className="classification groups"
          >
            <p>Groups</p>
          </div>
          <div
            onClick={() => handleClassificationClick("Private")}
            className="classification private"
          >
            <p>Private</p>
          </div>
          <div
            className="icon-div"
            style={{ width: `${isSearchBarVisible ? "0px" : ""}` }}
            onClick={handleShowSearchBar}
          >
            <SearchIcon />
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
        </div>
        <div className="left-bottom">
          <div className="add-chat-icon" onClick={() => toggleAddChatSlide1()}>
            <div className="cross-vert-line"></div>
            <div className="cross-horiz-line"></div>
          </div>
        </div>
        {invisibleBackground && (
          <div
            className="invisible-background"
            onClick={() => handleClearAll()}
          />
        )}
      </div>
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
}
