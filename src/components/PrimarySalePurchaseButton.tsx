import { ethers } from "ethers";
import { usePrimarySale } from "../hooks";
import { PrimarySaleModule } from "../types/nft/NFTContractObject";
import { useSigner } from "wagmi";

export type PrimarySalePurchaseButtonProps = {
  address: string;
  quantity: number;
  className: string;
  primarySale: PrimarySaleModule;
  children: React.ReactNode;
};

const PrimarySalePurchaseButton = ({
  address,
  quantity,
  className,
  primarySale,
  children,
}: PrimarySalePurchaseButtonProps) => {
  const saleAdapter = usePrimarySale(primarySale.source);
  const { data: signer } = useSigner();

  const onClick = () => {
    if (!signer) return;
    saleAdapter?.connect(signer, address);
    saleAdapter?.purchase(
      quantity,
      ethers.utils.parseEther(primarySale.price.toString()).mul(quantity)
    );
  };

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default PrimarySalePurchaseButton;
