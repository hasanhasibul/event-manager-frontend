import { Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { PageNotFound } from "../pages";
import { Spin } from "antd";
import MainLayout from "@/pages/MainLayout";
import { EventList, EventAdd, EventEdit, EventDetails } from "@/pages/event";
import { Login, Profile, Register } from "@/pages/profile";
import PrivateRoute from "./PrivateRoute";
const RouteList = () => {
  const { pathname } = useLocation();
  const authToken = Cookies.get("token" || "");
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = authToken || "";
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error?.response?.status === 401) {
          Cookies.remove("token");
          Cookies.remove("email");
          Cookies.remove("name");
          window.location.replace("/login");
        } else if (error?.response?.status === 500) {
          return error.response;
        } else {
          return error.response;
        }
      }
    );
  }, [pathname, authToken]);

  return (
    <div>
      <Routes>
        <Route
          path=""
          element={
            <Suspense fallback={<Spin />}>
              <MainLayout />
            </Suspense>
          }
        >
          <Route
            path="/"
            element={
              <Suspense fallback={<Spin size="large" />}>
                <EventList />
              </Suspense>
            }
          />
          <Route path="/*" element={<PrivateRoute />}>
            <Route
              path="add-event"
              element={
                <Suspense>
                  <EventAdd />
                </Suspense>
              }
            />
            <Route
              path="edit-event/:id"
              element={
                <Suspense>
                  <EventEdit />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/event/:id"
            element={
              <Suspense>
                <EventDetails />
              </Suspense>
            }
          />

          <Route
            path="/profile"
            element={
              <Suspense>
                <Profile />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/create-account"
            element={
              <Suspense>
                <Register />
              </Suspense>
            }
          />
          <Route path="404" element={<PageNotFound />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default RouteList;
