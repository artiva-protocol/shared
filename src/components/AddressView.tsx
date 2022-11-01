import { Fragment } from "react";
import { useMainnet } from "../hooks/utils/useMainnet";
import { useEnsName } from "wagmi";
const PREFIX_ADDRESS = "0x";

export type AddressViewProps = {
  address: string;
  chars?: number;
  className?: string;
};

const AddressView: React.FC<AddressViewProps> = ({
  address,
  chars = 4,
  className,
}: AddressViewProps) => {
  const { chainId, enabled } = useMainnet();
  const { data: ensName } = useEnsName({ address, chainId, enabled });

  console.log("ensName", ensName, address);
  if (!address) return <Fragment />;
  if (ensName) return <div className={className}>{ensName}</div>;
  return (
    <div className={className}>
      {address.slice(0, chars + PREFIX_ADDRESS.length) +
        "..." +
        address.slice(address.length - chars)}
    </div>
  );
};

export default AddressView;
