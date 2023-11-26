import { useState, useEffect } from "react";

// import NFTCard from "./NFTCard";
import SearchIcon from "./assets/search.svg";
import Logo from "./assets/logo1.png";
// import { Link } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";

// const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

// const Navbar = () => {
//   const [scrollPos, setScrollPos] = useState(0);
//   window.onscroll = function () {
//     setScrollPos(window.scrollY);
//   };
//   return (
//     <AnimatePresence>
//       {scrollPos > 0 ? null : (
//         <motion.div
//           initial={{ y: "-100" }}
//           animate={{ y: 0 }}
//           exit={{ y: "-100%" }}
//           className="w-full bg-lukso-fuchsia text-lukso-soft-grey"
//         >
//           <div className="w-full flex flex-row items-center justify-evenly px-[300px]">
//             <img
//               className="w-[80px] aspect-square rounded-full my-2"
//               src={Logo}
//               alt="App Logo"
//             />
//             <Link to="" className="">
//               Home
//             </Link>
//             <Link to="" className="">
//               Community
//             </Link>
//             <Link to="" className="">
//               Contact
//             </Link>
//             <Link to="/profile" className="">
//               Profile
//             </Link>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

const App = () => {
  //const [searchTerm, setSearchTerm] = useState("");
  //const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   searchMovies("Batman");
  // }, []);

  // const searchMovies = async (title: string) => {
  //   const response = await fetch(`${API_URL}&s=${title}`);
  //   const data = await response.json();

  //   setMovies(data.Search);
  // };

  return (
    <>
      <div className="">
          <h1 className="">We are Insta-Wallet!!</h1>
      </div>

      <div>
          <button onClick={() => { window.location.href = "http://localhost:5173/signup" }}>Join Us!</button>
      </div>
    </>

    // <>
    //   <div className="app">
    //     <h1>NFT Marketplace</h1>

    //     <div className="search">
    //       <input
    //         value={searchTerm}
    //         onChange={(e) => setSearchTerm(e.target.value)}
    //         placeholder="Search for NFT's"
    //       />
    //       <img
    //         src={SearchIcon}
    //         alt="search"
    //         onClick={() => searchMovies(searchTerm)}
    //       />
    //     </div>

    //     {movies?.length > 0 ? (
    //       <div className="container">
    //         {movies.map((movie) => (
    //           <NFTCard movie={movie} />
    //         ))}
    //       </div>
    //     ) : (
    //       <div className="empty">
    //         <h2>No movies found</h2>
    //       </div>
    //     )}
    //   </div>
    // </>
  );
};

export default App;
