import { Platform } from "../../types";
import useSWR, { SWRResponse } from "swr";
import axios from "axios";

export type UseMetadataType = SWRResponse<Platform | undefined>;

const useMetadata = ({ platform }: { platform?: string }): UseMetadataType => {
  const fetcher = (url: string) =>
    axios.get(url).then((res) => res.data?.platform as Platform | undefined);
  const swr = useSWR(
    platform ? `/api/platform/${platform}/meta` : undefined,
    fetcher
  );
  return swr;
};

export default useMetadata;
