import React from "react";
import Header from "../components/Header";
import "../styles/MessagesPage.css";
import SearchIcon from "@mui/icons-material/Search";

const User = ({ from, message, date, amount }) => {
  return (
    <div className="message-list-user" tabindex="0">
      <div className="flex flex-row h-full items-center">
        <div className="user-pp"></div>
        <div className="flex py-4 flex-col text-sm justify-between h-full">
          <div
            className={
              amount > 0
                ? "font-bold text-[12px] dark:text-brand-light"
                : "font-medium text-[12px] dark:text-brand-light"
            }
          >
            {from}
          </div>
          <div
            className={
              amount > 0
                ? "font-bold dark:text-brand-light text-[10px] truncate"
                : "dark:text-brand-light text-[10px] text-ellipsis"
            }
          >
            {message}
          </div>
        </div>
      </div>
      <div className="flex py-2 flex-col text-sm justify-between h-full">
        <div
          className={
            amount > 0
              ? "font-bold text-[12px] dark:text-brand-light"
              : "text-[12px] font-medium dark:text-brand-light"
          }
        >
          {date}
        </div>

        {amount > 0 ? (
          <div className="unread-message text-[10px] font-bold">{amount}</div>
        ) : null}
      </div>
    </div>
  );
};

const OnlineUsers = () => {
  return (
    <div className="flex h-full w-1/5">
      <div className="online-users-area"></div>
    </div>
  );
};

const Texting = () => {
  return (
    <div className="flex h-full w-3/5">
      <div className="texting-area">
        <div className="">
          <div className="relative p-4"></div>
        </div>
      </div>
    </div>
  );
};

const MessageList = () => {
  return (
    <div className="flex flex-col h-full w-1/5 rounded-3xl">
      <div className="message-list-area">
        <div className="bg-gradient-to-t from-slate-300 to-slate-100 rounded-t-3xl dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-700">
          <div className="relative p-4">
            <button className="absolute mt-0 mb-0 top-0 bottom-0 left-6 text-center text-brand-dark/50 dark:text-brand-light/50">
              <SearchIcon />
            </button>
            <input
              type="text"
              name="search"
              placeholder="Search chat"
              className="search-field"
            ></input>
          </div>
        </div>
        <div className="overflow-auto sbar">
          <User from="Muhittin ve tayfası" date="00.00" message="Umut: 🤡" amount="296" />
          <User from="Annem" date="00.00" message="Tamam" amount="0" />
          <User
            from="UBCAK Bildiri Grubu"
            date="00.00"
            message="Bilgilendirme yapacaklardır."
            amount="0"
          />
          <User from="Ahmet Göver" date="00.00" message="Tamam görüşürüz." amount="0" />
          <User
            from="GTÜ Çevre"
            date="00.00"
            message="+90 012 345 67 89: Selam arkadaşlar"
            amount="0"
          />
          <User from="Babam" date="00.00" message="Fotoğraf" amount="0" />
          <User from="Doktor Sena" date="00.00" message="Sağol" amount="0" />
        </div>
      </div>
    </div>
  );
};

const MessagesPage = () => {
  return (
    <>
      <Header logoarea darkmode />
      <div className="flex w-full h-full justify-center items-start">
        <div className="flex flex-row w-full h-full max-w-7xl">
          <MessageList />
          <Texting />
          <OnlineUsers />
        </div>
      </div>
    </>
  );
};

export default MessagesPage;
