import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
    stepConnectorClasses,
} from "@mui/material/StepConnector";
import { stepLabelClasses } from "@mui/material";
import { Typography } from "@mui/material";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: "calc(-100% + 19px)",
        right: "calc(0% + 19px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: "#E87E24",
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: "#E87E24",
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor:
            theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
        color: "#784af4",
    }),
    "& .QontoStepIcon-completedIcon": {
        width: 12,
        height: 12,
        borderRadius: "50%",
        backgroundColor: "#E87E24",
    },
    "& .QontoStepIcon-circle": {
        width: 12,
        height: 12,
        borderRadius: "50%",
        backgroundColor: "#DDDDDD",
    },
}));

function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <div className="QontoStepIcon-completedIcon" />
            ) : (
                <div className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    );
}

const steps = [
    { label: "Ordered", description: "April 11, 2023" },
    { label: "Shipped", description: "April 18, 2023" },
    { label: "Expected Delivery", description: "May 05, 2023" },
];

export default function CustomizedSteppers({ step = 2 }) {
    return (
        <Stack sx={{ width: "100%" }} spacing={4}>
            <Stepper
                alternativeLabel
                activeStep={step}
                connector={<QontoConnector />}
                sx={{
                    "& .MuiStep-root:first-child .MuiStepLabel-root": {
                        alignItems: "flex-start",
                    },
                    "& .MuiStep-root:second-child .MuiStepLabel-root": {
                        alignItems: "center",
                    },
                    "& .MuiStep-root:last-child .MuiStepLabel-root": {
                        alignItems: "flex-end",
                    },
                    "& .MuiStep-root:first-child .MuiStepLabel-labelContainer":
                        {
                            display: "flex",
                        },
                    "& .MuiStep-root:second-child .MuiStepLabel-labelContainer":
                        {
                            // width: "150px",
                        },
                    "& .MuiStep-root:last-child .MuiStepLabel-labelContainer": {
                        // width: "150px",
                        display: "flex",
                        justifyContent: "end",
                    },
                }}
            >
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={QontoStepIcon}>
                            <Typography
                                fontFamily={"Inter"}
                                fontSize={"14px"}
                                lineHeight={"16px"}
                                fontWeight={500}
                            >
                                {label.label}
                            </Typography>
                            <Typography
                                sx={{ mt: 1 }}
                                fontFamily={"Inter"}
                                fontSize={"14px"}
                                lineHeight={"16px"}
                                fontWeight={400}
                            >
                                {label.description}
                            </Typography>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
}
