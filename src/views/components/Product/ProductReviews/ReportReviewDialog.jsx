import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import { Typography, Stack, Box, Button } from "@mui/material";
// import LoadingButton from "@mui/lab/LoadingButton";
import { reviewReportHelpfullApi } from "../../../../core/api/product-review";
import { toast } from "react-toastify";

export default function ReportDialog(props) {
    const { onClose, selectedValue, id, open } = props;
    const [loading, setLoading] = React.useState(false);
    const [checkedItems, setCheckedItems] = React.useState({});

    const handleClose = () => {
        onClose(selectedValue);
    };

    React.useEffect(() => {
        setCheckedItems({});
    }, []);

    const reportReview = async () => {
        const allSelectedCheckboxes = Object.keys(checkedItems).filter(
            (key) => checkedItems[key],
        );
        const data = {
            product_review_id: id,
            button_type: "report",
            review_report: allSelectedCheckboxes,
        };

        try {
            setLoading(true);
            const res = await reviewReportHelpfullApi(data);
            toast.success("Review Reported Successfully");
        } catch (error) {
            toast.error("Failed to report review");
        } finally {
            setLoading(false);
        }
    };

    const handleCheckboxChange = (name) => {
        setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            [name]: !prevCheckedItems[name],
        }));
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Report this review</DialogTitle>
            <FormControl sx={{ px: 3 }}>
                <FormLabel sx={{ mb: 1.5 }} id="demo-radio-buttons-group-label">
                    <Typography
                        fontSize={"13px"}
                        fontWeight={400}
                        fontFamily={"Inter"}
                        lineHeight={"20px"}
                        color={"#0F1111"}
                    >
                        Optional: Why are you reporting this?
                    </Typography>
                </FormLabel>

                <FormGroup>
                    <FormControlLabel
                        sx={{ mb: 1.5 }}
                        checked={checkedItems.off_topic}
                        onChange={() => handleCheckboxChange("off_topic")}
                        control={<Checkbox defaultChecked />}
                        label={
                            <CheckBoxLabel
                                title={"Off topic"}
                                desc="Not about the product"
                            />
                        }
                    />
                    <FormControlLabel
                        sx={{ mb: 1.5 }}
                        checked={checkedItems.inappropriate}
                        onChange={() => handleCheckboxChange("inappropriate")}
                        control={<Checkbox />}
                        label={
                            <CheckBoxLabel
                                title={"Inappropriate"}
                                desc="Disrespectful, hateful, abscene"
                            />
                        }
                    />
                    <FormControlLabel
                        sx={{ mb: 1.5 }}
                        control={<Checkbox />}
                        checked={checkedItems.fake}
                        onChange={() => handleCheckboxChange("fake")}
                        label={
                            <CheckBoxLabel
                                title={"Fake"}
                                desc="Paid for, inauthentic"
                            />
                        }
                    />

                    <FormControlLabel
                        control={<Checkbox />}
                        sx={{ mb: 1.5 }}
                        checked={checkedItems.other}
                        onChange={() => handleCheckboxChange("other")}
                        label={
                            <CheckBoxLabel
                                title={"Other"}
                                desc="Something else"
                            />
                        }
                    />
                </FormGroup>
            </FormControl>
            <Box sx={{ px: 3, mb: 3 }}>
                <Typography
                    fontSize={"13px"}
                    fontWeight={400}
                    fontFamily={"Inter"}
                    lineHeight={"20px"}
                    color={"#0F1111"}
                    sx={{ maxWidth: "380px", mb: 2 }}
                >
                    We'll check this if this reveiw meets our{" "}
                    <span style={{ color: "#007185" }}>
                        community guidelines.
                    </span>{" "}
                    if doesn't, we'll remove it.
                </Typography>

                <Box sx={{ float: "right" }}>
                    <Button onClick={onClose} sx={{ mr: 2 }} variant="outlined">
                        Cancel
                    </Button>
                    <Button
                        // loading={loading}
                        onClick={reportReview}
                        variant="contained"
                        color="success"
                    >
                        {loading ? "Submitting" : "Submit"}
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
}

const CheckBoxLabel = ({ title, desc }) => {
    return (
        <Stack>
            <Typography
                fontSize={"13px"}
                fontWeight={400}
                fontFamily={"Inter"}
                lineHeight={"20px"}
                color={"#0F1111"}
            >
                {title}
            </Typography>
            <Typography
                fontSize={"13px"}
                fontWeight={400}
                fontFamily={"Inter"}
                lineHeight={"20px"}
                color={"#565959"}
            >
                {desc}
            </Typography>
        </Stack>
    );
};
