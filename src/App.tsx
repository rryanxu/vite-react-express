import './App.css'
import { useEffect, useState } from 'react';

const getGreeting = async function () {
  const res = await fetch("/api/test");
  return await res.json();
};


function App() {

  const [greeting, setGreeting] = useState(""); // Add this

  useEffect(() => { // Add this hook
    getGreeting().then((res) => setGreeting(res.greeting));
  }, []);


  return (
    <>
    <p>Server response: {greeting}</p> 
    </>
  )
}

export default App
