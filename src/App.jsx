import { useEffect, useState } from 'react';
import { Login, SignUp, Home } from './components/index';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { getCurrentUser, getUsers } from './connecting/connecting';
import Protected from './components/AuthLayout';
import { login as authLogin} from './store/authSlice';
import { setOnlineUsers, login as userLogin } from './store/users';
import { Toaster } from 'react-hot-toast';
import { io } from 'socket.io-client';
import { addMessage } from './store/selectedChat';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userData?._id); // Get userId from Redux store
  let socket;

  useEffect(() => {
    const call = async () => {
      try {
        const currentUserRes = await getCurrentUser();
        dispatch(authLogin(currentUserRes.message));

        const usersRes = await getUsers();
        dispatch(userLogin(usersRes.message));
      } catch (error) {
        console.log('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    call();
  }, [dispatch]);

  // Establishing socket connection once userId is available
  useEffect(() => {
    if (userId) {
      // Establish socket connection with userId as query parameter
      socket = io('http://localhost:8000', {
        query: { userId }, // Passing userId in the socket connection query
      });

      socket.on('connect', () => {
        console.log('Connected to socket server with userId:', userId);
      });

      socket.on("onlineUsers" , (users) => {
        dispatch(setOnlineUsers(users))
      })

      socket.on("newMessage" , (message) => {
        dispatch(addMessage(message))
      } )

      // Optional: Handle other socket events like disconnect, errors
      socket.on('disconnect', () => {
        console.log('Disconnected from socket server');
      });


      return () => {
        socket.disconnect(); // Clean up socket connection on unmount
      };
    }
  }, [userId]);

  if(!loading)return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={<Protected authentication={true}><Home /></Protected>} />
        <Route path="/login" element={<Protected authentication={false}><Login /></Protected>} />
        <Route path="/signup" element={<Protected authentication={false}><SignUp /></Protected>} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
