import { Navigation } from "../types";
import Link from "next/link";
import { Fragment } from "react";

export type NavProps = {
  navigation: Navigation[];
  className?: string;
};

const Nav: React.FC<NavProps> = ({ navigation, className }: NavProps) => {
  const elements = navigation.map((x) => (
    <Link href={x.url} className={className}>
      {x.label}
    </Link>
  ));

  return <Fragment>{elements}</Fragment>;
};

export default Nav;
