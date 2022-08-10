import React from "react";
import Header from "../components/Header";
import "../styles/MessagesPage.css";
import SearchIcon from "@mui/icons-material/Search";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import MapsUgcRoundedIcon from "@mui/icons-material/MapsUgcRounded";
import { IconButton } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

const User = ({ from, message, date, amount }) => {
  return (
    <div className="message-list-user" tabIndex={0}>
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

const OnlineUser = ({ name }) => {
  return (
    <div className="w-full">
      <div className="online-user" tabIndex={0}>
        {name}
      </div>
    </div>
  );
};

const OnlineUsers = () => {
  return (
    <div className="flex flex-col h-full w-1/5">
      <div className="online-users-area">
        <div className="users-header">
          <div className="flex h-10 w-full justify-center items-center">
            <div className="font-medium text-brand-dark dark:text-brand-light">
              Onlines
            </div>
          </div>
        </div>
        <div className="users-area sbar">
          <div className="online-user-list">
            <OnlineUser name="Alpar Develi" />
          </div>
        </div>
        <div className="setting-area">
          <div className="p-2 px-8 flex flex-row justify-center space-x-8 text-brand-dark dark:text-brand-light">
            <button>
              <MapsUgcRoundedIcon />
            </button>
            <button>
              <PersonRoundedIcon />
            </button>
            <button>
              <SettingsRoundedIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const IncomingMessage = ({ color, from, message }) => {
  return (
    <div className="w-full" tabIndex={0}>
      {from !== "me" ? (
        <div className="flex flex-col w-full items-start space-x-2">
          <div className={"flex l-0 font-medium " + color}>{from}:</div>
          <div className="message-content rounded-xl rounded-tl-none bg-slate-300 dark:bg-slate-700">
            {message}
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full items-end space-x-2">
          <div className="message-content rounded-xl rounded-tr-none bg-brand-primary text-brand-light">
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

const Texting = () => {
  return (
    <div className="flex flex-col h-full w-3/5">
      <div className="texting-area">
        <div className="message-header">
          <div className="flex h-10 flex-row justify-start items-center">
            <div className="font-medium dark:text-brand-light">Muhittin ve tayfası</div>
          </div>
        </div>
        <div className="message-area sbar">
          <div className="messaging pb-4">
            <IncomingMessage
              color="text-purple-700"
              from="Mustafa Dönmez"
              message="Ahhg"
            />
            <IncomingMessage
              color="text-green-700"
              from="Umut Uyar"
              message="instagram linki"
            />
            <IncomingMessage
              color="text-amber-700"
              from="Ahmet Göver"
              message="Helal olsun"
            />
            <IncomingMessage
              color="text-amber-700"
              from="Ahmet Göver"
              message="Adamların tek derdi cips den yuvarlak yapmak"
            />
            <IncomingMessage
              color="text-green-700"
              from="Umut Uyar"
              message="O kadar kutu cips"
            />
            <IncomingMessage
              color="text-green-700"
              from="Umut Uyar"
              message="130 TL falan"
            />
            <IncomingMessage
              color="text-emerald-700"
              from="Burak Babal"
              message="Ismarlasana"
            />
            <IncomingMessage color="text-green-700" from="me" message="instagram linki" />
            <IncomingMessage
              color="text-amber-700"
              from="Ahmet Göver"
              message="İnanılmaz"
            />
          </div>
        </div>
        <div className="write-area">
          <div className="flex flex-row items-center justify-between text-field-wrapper">
            <textarea type="text" name="message" className="text-field" />
            <button className="ml-4 text-brand-primary rounded-full">
              <SendRoundedIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MessageList = () => {
  const list = [
    {
      channelId: 1,
      from: "Muhittin ve tayfası",
      date: "00.00",
      message: "Umut: 🤡",
      amount: "296",
    },
    { channelId: 2, from: "Annem", date: "00.00", message: "Tamam", amount: "0" },
    {
      channelId: 3,
      from: "UBCAK Bildiri Grubu",
      date: "00.00",
      message: "Bilgilendirme yapacaklardır.",
      amount: "0",
    },
    {
      channelId: 4,
      from: "Ahmet Göver",
      date: "00.00",
      message: "Sendeyiz",
      amount: "0",
    },
    { channelId: 5, from: "Babam", date: "00.00", message: "Fotoğraf", amount: "0" },
    // { from: "Doktor Sena", date: "00.00", message: "Sağol 🙏", amount: "0" },
  ];

  return (
    <div className="flex flex-col h-full w-1/5">
      <div className="message-list-area">
        <div className="bg-brand-light dark:bg-slate-800 ">
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
        <div className="relative flex w-full h-full overflow-auto sbar">
          <div className="absolute flex flex-col w-full">
            {list?.map((i) => (
              <User
                key={i.channelId}
                from={i.from}
                date={i.date}
                message={i.message}
                amount={i.amount}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MessagesPage = () => {
  return (
    <>
      <Header logoarea darkmode logout api />
      <div className="flex w-full h-full justify-center items-start">
        <div className="flex flex-row w-full h-full">
          <MessageList />
          <Texting />
          <OnlineUsers />
        </div>
      </div>
    </>
  );
};

export default MessagesPage;
