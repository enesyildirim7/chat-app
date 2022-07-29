import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Content = () => {
  return (
    <div className="flex flex-col w-full h-full justify-start items-center max-w-7xl">
      <div className="flex text-brand-light py-20 text-7xl font-bold space-x-4">
        <div className="text-blue-500">Chat</div>
        <div className="text-pink-500">with</div>
        <div className="text-fuchsia-500">Friends</div>
      </div>
      <div>
        <Link to="/messages">
          <button className="w-40 h-12 rounded-lg bg-brand-primary text-brand-light  font-bold text-sm">
            Start Now
          </button>
        </Link>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <>
      <Header logoarea darkmode buttons />
      <div className="flex flex-col w-full h-full items-center">
        <Content />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
