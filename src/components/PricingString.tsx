import type { CurrencyValue } from "@zoralabs/nft-hooks";
import { Fragment } from "react";

export type PricingStringProps = {
  pricing: CurrencyValue;
  showUSD?: boolean;
  className?: { amount?: string; usd?: string };
};

export const PricingString: React.FC<PricingStringProps> = ({
  pricing,
  showUSD = true,
  className,
}: PricingStringProps) => {
  const { format: formateETH } = new Intl.NumberFormat(
    typeof window === "undefined" ? "en-US" : navigator.language,
    {
      style: "decimal",
      maximumFractionDigits: 6,
    }
  );

  const { format: formatUSD } = new Intl.NumberFormat(
    typeof window === "undefined" ? "en-US" : navigator.language,
    {
      style: "decimal",
      maximumFractionDigits: 2,
    }
  );

  return (
    <Fragment>
      {pricing.amount.value && (
        <span className={className?.amount}>
          {formateETH(pricing.amount.value)} {pricing.symbol}
        </span>
      )}
      {showUSD && pricing.usd?.value && (
        <span className={className?.usd}>${formatUSD(pricing.usd?.value)}</span>
      )}
    </Fragment>
  );
};
