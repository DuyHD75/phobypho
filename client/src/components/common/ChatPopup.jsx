import { Avatar, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { LuSendHorizonal } from "react-icons/lu";
import { Chat, Close } from '@mui/icons-material';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, getDocs } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux";
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import logo from '../../assets/img/avatars/administrator.svg';

const firebaseConfig = {
  apiKey: "AIzaSyCypU58yX2MF7WLHnVrigFveubIFJAtWEg",
  authDomain: "phobypho-13784.firebaseapp.com",
  projectId: "phobypho-13784",
  storageBucket: "phobypho-13784.appspot.com",
  messagingSenderId: "332219407200",
  appId: "1:332219407200:web:4b5070d9997dae2be11c05",
  measurementId: "G-1XFYGFM6ZZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);



const ChatPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [roomId, setRoomId] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);

  const { user } = useSelector((state) => state.user);
  console.log(user);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isVisible]); // Depend on messages to scroll down on new messages

  useEffect(() => {
    const savedRoomId = localStorage.getItem('roomId');
    if (user || savedRoomId) {
      setRoomId(savedRoomId);
    }
    else setRoomId(null);

  }, [user]);

  // useEffect(() => {
  //   if (user) {
  //     // Clear chat messages and create a new room when the user logs in
  //     setMessages([]);
  //     createRoomIfNeeded();
  //   }
  // }, [user]);
  function createRoomIfNeeded() {
    const newRoomId = uuidv4();
    setRoomId(newRoomId);

    // Add the new room to Firestore
    addDoc(collection(db, 'chatRooms'), {
      createdAt: serverTimestamp(),
      roomId: newRoomId,
      avatar: user ? user.userData.account.avatar : null,

    })
      .then(() => {
        console.log('Room created successfully');
      })
      .catch((error) => {
        console.error('Error creating chat room: ', error);
        setError('Error creating chat room.');
      });
    localStorage.setItem('roomId', newRoomId);
  }


  useEffect(() => {
    if (roomId) {
      const q = query(collection(db, `chatRooms/${roomId}/messages`), orderBy('timestamp'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map(doc => doc.data()));
      }, (error) => {
        console.error('Error fetching messages: ', error);
        setError('Error fetching messages.');
      });

      return () => unsubscribe();
    }
    else {
      setMessages([]);
    }
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log('Sending message: ', input);
    if (!roomId) {
      // setMessages([]);
      createRoomIfNeeded();
    }


    if (roomId) {
      try {
        await addDoc(collection(db, `chatRooms/${roomId}/messages`), {
          text: input,
          timestamp: serverTimestamp(),
          sender: user ? user.userData.account.username : 'Anonymous User',
          avatar: user ? user.userData.account.avatar : null,

        });
        setInput('');
      } catch (error) {
        console.error('Error sending message: ', error);
        setError('Error sending message.');
      }
    }
  };

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const messagesWithAvatarVisibility = messages.reduce((acc, message, index) => {
    const showAvatar = message.sender === 'Admin' && (index === 0 || messages[index - 1].sender !== 'Admin');
    acc.push({ ...message, showAvatar });
    return acc;
  }, []);

  return (
    <div>
      <Button
        sx={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 999,
          backgroundColor: '#2D89E5',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
        }}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        {isVisible ? <Close /> : <Chat />}
      </Button>
      {isVisible && (
        <Box
          display="flex"
          flexDirection="column"
          borderRadius='8px'
          sx={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '330px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            zIndex: 999
          }}
        >
          <Stack width='100%' display='flex' direction='row' justifyContent='space-between' alignItems='center' bgcolor='#2D89E5' p={1} borderRadius='8px 8px 0 0'>
            <Stack direction='row' alignItems='center'>
              <Avatar size='xs' src={logo} />
              <Stack ml={1} direction='column'>
                <Typography variant="h7" color='white'>Admin</Typography>
                <Typography variant="body2" color='white'>Chat với chúng tôi</Typography>
              </Stack>
            </Stack>
            <IoMdClose onClick={() => setIsVisible(false)} />
          </Stack>
          <Box height='30vh' overflow='auto' bg='#FFFFFF' padding='16px' >

            {messagesWithAvatarVisibility.map((message, index) => (
              <Flex mb={1} alignItems='center' direction={message.sender === 'Admin' ? 'row' : 'row-reverse'} key={index}>
                {message.showAvatar ? (
                  <Avatar name="Admin" src={logo} size="md" />
                ) : message.sender === 'Admin' ? (
                  <Box width="30px" height="30px" /> // Hiển thị Box trống chỉ khi là tin nhắn của Admin và không có avatar
                ) : null}
                <Box maxWidth='200px' width='fit-content' ml={message.showAvatar || message.sender !== 'Admin' ? 2 : 10} bg='#E7E6EB' padding='7px' borderRadius='10px' mb={3}>
                  <Text>{message.text}</Text>
                </Box>
              </Flex>
            ))}
            <div ref={messagesEndRef} />

          </Box>
          <Box bg='#FFFFFF' borderRadius='0 0 8px 8px' >
            <form onSubmit={sendMessage} >
              <TextField
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton type="submit" edge="end">
                        <LuSendHorizonal />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              /></form>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default ChatPopup;
