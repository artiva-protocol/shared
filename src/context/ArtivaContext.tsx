import { createContext } from "react";
import { Container } from "unstated-next";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/future/image";
import Link from "next/link";
import components from "../components/DefaultComponents";
import hooks from "../hooks/DefaultHooks";

export type ArtivaComponentsType = typeof components & {
  ConnectButton?: typeof ConnectButton.Custom;
  Image: typeof Image;
  Link: typeof Link;
};
export type ArtivaHooksType = typeof hooks;
export type ArtivaSharedContextType = {
  GlobalContext?: Container<any>;
};

export type ArtivaContextType = {
  components: ArtivaComponentsType;
  hooks: ArtivaHooksType;
  context: ArtivaSharedContextType;
};

export default createContext<ArtivaContextType>({
  components: { ...components, ConnectButton: undefined, Image, Link },
  hooks: { ...hooks },
  context: {},
});
