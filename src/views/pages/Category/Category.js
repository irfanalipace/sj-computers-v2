import { useParams } from "react-router-dom";

function Category() {
    let { categorySlug } = useParams();

    return <div>Category: {categorySlug}</div>;
}

export default Category;
