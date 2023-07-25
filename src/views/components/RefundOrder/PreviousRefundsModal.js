import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import {
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Pagination,
} from "@mui/material";

import {
    getPreviousRefundsListSj,
    getPreviousRefundsListOto,
} from "@api/refund-order";
import { USER_TYPE_ENUM } from "@pages/RefundOrder/constants";
import { STATUS_COLOR_ENUM } from "@utils/constants";

import Loader from "@common/Spinner/Spinner";

export default function PreviousRefundsModal({
    showModal = false,
    handleClose,
    selectedUserType,
    userID,
}) {
    const [data, setData] = useState({
        current_page: 1,
        data: [],
        last_page: 1,
    });
    const [isLoading, setIsLoading] = useState(false);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        "&:last-child td, &:last-child th": {
            border: 0,
        },
    }));

    const fetchPreviousRefundsData = async (e, value) => {
        switch (selectedUserType) {
            case USER_TYPE_ENUM.CUSTOMER:
                try {
                    setIsLoading(true);
                    let response = await getPreviousRefundsListSj({
                        per_page: 10,
                        page: value || data?.current_page,
                        user_id: userID,
                    });
                    console.log("response", response?.data);
                    setData(response?.data);
                } catch (error) {}
                break;
            case USER_TYPE_ENUM.SALE_PERSON:
                try {
                    setIsLoading(true);
                    let response = await getPreviousRefundsListOto({
                        per_page: 10,
                        page: value || data?.current_page,
                        customer_id: userID,
                    });
                    console.log("response", response?.data);
                    setData(response?.data);
                } catch (error) {}
                break;

            default:
                break;
        }
        setIsLoading(false);

        getPreviousRefundsListSj;
    };

    useEffect(() => {
        fetchPreviousRefundsData();
    }, [selectedUserType]);

    const getModuleText = () => {
        if (selectedUserType === USER_TYPE_ENUM.CUSTOMER) return "Order";
        return "Invoice";
    };

    return (
        <Modal show={showModal} onHide={handleClose} size="xl" centered>
            <Modal.Header closeButton className="header">
                <Modal.Title>Previous Refunds</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>
                                    {getModuleText()}#
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Total Paid
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Total Refund
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Note
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Status
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        {isLoading ? (
                            <tr>
                                <td colSpan={5}>
                                    <div
                                        className="d-flex justify-content-center align-items-center"
                                        style={{
                                            minHeight: "400px",
                                            width: "100%",
                                        }}
                                    >
                                        <Loader />
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            <TableBody>
                                <>
                                    {data?.data?.map((row) => (
                                        <StyledTableRow key={row?.id}>
                                            <StyledTableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {row?.order_id ||
                                                    row?.order_number ||
                                                    "SJ-INV-" +
                                                        row?.invoice?.id}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                {selectedUserType ===
                                                USER_TYPE_ENUM.CUSTOMER
                                                    ? row?.orders?.total_amount
                                                    : row?.invoice?.total}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                {row?.amount}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                {row?.reasons ||
                                                    row?.reason ||
                                                    "--"}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                <span
                                                    class={
                                                        "text-capitalize badge rounded-pill bg-" +
                                                        STATUS_COLOR_ENUM[
                                                            row?.status
                                                        ]
                                                    }
                                                >
                                                    {row?.status}
                                                </span>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}{" "}
                                </>
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>
            </Modal.Body>

            <Modal.Footer>
                <Pagination
                    count={data?.last_page}
                    page={data?.current_page}
                    onChange={fetchPreviousRefundsData}
                />
            </Modal.Footer>
        </Modal>
    );
}
