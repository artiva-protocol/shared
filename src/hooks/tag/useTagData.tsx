import axios from "axios";
import { TagData } from "src/types";
import useSWR from "swr";

const useTagData = ({ platform, tag }: { platform: string; tag: string }) => {
  const fetcher = (url: string) =>
    axios.get(url).then((res) => res.data as TagData | undefined);
  return useSWR(
    `/api/platform/${platform}/tag/${encodeURIComponent(tag)}`,
    fetcher
  );
};

export default useTagData;
