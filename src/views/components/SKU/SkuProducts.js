import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import { TextField, FormControl } from "@mui/material";
import Loader from "@common/Spinner/Spinner";

import Paper from "@mui/material/Paper";
import { productsApi, filterProductsApi } from "@api/products";
import { downloadProductsApi } from "@api/inventory";
import { downloadFile } from "@utils/helpers";

export const SkuProducts = ({ reRender }) => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [search, setSearch] = useState("");
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [downloadingProducts, setDownloadingProducts] = useState(false);

    const perPage = 12;

    useEffect(() => {
        fetchProducts(null, currentPage + 1);
    }, []);

    const handleSearch = async (e) => {
        e?.preventDefault(); // Prevent form submission

        setIsLoading(true);
        const filter = {
            name: search,
            page: 1, 
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
            console.error("error", error);
        }

        setIsLoading(false);
    };

    useEffect(() => {
        if (search) handleSearch();
        else fetchProducts(null, currentPage);
    }, [reRender]);

    const downloadProducts = async () => {
        setDownloadingProducts(true);
        try {
            let response = await downloadProductsApi();
            downloadFile(response.data.url);
        } catch (error) {
            console.print(error);
        }
        setDownloadingProducts(false);
    };

    const fetchProducts = async (e, page) => {
        try {
            setIsLoading(true);
            let response = await productsApi(page, perPage);
            setData(response.data.data);
            setCurrentPage(response.data.current_page);
            setPageCount(response.data.last_page);
        } catch (error) {
            console.print("error", error);
        }
        setIsLoading(false);
    };

    // const handleSearch = async (e, page = 1) => {
    //     setIsLoading(true);
    //     const filter = {
    //         name: search,
    //         page,
    //         per_page: perPage,
    //     };
    //     try {
    //         setIsSearchActive(true);
    //         if (search) {
    //             let response = await filterProductsApi(filter);
    //             setData(response.data.data);
    //             setCurrentPage(response.data.current_page);
    //             setPageCount(response.data.last_page);
    //         } else {
    //             fetchProducts(null, 1);
    //             setIsSearchActive(false);
    //         }
    //     } catch (error) {
    //         console.print("error", error);
    //     }
    //     setIsLoading(false);
    // };

    return (
        <div>
            <div className="product-info py-4">
                <h3 className="my-3">Products</h3>

                {/* <div className="seach-input-sku">
               
                    <FormControl
                        className="search-field"
                        sx={{ m: 1, minWidth: 300 }}
                    >
                        <TextField
                            id="outlined-basic"
                            label="Search by name"
                            variant="outlined"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </FormControl>
                    <button onClick={handleSearch} className="sku-form-btn">
                        Search
                    </button>
                   
                    <button
                        className="sku-form-btn ms-3"
                        onClick={downloadProducts}
                    >
                        {downloadingProducts ? (
                            <Loader />
                        ) : (
                            " Download Products"
                        )}
                    </button>
                </div> */}
                <div className="search-input-sku">
                    <form onSubmit={handleSearch}>
                        <FormControl
                            className="search-field"
                            sx={{ m: 1, minWidth: 300 }}
                        >
                            <TextField
                                id="outlined-basic"
                                label="Search by name"
                                variant="outlined"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </FormControl>
                        <button type="submit" className="sku-form-btn">
                            Search
                        </button>
                        <button
                            className="sku-form-btn ms-3"
                            onClick={downloadProducts}
                        >
                            {downloadingProducts ? (
                                <Loader />
                            ) : (
                                " Download Products"
                            )}
                        </button>
                    </form>
                </div>

                <>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <>
                            {" "}
                            <TableContainer component={Paper}>
                                <Table aria-label="products table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell align="center">
                                                ASIN
                                            </TableCell>
                                            <TableCell align="center">
                                                SKU
                                            </TableCell>
                                            <TableCell align="right">
                                                Quantity
                                            </TableCell>
                                            <TableCell align="right">
                                                Price
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.map((row) => (
                                            <TableRow
                                                key={row.name}
                                                sx={{
                                                    "&:last-child td, &:last-child th":
                                                        {
                                                            border: 0,
                                                        },

                                                    "& td:first-of-type ": {
                                                        maxWidth: "400px",
                                                    },
                                                }}
                                            >
                                                <TableCell
                                                    align="left"
                                                    scope="row"
                                                >
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
                                                <TableCell align="right">
                                                    ${row.price}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div
                                className="my-2"
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <Pagination
                                    count={pageCount}
                                    page={currentPage}
                                    onChange={
                                        isSearchActive
                                            ? handleSearch
                                            : fetchProducts
                                    }
                                />
                            </div>
                        </>
                    )}
                </>
            </div>
        </div>
    );
};
