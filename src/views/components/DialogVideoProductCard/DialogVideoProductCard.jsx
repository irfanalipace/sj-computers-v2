import { Grid, Typography } from '@mui/material'
import React from 'react'
import StarRatings from "react-star-ratings";
import { Link } from 'react-router-dom';

function DialogVideoProductCard({product}) {
  return (
    <Link to={`${new URL(product?.url).pathname}`} style={{textDecoration: "none", }}>
      <Grid container border={".5px solid gray"} borderRadius={"10px"} height={"110px"} py={1} >
        <Grid item xs={4} px={1} py={1} m={"auto"}>
            <img width={"90px"}  src={product?.image} alt={product?.name?.trim()?.split(" ")?.slice(0, 9)?.join(" ")} />
        </Grid>
        <Grid item xs={8} m={"auto"} pb={2}>
            <Typography variant={"body2"}>
                {product?.name?.trim()?.split(" ")?.slice(0, 9)?.join(" ")}
            </Typography>
            <StarRatings
              rating={product.rating}
              starRatedColor="rgb(232, 126, 36)"
              numberOfStars={5}
              name="rating"
              isSelectable={false}
              starDimension={"15px"}
              starSpacing={"0"}
            />
        </Grid>
      </Grid>
    </Link>
  )
}

export default DialogVideoProductCard