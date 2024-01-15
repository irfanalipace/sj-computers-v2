import React from "react";
import CustomizedSteppers from "../../components/Stepper/indes";
import {
    Box,
    Container,
    Divider,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import ShipmentInformation from "../../components/Stepper/ShipmentInformation";
import TrackingHistory from "../../components/Stepper/TrackingHistory";
import ItemsInShipment from "../../components/Stepper/ItemsInShipment";
import ExpectOnDeliveryDay from "../../components/Stepper/ExpectOnDeliveryDay";
import Recommendation from "../../components/Recommendation/Recommendation";
import { useSelector } from "react-redux";
const TrackOrder = () => {
    const products = useSelector((state) => state.products.products);

    return (
        <>
            <Container sx={{ my: 4 }}>
                <Box mt={2} mb={4}>
                    <Typography
                        fontWeight={400}
                        fontSize={"28px"}
                        fontFamily={"Inter"}
                        lineHeight={"33px"}
                    >
                        Track Package
                    </Typography>
                    <Box mt={2}>
                        <Stack direction={"row"} spacing={2}>
                            <Typography
                                fontWeight={500}
                                fontSize={"14px"}
                                fontFamily={"Inter"}
                                lineHeight={"16px"}
                            >
                                Estimated Delivery:
                            </Typography>
                            <Typography
                                fontWeight={400}
                                fontSize={"14px"}
                                fontFamily={"Inter"}
                                lineHeight={"16px"}
                            >
                                May 8, 2023
                            </Typography>
                        </Stack>
                        <Typography
                            fontWeight={400}
                            fontSize={"14px"}
                            fontFamily={"Inter"}
                            lineHeight={"33px"}
                        >
                            Arrived at FedEx location
                        </Typography>
                    </Box>
                </Box>
                <CustomizedSteppers />
                <Grid mt={5} container spacing={2}>
                    <Grid item xs={5}>
                        <ShipmentInformation />
                        <Box mt={6}>
                            <ItemsInShipment />
                        </Box>
                    </Grid>
                    <Grid item xs={7}>
                        <TrackingHistory />
                        <Box mt={6}>
                            <ExpectOnDeliveryDay />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Box>
                <Recommendation products={products} />
            </Box>
        </>
    );
};

export default TrackOrder;
