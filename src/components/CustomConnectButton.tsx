import * as _ from "lodash";

export type CustomConnectButtonProps = {
  className: string;
  connectWalletText?: string;
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
  openAccountModal: () => void;
  openChainModal: () => void;
  openConnectModal: () => void;
  accountModalOpen: boolean;
  chainModalOpen: boolean;
  connectModalOpen: boolean;
};

const CustomConnectButton: React.FC<CustomConnectButtonProps> = ({
  className,
  mounted,
  account,
  openConnectModal,
  chain,
  openChainModal,
  openAccountModal,
  connectWalletText,
}: CustomConnectButtonProps) => {
  return (
    <div
      {...(!mounted && {
        "aria-hidden": true,
        style: {
          opacity: 0,
          pointerEvents: "none",
          userSelect: "none",
        },
      })}
    >
      {(() => {
        if (!mounted || !account || !chain) {
          return (
            <button
              className={className}
              onClick={openConnectModal}
              type="button"
            >
              {connectWalletText || "Connect Wallet"}
            </button>
          );
        }

        if (chain.unsupported) {
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
