import React from "react";
import AdminLayout from "../layouts/AdminLayout";
import { useQuery } from "../hooks";
import Admin from "../components/admin";

export default function AdminPage() {
  const query = useQuery();
  const page = query.get("page");
  function getPage() {
    switch (page) {
      case "categories":
        return <Admin.Categories />;
      default:
        return <h1>DEfault</h1>;
    }
  }
  return <AdminLayout drawer>{getPage()}</AdminLayout>;
}
