export declare type AuthenticationStatus =
  | "loading"
  | "unauthenticated"
  | "authenticated";

export type CustomConnectButtonProps = {
  className: string;
  forceChain?: boolean;
  account?: {
    address: string;
    balanceDecimals?: number;
    balanceFormatted?: string;
    balanceSymbol?: string;
    displayBalance?: string;
    displayName: string;
    ensAvatar?: string;
    ensName?: string;
    hasPendingTransactions: boolean;
  };
  chain?: {
    hasIcon: boolean;
    iconUrl?: string;
    iconBackground?: string;
    id: number;
    name?: string;
    unsupported?: boolean;
  };
  mounted: boolean;
  authenticationStatus?: AuthenticationStatus;
  openAccountModal: () => void;
  openChainModal: () => void;
  openConnectModal: () => void;
  accountModalOpen: boolean;
  chainModalOpen: boolean;
  connectModalOpen: boolean;
};

const CustomConnectButton: React.FC<CustomConnectButtonProps> = ({
  className,
  forceChain = true,
  chain,
  openAccountModal,
  openChainModal,
  openConnectModal,
  authenticationStatus,
  account,
  mounted,
}: CustomConnectButtonProps) => {
  // Note: If your app doesn't use authentication, you
  // can remove all 'authenticationStatus' checks
  const ready = mounted && authenticationStatus !== "loading";
  const connected =
    ready &&
    account &&
    chain &&
    (!authenticationStatus || authenticationStatus === "authenticated");

  return (
    <div
      {...(!ready && {
        style: {
          pointerEvents: "none",
          userSelect: "none",
        },
      })}
    >
      {(() => {
        if (!connected) {
          return (
            <button
              className={className}
              onClick={openConnectModal}
              type="button"
            >
              Connect Wallet
            </button>
          );
        }

        if (forceChain && chain.unsupported) {
          return (
            <button
              className={className}
              onClick={openChainModal}
              type="button"
            >
              Wrong network
            </button>
          );
        }

        return (
          <button
            className={className}
            onClick={openAccountModal}
            type="button"
          >
            {account.displayName}
          </button>
        );
      })()}
    </div>
  );
};

export default CustomConnectButton;
