import Cookies from "js-cookie";
import { toast } from "react-toastify";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const refreshPage = (url: string, callback?: any) => {
  setTimeout(() => {
    callback();
    window.location.replace(url);
  }, 1000);
};

export const humanize = (str: string) => {
  let humanizedStr = "";
  if (str) {
    humanizedStr = str
      .replace(/^[\s_]+|[\s_]+$/g, "")
      .replace(/[_\s]+/g, " ")
      .replace(/^[a-z]/, function (m) {
        return m.toUpperCase();
      });
  }
  return humanizedStr;
};

export const getAllCookies = () => {
  const authToken = Cookies.get("token") || "";
  const name = Cookies.get("name");
  const user_id = Cookies.get("user_id");
  return { authToken, name, user_id };
};

export const resErrorHanlder = (
  statusCode: number | string | undefined,
  message: string
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const arrorCode: any[] = [500, 401, 406, 404, 422];
  if (arrorCode.includes(statusCode)) {
    toast.error(message ? message : "something is wrong");
  } else {
    toast.error(message ? message : "something is wrong");
  }
};
