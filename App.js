import './App.css';
import { useState } from 'react';
import Headline from './components/Headline';
import { useWeather } from './api';
import SearchBar from './components/SearchBar';
const API_URL = `http://4.237.58.241:3000`;


export default function App() {
  const [ search, setSearch ] = useState("Brisbane");
  const { loading, headlines, error } = useWeather(search);
  const login = () => {
    const url = `${API_URL}/user/login`;

    return fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: "mike@gmail.com", password: "password" }),
    })
    .then((res) =>
    res.json().then((res) => {
      localStorage.setItem("token", res.token);
      console.log(res);})
    )
      .catch((error) => console.log(error));
  };
  
  const getVolcanoDetails = () => {
    const url = `${API_URL}/volcano/1`;
    const token = localStorage.getItem("token");

    return fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then((res) =>
        res.json().then((res) => {
          console.log(res);
        })
      )
      .catch((error) => console.log(error));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error !== null) {
    return <p>Something went wrong... {error.message}</p>;
  }

  return (
    <div className="App">
      <h1>Brisbane Weather Forecast Today</h1>
      <SearchBar />
      {
        headlines.map(headline => <Headline key={headline.time} {...headline} />)
      }
    <h1>JWT Token Example</h1>
    <button onClick={login}>Login</button>
    </div>
  );
}


