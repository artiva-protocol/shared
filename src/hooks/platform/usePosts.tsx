import axios from "axios";
import { Post } from "../../types/posts/Post";
import SharedConfigContext from "../../context/SharedConfigContext";
import { useContext } from "react";
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite";

export type UsePostsType = {
  data?: Post[];
};

export type UsePostsProps = {
  platform: string;
  tag?: string;
  owner?: string;
  limit?: number;
  onSuccess?: (data: Post[][]) => void;
};

const usePosts = ({
  platform,
  tag,
  owner,
  limit = 20,
  onSuccess,
}: UsePostsProps): SWRInfiniteResponse<Post[]> & {
  loading: boolean;
  more: boolean;
} => {
  const { serverURL } = useContext(SharedConfigContext);

  const baseURL = `${serverURL}/platform/${platform}/posts`;
  const baseParams = {
    tag: tag,
    owner: owner,
    limit: limit,
  };

  const fetcher = (url: string, params?: any) =>
    axios.get(url, { params }).then((res) => res.data?.posts);

  const getKey = (idx: number, prev: Post[]) => {
    if (prev && !prev.length) return null;
    if (idx === 0) return [baseURL, baseParams];
    return [baseURL, { ...baseParams, page: idx }];
  };

  const swr = useSWRInfinite<Post[]>(getKey, fetcher, { onSuccess });
  const { size, data } = swr;

  const loading = size > (data?.length || 0);
  const more = data ? (data[data.length - 1]?.length || 0) == limit : true;

  return { ...swr, loading, more };
};

export default usePosts;
