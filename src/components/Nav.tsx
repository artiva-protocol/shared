import { Navigation } from "../types";
import { useRouter } from "next/router";

export type NavProps = {
  navigation: Navigation[];
  className?: string;
};

const Nav: React.FC<NavProps> = ({ navigation, className }: NavProps) => {
  const router = useRouter();
  const elements = navigation.map((x) => (
    <button
      className={className}
      onClick={() => {
        router.push(x.url);
      }}
    >
      {x.label}
    </button>
  ));

  return <div className="flex">{elements}</div>;
};

export default Nav;
