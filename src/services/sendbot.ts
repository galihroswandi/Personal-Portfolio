import axios from "axios";

interface SendBotProps {
  name: string;
  email: string;
  message: string;
}
const sendbot = (data: SendBotProps) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/bot-telegram", data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default sendbot;
