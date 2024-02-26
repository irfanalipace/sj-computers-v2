import { useState, useEffect } from "react";
import { productSpecificDetailsReview } from "../../../../../core/api/product-review";

const useSpecificReview = (id, reviews) => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const propsReviewsData = reviews?.product_review?.data?.filter(
            (review) => review.id === id,
        );
        // console.log(propsReviewsData, "props reviews data");
        if (propsReviewsData?.length > 0) {
            // console.log("present in props data");
            setData(propsReviewsData[0]);
        } else {
            // console.log("not present in props data");

            try {
                const response = await productSpecificDetailsReview(id);

                // console.log(response.data, "response");
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    // console.log(data, "returned data");

    return { data, loading, error };
};

export default useSpecificReview;
