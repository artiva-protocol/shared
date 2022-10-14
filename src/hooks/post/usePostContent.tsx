import useNFT from "../nft/useNFT";
import useNFTContract, { NFTContractIdentifier } from "../nft/useNFTContract";
import { PostContent } from "../../types/posts/PostContent";
import { PostTypeEnum } from "../../types/posts/PostTypeEnum";
import { NFTObject } from "@zoralabs/nft-hooks";
import { NFTContractObject } from "../../types/nft/NFTContractObject";
import { NFTIdentifier } from "../../types";

const usePostContent = (
  type?: PostTypeEnum,
  content?: PostContent
): {
  nft: NFTObject | undefined;
  nftContract: NFTContractObject | undefined;
} => {
  const { data: nft } = useNFT(
    type === PostTypeEnum.NFT && content
      ? (content as NFTIdentifier)
      : undefined
  );

  const { data: nftContract } = useNFTContract(
    type === PostTypeEnum.NFT_CONTRACT && content
      ? (content as NFTContractIdentifier)
      : undefined
  );

  return {
    nft: nft as NFTObject | undefined,
    nftContract: nftContract as NFTContractObject | undefined,
  };
};

export default usePostContent;
