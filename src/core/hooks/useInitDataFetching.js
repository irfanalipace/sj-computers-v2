import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchBrands } from "@store/brands/brandsThunks";
import { fetchCategory } from "@store/category/categoryThunks";

export const useInitDataFetching = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCategory());
        dispatch(fetchBrands());
    }, []);
};
