import { Post } from "../../types";
import useSWR from "swr";
import axios from "axios";
import { PostData } from "src/types/posts/PostData";

const usePostContent = (post: Post) => {
  const fetch = (url: string, data: Post) =>
    axios.post<PostData>(url, { post: data }).then((x) => x.data);

  return useSWR(["/api/post/data", post], fetch);
};

export default usePostContent;
