import { useEnsAvatar } from "wagmi";
import makeBlockie from "ethereum-blockies-base64";

export type AvatarViewProps = {
  address: string;
  className: string;
};

const AvatarView: React.FC<AvatarViewProps> = ({
  address,
  className,
}: AvatarViewProps) => {
  const { data } = useEnsAvatar({ addressOrName: address, chainId: 1 });
  return <img className={className} src={data || makeBlockie(address)} />;
};

export default AvatarView;
