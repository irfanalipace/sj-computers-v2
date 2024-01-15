import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
    stepConnectorClasses,
} from "@mui/material/StepConnector";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: "calc(-50% + 6px)",
        right: "calc(50% + 6px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: "#784af4",
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: "#784af4",
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

const steps = ["Ordered", "Shipped", "Expected Delivery"];

export default function CustomizedSteppers() {
    return (
        <Stack sx={{ width: "100%" }} spacing={4}>
            <Stepper
                alternativeLabel
                activeStep={1}
                connector={<QontoConnector />}
            >
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={QontoStepIcon}>
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
}
