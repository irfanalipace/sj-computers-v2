import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import FilteredProducts from "./FilteredProducts";

const ProductsByCategory = ({ toggleFilter }) => {
    const { categorySlug } = useParams();
    const categories = useSelector((state) => state.category.categories);
    const [category, setCategory] = useState(null);

    useEffect(() => {
        const _category = categories.find((c) => c.slug === categorySlug);
        setCategory(_category);
        console.log("11 categorySlug: ", categorySlug);
    }, [categories, categorySlug]);

    return <FilteredProducts category={category} toggleFilter={toggleFilter} />;
};

export default ProductsByCategory;
