import { Platform } from "../../types";
import useSWR, { SWRResponse } from "swr";
import axios from "axios";

export type UseMetadataType = SWRResponse<Platform | undefined>;

const useMetadata = (): UseMetadataType => {
  const fetcher = (url: string) =>
    axios.get(url).then((res) => res.data?.platform as Platform | undefined);
  const swr = useSWR(`/api/platform/meta`, fetcher);
  return swr;
};

export default useMetadata;
