import { Platform } from "../../types";
import useSWR from "swr";
import SharedConfigContext from "../../context/SharedConfigContext";
import { useContext } from "react";
import axios from "axios";

export type UseMetadataType = {
  data: Platform;
};

const useMetadata = (props?: {
  full?: boolean;
  preview?: boolean;
}): UseMetadataType => {
  const { serverURL } = useContext(SharedConfigContext);
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data } = useSWR(
    `${serverURL}/platform/meta?full=${props?.full || true}&preview=${
      props?.preview || false
    }`,
    fetcher,
    {
      refreshInterval: 2000000,
    }
  );
  return { data: data?.platform };
};

export default useMetadata;
