import { ProfileDetails } from "@/components/profile";
import { getAllCookies } from "@/lib/helpers";
import { Button } from "antd";
import { Link } from "react-router-dom";

const Profile = () => {
  const { authToken } = getAllCookies();
  return (
    <>
      {authToken ? (
        <ProfileDetails />
      ) : (
        <div className="px-16 py-4 flex justify-center items-center">
          <div className="flex gap-1 w-96 h-96  items-center justify-center  ">
            <div className="w-44">
              <Link to="/login">
                <Button
                  type="primary"
                  block
                  htmlType="button"
                  className="!text-xs !rounded shadow-none"
                  size="large"
                >
                  Login
                </Button>
              </Link>
            </div>
            <div className="w-44">
              <Link to="/create-account">
                <Button
                  type="primary"
                  block
                  htmlType="button"
                  className="!text-xs !rounded shadow-none"
                  size="large"
                >
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
