import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mantine/core";
import Paper from "@mui/material/Paper";
import { productsApi } from "@api/products";

export const SkuProducts = () => {
    const [data, setData] = useState([
        { name: "fdsafa", asin: "fdsafa", sku: "fsdfsa", quantity: "2" },
        { name: "fdsafa", asin: "fdsafa", sku: "fsdfsa", quantity: "2" },
        { name: "fdsafa", asin: "fdsafa", sku: "fsdfsa", quantity: "2" },
        { name: "fdsafa", asin: "fdsafa", sku: "fsdfsa", quantity: "2" },
        { name: "fdsafa", asin: "fdsafa", sku: "fsdfsa", quantity: "2" },
        { name: "fdsafa", asin: "fdsafa", sku: "fsdfsa", quantity: "2" },
    ]);

    const [currentPage, setCurrentPage] = useState(0);

    const [totalRecords, setTotalRecords] = useState(40);

    useEffect(() => {
        fetchProducts(currentPage + 1);
    }, []);

    const fetchProducts = async (page) => {
        let response = await productsApi(page, perPage);
    };

    const totalItems = 40;

    const perPage = 12; // Adjust the number of items per page as needed
    // ...

    const pageCount = Math.ceil(totalRecords / perPage);

    const goToPage = (page) => {
        setCurrentPage(page);
        sendToPage(page);
    };

    const nextPage = () => {
        if (currentPage < pageCount) {
            // setCurrentPage((prevPage) => prevPage + 1);
            setCurrentPage(currentPage + 1);
            console.log(currentPage, "current after next");
            console.log(currentPage + 1, "+1 after next");
            sendToPage(currentPage + 1);
        }
    };

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            sendToPage(currentPage - 1);
        }
    };

    const renderPagination = () => {
        const pages = [];

        // Case 1: More than 5 pages
        if (pageCount > 5) {
            for (let i = 1; i <= 2; i++) {
                pages.push(
                    <Button
                        style={{
                            background:
                                currentPage === i ? "#198754" : "outline",
                            margin: "0px 5px",
                        }}
                        key={i}
                        onClick={() => goToPage(i)}
                        variant={currentPage === i ? "filled" : "outline"}
                    >
                        {i}
                    </Button>
                );
            }
            pages.push(<span key="dots">...</span>);
            pages.push(
                <Button
                    style={{
                        background:
                            currentPage === pageCount ? "#198754" : "outline",
                        margin: "0px 5px",
                    }}
                    key={pageCount}
                    onClick={() => goToPage(pageCount)}
                    variant={currentPage === pageCount ? "filled" : "outline"}
                >
                    {pageCount}
                </Button>
            );
        }
        // Case 2: Less than or equal to 5 pages
        else {
            for (let i = 1; i <= pageCount; i++) {
                pages.push(
                    <Button
                        style={{
                            background:
                                currentPage === i ? "#198754" : "outline",
                            margin: "0px 5px",
                        }}
                        key={i}
                        onClick={() => goToPage(i)}
                        variant={currentPage === i ? "filled" : "outline"}
                    >
                        {i}
                    </Button>
                );
            }
        }

        return <div>{pages}</div>;
    };

    return (
        <div>
            <div className="product-info py-4">
                <h3 className="my-3">Products</h3>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">ASIN</TableCell>
                                <TableCell align="right">SKU</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.asin}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.sku}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.quantity}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div
                    className="my-2"
                    style={{ display: "flex", justifyContent: "flex-end" }}
                >
                    <Button
                        style={{ background: "#198754", marginRight: "2px" }}
                        onClick={previousPage}
                        disabled={currentPage === 1}
                        className="toggle-button-table-data"
                    >
                        Previous
                    </Button>
                    {renderPagination()}
                    <Button
                        style={{ background: "#198754" }}
                        onClick={nextPage}
                        disabled={currentPage === pageCount}
                        className="toggle-button-table-data"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};
