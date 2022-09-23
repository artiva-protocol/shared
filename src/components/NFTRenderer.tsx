import { Fragment, useContext, useMemo } from "react";
import type { RenderRequest } from "../types/adapters/RendererConfig";
import { NFTObject, useNFTContent } from "@zoralabs/nft-hooks";
import SharedConfigContext from "../context/SharedConfigContext";

export type NFTRenderer = {
  nft: NFTObject;
  className?: string;
  renderingContext?: "FULL" | "PREVIEW" | "THUMBNAIL";
  onComponentLoaded?: () => void;
};

const NFTRenderer: React.FC<NFTRenderer> = ({
  nft,
  className,
  renderingContext = "PREVIEW",
  onComponentLoaded,
}: NFTRenderer) => {
  const mediaType = useNFTContent(nft.metadata?.contentUri);
  const { renderers } = useContext(SharedConfigContext);

  const request: RenderRequest = {
    media: {
      content: nft.metadata?.contentUri
        ? {
            uri: nft.metadata?.contentUri,
            type: mediaType.content?.mimeType,
          }
        : undefined,
      image: nft.metadata?.imageUri
        ? {
            uri: nft.metadata?.imageUri,
            type: "image",
          }
        : undefined,
      thumbnail: nft.media?.thumbnail?.uri
        ? {
            uri: nft.media?.thumbnail?.uri,
            type: "image",
          }
        : undefined,
    },
    metadata: nft.metadata,
    contract: nft.nft?.contract.address,
    tokenId: nft.nft?.tokenId,
    networkId: "1",
    renderingContext,
  };

  const renderingInfo = useMemo(() => {
    if (!renderers) return;
    const sortedRenderers = renderers.sort((a, b) =>
      a.getRenderingPreference(request) > b.getRenderingPreference(request)
        ? -1
        : 1
    );
    return sortedRenderers[0];
  }, [renderers, nft.metadata, nft.nft?.contentURI, mediaType.content]);

  if (renderingInfo) {
    const RenderingComponent = renderingInfo.render;
    return (
      <RenderingComponent
        className={className}
        request={request}
        onComponentLoaded={onComponentLoaded}
      />
    );
  }

  return <Fragment />;
};

export default NFTRenderer;
