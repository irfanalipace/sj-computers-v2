import { Grid, Typography } from '@mui/material'
import React from 'react'

const CategoryParagraph = () => {
  return (
    <Grid container p={6} rowGap={1}>
        <Grid item xs={12}>
            <Typography variant='body1' fontWeight={"bolder"} color={"#E87E24"}>Welcome to the Office Products & Office Supplies Store at Sjcomputers.com</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography variant='body2'>Shoping for <span style={{fontWeight: '500'}}>your office products & office  supplies from SJ Computers Refurbished is your destination for refurbished desktops, laptops, and accessories. All our products are backed by SJ Computers Guerentee </span></Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography variant='body2'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, quo. Et, ratione nemo. Facilis rerum ullam quis repudiandae voluptatem beatae repellendus libero nihil vel. Similique sequi maxime accusamus vel, amet vitae neque, accusantium nostrum voluptatum magni eum animi tempore aliquam suscipit numquam. Aut tempora dicta eligendi, ullam exercitationem officia possimus, sed nisi accusamus tenetur dolore at minima perferendis aliquam incidunt ratione enim atque voluptates fugiat voluptate ipsa facilis. Repellendus, voluptate, doloremque, quae ipsa autem possimus quas atque quia sed similique repudiandae commodi ad incidunt.</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography variant='body2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur tempore cupiditate corporis, iure earum inventore voluptas ratione laboriosam quibusdam quam impedit magni repellat, incidunt error distinctio! Veniam voluptatem sed deleniti excepturi, labore inventore soluta incidunt ad nesciunt neque dolor reiciendis ipsum, quo sit accusamus id iusto minima explicabo autem. Fugit deleniti nemo veritatis pariatur odio molestias asperiores perferendis exercitationem facilis itaque possimus, cumque animi unde ad omnis minima non saepe natus nihil consequuntur, quia dolorem, id doloremque. Accusantium impedit quos doloremque repellat labore </Typography>
        </Grid>
    </Grid>
  )
}

export default CategoryParagraph