import { getAllCookies } from "@/lib/helpers";
import { getDetails } from "@/lib/helpers/services";
import { Card } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProfileDetails = () => {
  const [userDetails, setUserDetails] = useState<any>({});
  const { user_id } = getAllCookies();

  useEffect(() => {
    getUserDetails();
  }, [user_id]);
  const getUserDetails = async () => {
    const response = await getDetails(`user/users/${user_id}`);
    if (response?.statusCode == "200") {
      setUserDetails(response?.data);
    } else {
      toast.error(response?.message);
    }
  };

  return (
    <div className="py-4 px-16">
      <Card className="shadow">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-base underline  ">
            Profile Details
          </h2>
        </div>
        <table className="w-full">
          <tbody>
            <tr className="border-b border-myPrimaryColor">
              <td className="w-3/12 text-black py-3 font-semibold">Name</td>
              <td className="text-gray-700  py-3 w-9/12">
                {userDetails?.name}
              </td>
            </tr>
            <tr className="border-b border-myPrimaryColor">
              <td className="w-3/12 text-black py-3 font-semibold">Phone</td>
              <td className="text-gray-700  py-3 w-9/12">
                {userDetails?.phone}
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ProfileDetails;
