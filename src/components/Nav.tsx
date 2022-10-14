import { Navigation } from "../types";
import Link from "next/link";

export type NavProps = {
  navigation: Navigation[];
  className?: string;
};

const Nav: React.FC<NavProps> = ({ navigation, className }: NavProps) => {
  const elements = navigation.map((x) => (
    <Link href={x.url}>
      <a className={className}>{x.label}</a>
    </Link>
  ));

  return <div className="flex">{elements}</div>;
};

export default Nav;
