import { useEffect, useState, memo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import FilteredProducts from "./FilteredProducts";

const ProductsHomePage = () => {
    const { categorySlug } = useParams();
    const categories = useSelector((state) => state.category.categories);
    const [categoryId, setCategoryId] = useState(null);

    useEffect(() => {
        const categoryId = categories.find((c) => c.slug === categorySlug)?.id;
        setCategoryId(categoryId);
    }, [categories]);

    return <FilteredProducts categoryId={categoryId} />;
};

export default ProductsHomePage;
