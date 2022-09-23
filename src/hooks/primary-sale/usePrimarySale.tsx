import { useContext, useMemo } from "react";
import { IPrimarySaleAdapter, PRIMARY_SALE_SOURCES } from "../../types";
import SharedConfigContext from "../../context/SharedConfigContext";

const usePrimarySale = (source?: PRIMARY_SALE_SOURCES) => {
  const { primarySaleAdapters } = useContext(SharedConfigContext);
  return useMemo(() => {
    if (!source) return;
    return primarySaleAdapters?.find((adapter) => {
      if (adapter.source === source) return adapter;
      else return;
    });
  }, [source, primarySaleAdapters]) as IPrimarySaleAdapter | undefined;
};

export default usePrimarySale;
