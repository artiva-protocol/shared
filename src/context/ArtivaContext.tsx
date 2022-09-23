import { createContext } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/future/image";
import components from "../components/DefaultComponents";
import hooks from "../hooks/DefaultHooks";

export type ArtivaComponentsType = typeof components & {
  ConnectButton?: typeof ConnectButton.Custom;
  Image: typeof Image;
};
export type ArtivaHooksType = typeof hooks;

export type ArtivaContextType = {
  components: ArtivaComponentsType;
  hooks: ArtivaHooksType;
};

export default createContext<ArtivaContextType>({
  components: { ...components, ConnectButton: undefined, Image },
  hooks,
});
