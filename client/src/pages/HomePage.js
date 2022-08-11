import React from "react";
import { ROUTES } from "../configs/routes";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Content = () => {
  return (
    <div className="flex flex-col w-full h-full justify-start items-center max-w-7xl">
      <div className="flex text-brand-light py-20 text-7xl font-bold space-x-4">
        <div className="text-blue-500 text-center">
          Connect <br />
          <span className="text-pink-500">with </span>
          <span className="text-purple-500">your friends</span>
        </div>
      </div>
      <div>
        <Link to={ROUTES.Messages}>
          <button className="w-40 h-12 rounded-full bg-brand-primary text-brand-light font-normal text-sm shadow-xlarge shadow-brand-primary">
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
      <Header logoarea darkmode buttons api />
      <div className="flex flex-col w-full h-full items-center">
        <Content />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
