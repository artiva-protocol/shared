import { useContext, useEffect, useState } from "react";
import { IPrimarySaleAdapter, PRIMARY_SALE_SOURCES } from "../../types";
import SharedConfigContext from "../../context/SharedConfigContext";

const usePrimarySale = (source?: PRIMARY_SALE_SOURCES) => {
  const { primarySaleAdapters } = useContext(SharedConfigContext);
  const [primarySale, setPrimarySale] = useState<
    IPrimarySaleAdapter | undefined
  >();
  useEffect(() => {
    const handler = async () => {
      if (!source || !primarySaleAdapters) return;
      setPrimarySale(
        (await primarySaleAdapters).find((adapter) => {
          if (adapter.source === source) return adapter;
          else return;
        })
      );
    };
    handler();
  }, [source, primarySaleAdapters]);
  return primarySale;
};

export default usePrimarySale;
