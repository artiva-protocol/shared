import React, { Fragment } from "react";

export type LayoutProps = { children: React.ReactElement };

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return <Fragment>{children}</Fragment>;
};

export default Layout;
