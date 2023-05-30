import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import { TextField, FormControl } from "@mui/material";

import Paper from "@mui/material/Paper";
import { productsApi, filterProductsApi } from "@api/products";

export const SkuProducts = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [search, setSearch] = useState("");
    const [isSearchActive, setIsSearchActive] = useState(false);

    const perPage = 12; // Adjust the number of items per page as needed

    useEffect(() => {
        fetchProducts(null, currentPage + 1);
    }, []);

    const fetchProducts = async (e, page) => {
        try {
            let response = await productsApi(page, perPage);
            setData(response.data.data);
            setCurrentPage(response.data.current_page);
            setPageCount(response.data.last_page);
        } catch (error) {
            console.log("error", error);
        }
    };

    const handleSearch = async (e, page = 1) => {
        const filter = {
            name: search,
            page,
            per_page: perPage,
        };
        try {
            setIsSearchActive(true);
            if (search) {
                let response = await filterProductsApi(filter);
                setData(response.data.data);
                setCurrentPage(response.data.current_page);
                setPageCount(response.data.last_page);
            } else {
                fetchProducts(null, 1);
                setIsSearchActive(false);
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <div>
            <div className="product-info py-4">
                <h3 className="my-3">Products</h3>

                <div className="seach-input-sku">
                    <FormControl
                        className="search-field"
                        sx={{ m: 1, minWidth: 500 }}
                    >
                        <TextField
                            id="outlined-basic"
                            label="Search by name"
                            variant="outlined"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </FormControl>
                    <button onClick={handleSearch} className="search-btn">
                        Search
                    </button>
                </div>
                <TableContainer component={Paper}>
                    <Table aria-label="products table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="center">ASIN</TableCell>
                                <TableCell align="center">SKU</TableCell>
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

                                        "& td:first-of-type ": {
                                            maxWidth: "400px",
                                        },
                                    }}
                                >
                                    <TableCell align="left" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.asin}
                                    </TableCell>
                                    <TableCell align="center">
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
                    <Pagination
                        count={pageCount}
                        page={currentPage}
                        onChange={isSearchActive ? handleSearch : fetchProducts}
                    />
                </div>
            </div>
        </div>
    );
};
