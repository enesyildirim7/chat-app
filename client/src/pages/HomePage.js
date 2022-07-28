import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Content = () => {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center max-w-7xl">
      <div className="flex text-brand-light text-7xl font-bold space-x-4">
        <div className="text-blue-500">Chat</div>
        <div className="text-pink-500">with</div>
        <div className="text-fuchsia-500">Friends</div>
      </div>
      <div className="mt-10">
        <button className="w-40 h-12 rounded-lg bg-brand-primary text-brand-light  font-bold text-sm">
          Start Now
        </button>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="flex flex-col w-full items-center">
      <Header />
      <Content />
      <Footer />
    </div>
  );
};

export default HomePage;
