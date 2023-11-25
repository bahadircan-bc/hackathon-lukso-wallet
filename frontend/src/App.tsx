import { useState, useEffect } from "react";

import NFTCard from "./NFTCard";
import SearchIcon from "./assets/search.svg";
import Logo from "./assets/logo1.png";

import { Link } from "react-router-dom";

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title: string) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };
  return (
    <div className="app">
      <div className="avatar-container">
        <div className="logo-and-texts">
          <img className="avatar" src={Logo} alt="App Logo" />
          <div className="avatar-texts">
            <span className="avatar-text">Home</span>
            <span className="avatar-text">Community</span>
            <span className="avatar-text">Contact</span>
            <span className="avatar-text">Profile</span>
          </div>
        </div>
      </div>
      
      <h1>NFT Marketplace</h1>

      <div className="search">
        <input  
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for NFT's"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <NFTCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;