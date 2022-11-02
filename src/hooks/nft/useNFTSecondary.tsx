import useSWR from "swr";
import axios from "axios";
import { NFTObject } from "@zoralabs/nft-hooks";
import { NFTIdentifier } from "src/types";

const useNFTSecondary = (nft: NFTIdentifier) => {
  const fetch = (url: string, data: NFTIdentifier) =>
    axios.post<NFTObject>(url, { nft: data }).then((x) => x.data);

  return useSWR(["/api/nft/secondary", nft], fetch);
};

export default useNFTSecondary;
