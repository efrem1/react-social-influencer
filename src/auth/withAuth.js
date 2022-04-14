import React, { PureComponent } from "react";
import { AuthProvider } from "./provider";

export const withAuth = (WrappedComponent) => {
  return class extends PureComponent {
    render() {
      const user = localStorage.getItem("@user") ?? null;
      const tokens = localStorage.getItem("@tokens") ?? null;
      return (
        <AuthProvider
          user={user ? JSON.stringify(user) : {}}
          tokens={tokens ? JSON.stringify(tokens) : {}}
        >
          <WrappedComponent {...this.props} />
        </AuthProvider>
      );
    }
  };
};
