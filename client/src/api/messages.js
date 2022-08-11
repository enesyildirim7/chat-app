import Axios from "./axios";

export const getMessage = async () => {};

export const sendMessage = async (recipient) => {
  const channel = await Axios.post("/api/channel/" + id);
  return channel;
};
