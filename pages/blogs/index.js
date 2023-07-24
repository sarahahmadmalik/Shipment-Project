import Banner from "../../components/Banner";
import BlogCard from "../../components/BlogCard";
import { useState } from "react";
import { Nunito_Sans } from "next/font/google";
import { DM_Sans } from "next/font/google";
import blogsData from "../../data/Blogs";
import Image from 'next/image'
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const font3 = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

const font4 = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

function blogs() {
  const popularTags = [
    "marine",
    "Spare",
    "Engine",
    "Ship",
    "Seller",
    "Buyer",
    "Spare",
    "Ship Engine",
  ];

  const recentBlogs =[
    {
      id: 1,
      title: "How websites work properly",
      date: "May 9,2023",
      image: "/assets/recentBlog1.png"
    },
     {
      id: 2,
      title: "How websites work properly",
      date: "May 9,2023",
      image: "/assets/recentBlog2.png"
    },

    {
      id: 3,
      title: "How websites work properly",
      date: "May 9,2023",
      image: "/assets/recentBlog3.png"
    },
    {
      id: 4,
      title: "How websites work properly",
      date: "May 9,2023",
      image: "/assets/recentBlog4.png"
    }
  ]

  const itemsPerPage = 4;
  const totalPosts = blogsData.length;
  const totalPages = Math.ceil(totalPosts / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  const posts = blogsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = blogsData.length;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (totalPages - endPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <>
    <Header/>
      <Banner title="Blogs" para="Blogs" />
      <main className="grid md:grid-cols-3 gap-4 smd:mx-[2.4rem] mx-[1.8rem] mdd:mx-[4rem] my-5">
        {/* First Column */}
        <div className={`md:col-span-1 w-[67%] ${font3.className}`}>
          {/* Recent Blogs Section */}
          <div className="hidden mdd:block bg-white p-4 shadow">
            <h2 className="text-lg font-semibold mb-4">Recent Blogs</h2>
            {recentBlogs.map((recent, index) => (
              <div key={index} className="flex w-full my-2 cursor-pointer">
                <div className="relative w-full objectFit-contain h-full">
                  <Image src={recent.image} alt="blog" width={100} height={100} objectFit="contain"/>
                </div>
                <div className="ml-2">
                <div><p className="text-[13px] xl:text-md font-medium text-[#77777777]">{recent.date}</p></div>
                <div><p className="font-medium text-sm xl:text-xl leading-2">{recent.title}</p></div>
                </div>
              </div>
            ))}
          </div>


          {/* Popular Tags Section */}
          <div className="hidden mdd:block mt-4 bg-white p-4 shadow">
            <h2 className="text-lg font-semibold">Popular Tags</h2>
            <div className="flex justify-center flex-wrap">
              {popularTags.map((tag, index) => (
                <p
                  className={`cursor-pointer flex-grow align-center text-sm m-1 px-4 py-2 rounded-md bg-[#DFEBF5] ${font4.className}`}
                  key={index}
                >
                  {tag}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          {/* Blog Cards */}
          <div className="grid grid-cols-1 mdd:grid-cols-2 gap-4 justify-center">
            {posts.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-[3rem] space-x-2 mb-[4rem]">
            {currentPage > 1 && (
              <button
                onClick={handlePrevious}
                className="text-[#1E7FCB] text-xl px-2 py-1 rounded-l bg-transparent border-none"
              >
                <img src="/assets/arrow-up.png" alt="Previous" />
              </button>
            )}
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded ${
                  currentPage === page
                    ? "bg-[#1E7FCB] text-white font-bold"
                    : "bg-white text-[#1E7FCB]"
                }`}
              >
                {page}
              </button>
            ))}
            {currentPage < totalPages && (
              <button
                onClick={handleNext}
                className="text-[#1E7FCB] text-xl px-2 py-1 rounded-r bg-transparent border-none"
              >
                <img src="/assets/arrow-down.png" alt="Next" />
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer/>
    </>
  );
}

export default blogs;