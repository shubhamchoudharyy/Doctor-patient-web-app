import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Logout from './Logout';
import ChatInput from './ChatInput';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';


const ChatContainer = ({currentChat, currentUser, socket}) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentChat) {
          const response = await axios.post('/api/v1/messages/getmsg', {
            from: currentUser._id,
            to: currentChat._id,
          });
          setMessages(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    await axios.post('/api/v1/messages/addmsg', {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit('send-msg', {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-receive', (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: 'smooth' });
  }, [messages]);

  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar" />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages">
            {messages.map((message) => (
              <div ref={scrollRef} key={uuidv4}>
                <div className={`message ${message.fromSelf ? 'sended' : 'received'}`}>
                  <div className="content">
                    <p>{message.message}</p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
overflow: auto;
display: flex;
flex-direction: column;
height: 100%;

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3rem;
  height: 5rem;
  position: sticky;
  top: 0;
  background-color: #131324;
  z-index: 1;

  .user-details {
    display: flex;
    align-items: center;
    gap: 2rem;

    .avatar {
      img {
        height: 3rem;
      }
    }

    .username {
      h3 {
        color: white;
      }
    }
  }
}

.chat-messages {
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
  flex: 1;

  &::-webkit-scrollbar {
    width: 0.2rem;

    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }

  .message {
    display: flex;
    align-items: center;

    .content {
      max-width: 40%;
      overflow-wrap: break-word;
      padding: 1rem;
      font-size: 1.1rem;
      border-radius: 1rem;
      color: #d1d1d1;

      @media screen and (min-width: 720px) and (max-width: 1080px) {
        max-width: 70%;
      }
    }
  }

  .sended {
    justify-content: flex-end;

    .content {
      background-color: #4f04ff21;
    }
  }

  .received {
    justify-content: flex-start;

    .content {
      background-color: #9900ff20;
    }
  }
}

.chat-input {
  position: sticky;
  bottom: 0;
  background-color: #080420;
  padding: 0 2rem;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }

  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;

    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }

      .emoji-picker-react {
        position: absolute;
        top: 100%;
        left: 0;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;

        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;

          &-thumb {
            background-color: #9a86f3;
          }
        }

        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }

        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }

        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }

  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;

    input {
      flex: 1;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      outline: none;

      &::selection {
        background-color: #9a86f3;
      }
    }

    .submit {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      padding: 0.3rem 1rem;
      border-radius: 2rem;

      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
}
`;


export default ChatContainer;
