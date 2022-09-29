import { Platform } from "../../types";
import useSWR, { SWRResponse } from "swr";
import SharedConfigContext from "../../context/SharedConfigContext";
import { useContext } from "react";
import axios from "axios";

export type UseMetadataType = SWRResponse<Platform | undefined>;

const useMetadata = (props?: {
  full?: boolean;
  preview?: boolean;
}): UseMetadataType => {
  const { serverURL } = useContext(SharedConfigContext);
  const fetcher = (url: string) =>
    axios.get(url).then((res) => res.data?.platform as Platform | undefined);
  const swr = useSWR(
    `${serverURL}/platform/meta?full=${props?.full || true}&preview=${
      props?.preview || false
    }`,
    fetcher,
    {
      refreshInterval: 2000000,
    }
  );
  return swr;
};

export default useMetadata;
