import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { MainHeader } from "@/components/layouts";

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout>
      <MainHeader />
      <Content
        style={{
          backgroundColor: "white",
        }}
        className="min-h-[70vh]"
      >
        <main>
          <Outlet />
        </main>
      </Content>
      <footer className="bg-[#F5F5F5] py-4 px-16">
        <p>© Hasibul Hasan || 2024 </p>
      </footer>
    </Layout>
  );
};

export default MainLayout;
