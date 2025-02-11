import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import B1Child from '../assets/image/B1Child.jpeg';
import AuthorImage from '../assets/image/author1.jpeg';
import Spinner from './Spinner';
import SearchBar from '../Components/SearchBar';
import { useTheme, useMediaQuery } from '@mui/material';
import Preloader from '../Components/Preloader';
import Newarrivals, { books as newbooks } from './Newarrivals';
import Review from './Review';
import crawdadsImage from '../assets/image/WhereTheCrawdadsSings.jpg';
import TheMidnightLibrary from '../assets/image/theMidnightLibrary.jpg';
import TheVanishingHalf from '../assets/image/theVanishingHalf.jpg';
import Dune from '../assets/image/Dune.jpg';
import KlaraAndtheSun from '../assets/image/klaraAndtheSun.jpg';
import ProjectHailMary from '../assets/image/projectHailMary.jpg';
import MalibuRising from '../assets/image/malibuRising.jpg';

const categories = [
  { name: "Romance", path: "/romance", gradient: "from-pink-400 to-red-400", darkGradient: "from-purple-600 to-purple-900" },
  { name: "Action", path: "/action", gradient: "from-blue-400 to-indigo-400", darkGradient: "from-indigo-500 to-blue-800" },
  { name: "Thriller", path: "/thriller", gradient: "from-gray-400 to-gray-600", darkGradient: "from-gray-700 to-black" },
  { name: "Fiction", path: "/fiction", gradient: "from-green-400 to-teal-400", darkGradient: "from-green-600 to-teal-800" },
  { name: "Tech", path: "/tech", gradient: "from-yellow-400 to-orange-400", darkGradient: "from-yellow-600 to-orange-800" },
  { name: "Philosophy", path: "/philosophy", gradient: "from-purple-400 to-pink-400", darkGradient: "from-purple-600 to-pink-800" },
  { name: "Manga", path: "/manga", gradient: "from-red-400 to-purple-400", darkGradient: "from-red-600 to-orange-800" },
];

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [bookNotFound, setBookNotFound] = useState(false);
  const [emptySearch, setEmptySearch] = useState(false);
  const [highlightedBookId, setHighlightedBookId] = useState(null);
  const navigate = useNavigate();
  const bookRefs = useRef({});

  useEffect(() => {

    setTimeout(() => {
      setData({
        featuredAuthor: {
          name: "John Doe",
          bio: "John Doe is a bestselling author known for his thrilling novels and captivating storytelling.",
          image: AuthorImage,
        },
      });
      setBooks(newbooks);
      setFilteredBooks(newbooks);
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleSearch = (query) => {
    if (query.length < 3) {
      setEmptySearch(true);
      setBookNotFound(false);
    } else {
      const filtered = newbooks.filter(book =>
        book.title && book.title.toLowerCase().includes(query.toLowerCase())
      );

      if (filtered.length === 0) {
        setBookNotFound(true);
        setEmptySearch(false);
        setFilteredBooks([]);
      } else {
        setFilteredBooks(filtered);
        setEmptySearch(false);
        setBookNotFound(false);
        setHighlightedBookId(filtered[0].id);
      }
    }
  };


  useEffect(() => {
    if (highlightedBookId) {
      const bookElement = bookRefs.current[highlightedBookId];
      if (bookElement) {
        bookElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [highlightedBookId]);


  return (
    <>
      <Preloader />
      <div className="bg-gray-100 dark:bg-[rgb(51,51,51)]">
        {isLoading && <Spinner />}
        {!isLoading && (
          <>

            {/* Search Bar */}
            {/* <SearchBar onSearch={handleSearch} /> */}
            {emptySearch && (
              <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 text-center mx-4">
                  <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-2">
                    Please Enter a Book Name..!!
                  </h2>
                  <p className="text-gray-900 text-sm sm:text-md mb-4">
                    You must type a book name in the search bar to search for books.
                  </p>
                  <button
                    onClick={() => setEmptySearch(false)}
                    className="mt-4 bg-black text-white font-semibold py-2 px-6 rounded-lg shadow-md transition transform duration-300 ease-in-out neon-btn"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {bookNotFound && (
              <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 text-center mx-4">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
                    alt="Book Not Found"
                    className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4"
                  />
                  <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-2">
                    Oops! Book Not Found
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-md mb-6">
                    Sorry, the book you're looking for isn't available right now.
                  </p>
                  <button
                    onClick={() => setBookNotFound(false)}
                    className="mt-4 bg-black text-white font-semibold py-2 px-6 rounded-lg shadow-md transition transform duration-300 ease-in-out neon-btn"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* Image Container */}
            <header className="bg-white shadow dark:bg-inherit">
              <div className="container mx-auto p-6">
                <img
                  src={B1Child}
                  alt="Book Store"
                  className="w-full max-h-[720px] object-cover rounded-lg shadow-lg"
                />

              </div>
            </header>

      <section className="container mx-auto my-12 px-6">
      <h2 className="text-4xl font-bold mb-10 text-gray-800 dark:text-white text-center">
        Book Categories
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {categories.map((category) => (
          <Link key={category.name} to={category.path} className="w-full sm:w-[300px]">
            <div
              className={`bg-gradient-to-r ${category.gradient} dark:${category.darkGradient} text-white rounded-lg shadow-lg p-8 text-center transition transform hover:scale-105 hover:shadow-xl h-[180px] flex flex-col justify-center`}
            >
              <h3 className="text-2xl font-semibold mb-2">{category.name}</h3>
              <p className="text-gray-100">Explore our {category.name.toLowerCase()} collection.</p>
            </div>
          </Link>
        ))}
      </div>
    </section>




            {/* New Arrivals Section */}
            
            <section className="py-8 dark:bg-[rgb(40,40,40)]">
              <h2 className="text-4xl font-bold mb-10 text-gray-800 dark:text-white text-center">
                New Arrivals
            </h2>
              <div className="flex flex-wrap justify-center gap-6">
                <Newarrivals
                  onBookClick={(bookTitle) => {
                    const book = newbooks.find(b => b.title === bookTitle);
                    if (book) {
                      setHighlightedBookId(book.id);  // Highlight the found book
                      navigate(`/book/${bookTitle}`);
                    }
                  }}
                  highlightedBookId={highlightedBookId}
                  bookRefs={bookRefs}
                  filteredBooks={filteredBooks} // Pass filteredBooks to display
                />
                {bookNotFound && <div className="text-center text-red-600">No books found matching your search.</div>}
              </div>
            </section>

            {/* Top Trending Books Section */}


            <section className="container mx-auto my-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">Top Trending Books</h2>
              <div className="overflow-x-auto">
                <div className="flex space-x-6">
                  <Link to="/where-the-crawdads-sing">
                    <div className="bg-white rounded-lg shadow-lg p-6 slide-in transition-opacity ease-in-out duration-500 dark:bg-[rgb(30,30,30)] w-64 flex flex-col hover:shadow-xl hover:scale-105 hover:bg-blue-100 dark:hover:bg-blue-800">
                      <img src={crawdadsImage} alt="Where the Crawdads Sing" className="mb-4 h-54 w-full object-cover rounded-md" />
                      <h3 className="text-xl font-bold mb-2 dark:text-white">Where the Crawdads Sing</h3>
                      <p className="text-gray-600 dark:text-white">A coming-of-age story intertwined with a murder mystery set in the marshes of North Carolina.</p>
                    </div>
                  </Link>

                  <Link to="/the-midnight-library">
                    <div className="bg-white rounded-lg shadow-lg p-6 slide-in transition-opacity duration-500 delay-1000 dark:bg-[rgb(30,30,30)] w-64 flex flex-col hover:shadow-xl hover:scale-105 hover:bg-blue-100 dark:hover:bg-blue-800">
                      <img src={TheMidnightLibrary} alt="The Midnight Library" className="mb-4 h-54 w-full object-cover rounded-md" />
                      <h3 className="text-xl font-bold mb-2 dark:text-white">The Midnight Library</h3>
                      <p className="text-gray-600 dark:text-white">A philosophical tale about choices, regrets, and the infinite possibilities of life.</p>
                    </div>
                  </Link>

                  <Link to="/the-vanishing-half">
                    <div className="bg-white rounded-lg shadow-lg p-6 slide-in transition-opacity duration-500 delay-1100 dark:bg-[rgb(30,30,30)] w-64 flex flex-col hover:shadow-xl hover:scale-105 hover:bg-blue-100 dark:hover:bg-blue-800">
                      <img src={TheVanishingHalf} alt="The Vanishing Half" className="mb-4 h-54 w-full object-cover rounded-md" />
                      <h3 className="text-xl font-bold mb-2 dark:text-white">The Vanishing Half</h3>
                      <p className="text-gray-600 dark:text-white">A multigenerational saga about twin sisters whose lives diverge when one decides to live as a white woman.</p>
                    </div>
                  </Link>

                  <Link to="/dune">
                    <div className="bg-white rounded-lg shadow-lg p-6 slide-in transition-opacity duration-500 delay-1200 dark:bg-[rgb(30,30,30)] w-64 flex flex-col hover:shadow-xl hover:scale-105 hover:bg-blue-100 dark:hover:bg-blue-800">
                      <img src={Dune} alt="Dune" className="mb-4 h-54 w-full object-cover rounded-md" />
                      <h3 className="text-xl font-bold mb-2 dark:text-white">Dune</h3>
                      <p className="text-gray-600 dark:text-white">A science fiction epic set on the desert planet of Arrakis, exploring themes of politics, religion, and ecology.</p>
                    </div>
                  </Link>

                  <Link to="/klara-and-the-sun">
                    <div className="bg-white rounded-lg shadow-lg p-6 slide-in transition-opacity duration-500 delay-1300 dark:bg-[rgb(30,30,30)] w-64 flex flex-col hover:shadow-xl hover:scale-105 hover:bg-blue-100 dark:hover:bg-blue-800">
                      <img src={KlaraAndtheSun} alt="Klara and the Sun" className="mb-4 h-54 w-full object-cover rounded-md" />
                      <h3 className="text-xl font-bold mb-2 dark:text-white">Klara and the Sun</h3>
                      <p className="text-gray-600 dark:text-white">A story told from the perspective of an artificial friend, exploring themes of love and what it means to be human.</p>
                    </div>
                  </Link>

                  <Link to="/project-hail-mary">
                    <div className="bg-white rounded-lg shadow-lg p-6 slide-in transition-opacity duration-500 delay-1400 dark:bg-[rgb(30,30,30)] w-64 flex flex-col hover:shadow-xl hover:scale-105 hover:bg-blue-100 dark:hover:bg-blue-800">
                      <img src={ProjectHailMary} alt="Project Hail Mary" className="mb-4 h-54 w-full object-cover rounded-md" />
                      <h3 className="text-xl font-bold mb-2 dark:text-white">Project Hail Mary</h3>
                      <p className="text-gray-600 dark:text-white">A gripping tale of survival in space as an astronaut embarks on a mission to save humanity.</p>
                    </div>
                  </Link>

                  <Link to="/malibu-rising">
                    <div className="bg-white rounded-lg shadow-lg p-6 slide-in transition-opacity duration-500 delay-1500 dark:bg-[rgb(30,30,30)] w-64 flex flex-col hover:shadow-xl hover:scale-105 hover:bg-blue-100 dark:hover:bg-blue-800">
                      <img src={MalibuRising} alt="Malibu Rising" className="mb-4 h-54 w-full object-cover rounded-md" />
                      <h3 className="text-xl font-bold mb-2 dark:text-white">Malibu Rising</h3>
                      <p className="text-gray-600 dark:text-white">A summer story of four siblings throwing a party that changes everything, set in Malibu's vibrant beach culture.</p>
                    </div>
                  </Link>
                </div>
              </div>
            </section>
            {/* Featured Author Section */}
            <section className="container mx-auto my-8 ">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">Featured Author</h2>

              <div className="bg-[#fce3a0] rounded-xl shadow-xl p-6 flex flex-auto items-center dark:bg-[rgb(30,30,30)]">
                <img
                  src={data.featuredAuthor.image}
                  alt={data.featuredAuthor.name}
                  className="w-32 h-32 object-cover rounded-full shadow-lg mr-6"
                />
                <div>

                  <h3 className="text-2xl font-bold mb-2 dark:text-white">{data.featuredAuthor.name}</h3>
                  <p className="text-gray-600 dark:text-white">{data.featuredAuthor.bio}</p>
                </div>
              </div>
            </section>

            <Review />
          </>
        )}
      </div>
    </>
  );
};

export default Home;


