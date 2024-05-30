'use client'

import React, { useEffect, useState } from "react";
import PageRightHeader from "@/components/PageRightHeader";
import CPTemplate from "@/components/templates/CPTemplate";
import SearchIcon from "@/icons/search";
import Image from "next/image";

export default function Chats(){
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

    useEffect(() => {
        setViewportWidth(window.innerWidth);

        const handleResize = () => {
            setViewportWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchDataFromLocalStorage = async () => {
            try {
            const storedData = localStorage.getItem("userData");
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                setUserData(parsedData);
            } else {
                console.log("No user data found in local storage.");
            }
            } catch (error) {
            console.error("Error fetching data from local storage:", error);
            }
        };

        fetchDataFromLocalStorage();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
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
            handleSetBack(false, 1)
        } else {
            setIsChatSlide1Visible(true);
            setInvisibleBackground(true);
            handleSetBack(true, 0)
        }
    };
    
    const toggleAddChatSlide2 = () => {
        setIsChatSlide1Visible(false);
        setIsChatSlide2Visible(!isChatSlide2Visible);
        setInvisibleBackground(!isChatSlide2Visible);
        if(isChatSlide1Visible){
        }else{
          handleSetBack(false, 1)
        }
    };
    
    const handleClearAll = () => {
        setIsChatSlide1Visible(false);
        setIsChatSlide2Visible(false);
        setInvisibleBackground(false);
    };

    function SearchBar() {
        const handleInputClick = () => {
        };
      
        return (
          <>
            {invisibleReset && <div className="invisible-reset" onClick={handleReset} />}
            <div className="search-bar">
              <SearchIcon />
              <input
                type="search"
                name="search"
                id="search"
                value={searchValue}
                placeholder={`Search for ${selectedClassification ? selectedClassification : ""} Chat`}
                onChange={(event) => handleSearchFilter(event.target.value)}
                onClick={handleInputClick}
              />
            </div>
          </>
        );
    };
      
    
    return (
        <span className="chat-page">
          {viewportWidth < 768 && currentPage === 2 ? (
              <></>
            ) : (
              <PageRightHeader
                  page_title={`Settings`}
                  userlevel="23"
                  handleShowSearchBar={handleShowSearchBar}
                  handleSetBack={handleSetBack}
                  elementIndex={"-1"}
              />
            )}
            {viewportWidth < 768 ? (
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
        function handleRefreshClick() {
          setCurrentPage(1);
          setSelectedUserProfile(null);
        }
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
                    onClick={handleRefreshClick}>
                    <path
                      d="M15 8H1M1 8L8 15M1 8L8 1"
                      stroke="#101828"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <Image src={`/Images/profile/${selectedUserProfile.imageid}`} alt="profile" height={40} width={40} />
                  <h3>{selectedUserProfile.title}</h3>
                </div>
                <div className="chat-body">
                  {selectedUserProfile.chat ? (
                    selectedUserProfile.chat.map((chat, index) => (
                      <div
                        key={index}
                        className="text"
                        style={{
                          alignSelf: chat.sender === selectedUserProfile.title ? "flex-end" : "",
                          backgroundColor: chat.sender === selectedUserProfile.title ? "#2A52BE" : "#F2F2F7",
                          color: chat.sender === selectedUserProfile.title ? "#FEFAFA" : "",
                        }}>
                        <p>{chat.message}</p>
                      </div>
                    ))
                  ) : (
                    <div className="empty-chat-body">
                      <div className="display-container">
                        <Image src={`/Images/svg-alternatives/empty-chat-svg2.png`} alt="chatimage" height={250} width={250} sizes="(max-width: 100%), (max-height: 70%)" />
                        <p>Welcome to {selectedUserProfile.title}<br /><br />Start a chat</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="chat-input-box">
                  {/* <img src={`./Images/svg-alternatives/smiley.png`} alt="emoji" /> */}
                  <label>
                    <input
                      type="text"
                      placeholder="Start typing..."
                      name="chat-input"
                      autoComplete="off"
                    />
                  </label>
                  {/* <img src={`./Images/svg-alternatives/mention.png`} alt="mention" />
                  <img src={`./Images/svg-alternatives/paper-airplane.png`} alt="send" /> */}
                </div>
              </>
            ) : (
              <div className="chat-body empty-chat-body">
                <div className="display-container">
                  <Image src={`/Images/svg-alternatives/empty-chat-svg.png`} alt="chatimage" height={211} width={465} sizes="(max-width: 100%), (max-height: 70%)" />
                  <p>Pick a person or group from left sidebar chat list, and start your conversation.</p>
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
              <div onClick={() => handleClassificationClick("Group")} className="classification groups">
                <p>Groups</p>
              </div>
              <div onClick={() => handleClassificationClick("Private")} className="classification private">
                <p>Private</p>
              </div>
              <div className="icon-div" style={{ width: `${isSearchBarVisible ? "0px" : ""}` }} onClick={handleShowSearchBar}>
                <SearchIcon />
              </div>
            </div>
            <div className="chat-profiles" style={{ zIndex: `${invisibleBackground === true || back || invisibleReset ? elementZIndex : ""}` }}>
              {chatdata && filteredList.length === 0 ? (
                chatdata
                  .filter((chat) => selectedClassification ? chat.type === selectedClassification : true)
                  .map((chat, index) => (
                    <CPTemplate key={index} data={chat} onUserProfileClick={handleUserProfileClick} />
                  ))
              ) : (
                <div style={{ display: searchValue === `${[]}` ? "none" : "" }}>
                  {filteredList ? (
                    filteredList.map((item, index) => (
                      <CPTemplate key={index} data={item} onUserProfileClick={handleUserProfileClick} />
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
              <div className="invisible-background" onClick={() => handleClearAll()} />
            )}
          </div>
        );
    }
    function AddChat(){
      return(
        <>
        {isChatSlide1Visible && (
          <div className="add-new-chat-profile">
            <label>
              <h4>Group name</h4>
              <input type="text" placeholder="Enter group name" name="chat-input" autoComplete="off" />
            </label>
            <label>
              <h4>Course Title</h4>
              <input type="text" placeholder="Enter course title" name="chat-input" autoComplete="off" />
            </label>
            <label className="long-label">
              <h4>Group description</h4>
              <input type="text" placeholder="Group Description" name="chat-input" autoComplete="off" />
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
              <input type="text" placeholder="Eg. akin@gmail.com" name="chat-input" autoComplete="off" />
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
      )
    }
}