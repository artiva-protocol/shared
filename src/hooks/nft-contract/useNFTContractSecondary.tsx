import useSWR from "swr";
import axios from "axios";
import { NFTContractIdentifier } from "./useNFTContract";
import { NFTContractObject } from "src/types";

const useNFTContractSecondary = (contract: NFTContractIdentifier) => {
  const fetch = (url: string, data: NFTContractIdentifier) =>
    axios.post<NFTContractObject>(url, { contract: data }).then((x) => x.data);

  return useSWR(["/api/nft-contract/secondary", contract], fetch);
};

export default useNFTContractSecondary;
