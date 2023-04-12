Product;
import { useParams } from "react-router-dom";

export default function Product() {
    let { productId } = useParams();
    return <div>Product {productId}</div>;
}
