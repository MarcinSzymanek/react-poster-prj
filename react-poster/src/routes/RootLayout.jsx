import MainHeader from "../components/core/MainHeader";
import { Outlet } from "react-router";
import { Suspense } from "react";

export default function RootLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}
