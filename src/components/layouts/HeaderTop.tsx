import { Avatar, Col, Row } from "antd";
import logo from "@/assets/react.svg";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { FiUser } from "react-icons/fi";
import { getAllCookies } from "@/lib/helpers";
import Cookies from "js-cookie";
const HeaderTop = () => {
  const handleLogOut = () => {
    Cookies.remove("token");
    Cookies.remove("user_id");
    Cookies.remove("name");
    window.location.replace("/login");
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div onClick={handleLogOut}>Logout</div>,
    },
  ];
  const { authToken } = getAllCookies();

  return (
    <div className="bg-[#F5F5F5] py-4 px-16 ">
      <Row>
        <Col xs={12} sm={12} lg={12} xl={12} xxl={12} md={12}>
          <div>
            <img src={logo} alt="logo" />
          </div>
        </Col>
        {authToken && (
          <Col xs={12} sm={12} lg={12} xl={12} xxl={12} md={12}>
            <div className="flex justify-end">
              <Dropdown trigger={["click"]} menu={{ items }}>
                <Avatar
                  className="cursor-pointer"
                  size={{ xs: 24, sm: 32, md: 40, lg: 40, xl: 40, xxl: 40 }}
                  icon={<FiUser />}
                />
              </Dropdown>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default HeaderTop;
