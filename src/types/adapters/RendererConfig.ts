export enum RenderingPreference {
  INVALID = -1,
  FALLBACK = 0,
  LOW = 1,
  NORMAL = 2,
  PREFERRED = 3,
  PRIORITY = 4,
}

export type MediaUriType = {
  uri: string;
  type?: string;
};

export type RenderRequest = {
  media: {
    content?: MediaUriType;
    image?: MediaUriType;
    animation?: MediaUriType;
    thumbnail?: MediaUriType;
  };
  metadata: any;
  renderingContext: "PREVIEW" | "FULL" | "THUMBNAIL";
  contract?: string;
  tokenId?: string;
  networkId?: string;
};

export type RenderComponentType = {
  request: RenderRequest;
  className?: string;
  onComponentLoaded?: () => void;
};

export interface RendererConfig {
  getRenderingPreference(request: RenderRequest): RenderingPreference;
  render: React.FunctionComponent<RenderComponentType>;
}
