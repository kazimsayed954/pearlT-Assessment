import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client';
import './App.css'

const socket = io('http://localhost:3000');


function App() {
  const [count, setCount] = useState(0);
  
useEffect(() => {
  // Listen for notification events from the server
  socket.on('notification', (data) => {
    console.log('data', data)
    toast.info(`New Notification from ${data.email}: ${data.message}`);
  });

  // Cleanup on component unmount
  return () => {
    socket.off('notification');
  };
}, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <ToastContainer
      closeOnClick={true}
      />
    </>
  )
}

export default App
