import { useState, useEffect, useMemo } from "react";

export const useFilteredItems = <T>(
  itemList: T[],
  searchParam: string,
  filterParams: (keyof T)[]
): T[] => {
  const [filteredItems, setFilteredItems] = useState<T[]>(itemList);
  const searchRegExp = useMemo(
    () => new RegExp(searchParam, "i"),
    [searchParam]
  );

  useEffect(() => {
    const filterItems = () => {
      const filteredList = itemList.filter((item) => {
        return filterParams.some((param) => {
          const itemValue = item[param]
            ? item[param].toString().toLowerCase()
            : "";

          return searchRegExp.test(itemValue);
        });
      });

      setFilteredItems(filteredList);
    };

    filterItems();

    return () => {
      // Perform cleanup if needed
    };
  }, [itemList, searchParam, filterParams, searchRegExp]);

  return filteredItems;
};

export default useFilteredItems;
