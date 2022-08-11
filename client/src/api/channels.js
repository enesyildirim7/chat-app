import Axios from "./axios";

export const getOwnChannels = async () => {
  const channels = await Axios.get("/api/channel/own");
  return channels;
};

export const getChannel = async (id) => {
  const channel = await Axios.get("/api/channel/" + id);
  return channel;
};

export const getChannelMessages = async (id) => {
  const channels = await Axios.get("/api/channnel/" + id);
  return channels;
};
