import axios from "axios";

interface SendMailProps {
  name: string;
  email: string;
  message: string;
}
const sendmail = (data: SendMailProps) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/contact", data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default sendmail;
