import { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart, addToLocalCart } from '@store/cart/cartThunks';

function useAddToCart(product, quantity) {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [addItem, setAdditem] = useState(0);
  // const cart = useSelector((state) => state.cart.cart);
  const details = useSelector(state => state.cart.details);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const cartClickHandler = (plan, redirectPath) => {
    const cartQuantity = details?.total_items + 1;
    const itemProtectedPlanPrice = parseFloat(plan?.price || 0) * quantity;
    const productPrice = parseFloat(product?.price * quantity);
    const cartTotal =
      parseFloat(details?.total) + productPrice + itemProtectedPlanPrice;
    const cartSubTotal =
      parseFloat(details?.sub_total) + productPrice + itemProtectedPlanPrice;

    const cartItem = {
      id: product?.id,
      quantity,
      price: productPrice,
      plan_price: itemProtectedPlanPrice,
      product: {
        ...product,
        in_stock: quantity >= product?.quantity ? false : true,
      },
      ...(plan && { plan }),
    };

    const cartDetails = {
      total_items: cartQuantity,
      total: cartTotal.toFixed(2),
      sub_total: cartSubTotal.toFixed(2),
    };

    // const redirectPath =
    //     type?.toLowerCase() === "buynow"
    //         ? `/checkout?id=${product.id}`
    //         : `/add-to-cart/${params?.title}/dp/${params?.productId}${
    //               addingitem ? `/${1}` : ""
    //           }`;
    isAuthenticated
      ? dispatch(addToCart({ cartItem }, () => navigate(redirectPath)))
      : dispatch(
          addToLocalCart({ cartItem, cartDetails }, () =>
            navigate(redirectPath),
          ),
        );
  };

  return useMemo(
    () => cartClickHandler,
    [
      isAuthenticated,
      JSON.stringify(product),
      quantity,
      JSON.stringify(details),
    ],
  );
}

export default useAddToCart;
