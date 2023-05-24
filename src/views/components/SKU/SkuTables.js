import React, { useState } from "react";
import "./SkuTables.css";
import { FormControl, InputAdornment, TextField } from "@mui/material";
import { getInventory } from "../../../core/api/inventory.js";
import SearchIcon from "@mui/icons-material/Search";
import LoaderComponent from "@common/LoaderComponent/LoaderComponent";

const SkuTables = () => {
    const [invent, setInvent] = useState();
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = async (e) => {
        setLoading(true);
        await getInventory({
            SKU: search,
        }).then((_) => {
            setInvent(_.data[0]?.product);
            let obj = [
                {
                    id: _?.data[0]?.product?.id,
                    name: _?.data[0]?.product?.name,
                    asin: _?.data[0]?.product?.asin,
                    sku: _?.data[0]?.product?.sku,
                    hQuantity: 0,
                    fQuantity: _?.data[0]?.quantity,
                },
            ];
            setData(() => [...obj]);
        });
    };

    return (
        <div>
            <div className="sku-page-dev">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="seach-input-sku">
                            {""}{" "}
                            <FormControl
                                classname="search-field"
                                sx={{ m: 1, minWidth: 500 }}
                            >
                                <TextField
                                    id="outlined-basic"
                                    label="Search by SKU"
                                    variant="outlined"
                                    onChange={(e) => e.target.value}
                                    value={data?.SKU}
                                    onChange={(e) => setSearch(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <SearchIcon />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <button
                                onClick={handleChange}
                                className="search-btn"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="sku-main-dev-button">
                        <span>
                            <b>Add or Release Product’s quantity</b>
                        </span>
                        <div
                            style={{ marginTop: "10px", paddingBottom: "4px" }}
                            className="mein-input-dev-section"
                        >
                            <input
                                type="text"
                                className="search-sku-input-asin"
                                placeholder="Enter quantity..."
                            />
                        </div>

                        <div className="button-sku-button">
                            <button>Hold</button>
                            <button
                                style={{
                                    background: "#269C40",
                                    border: "none",
                                }}
                            >
                                Release
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="col-lg-8 col-md-10 col-sm-12">
                        {invent && data ? (
                            <>
                                <div style={{ marginTop: "28px" }}>
                                    <h3 className="your-selected-product-sku">
                                        Your Selected Products
                                    </h3>
                                    <div>
                                        {data.map((row) => (
                                            <div className="table">
                                                <div className="sku-table-cell">
                                                    <div className="sku-table-headers">
                                                        #ID
                                                    </div>
                                                    <div className="sku-table-data">
                                                        {row.id}
                                                    </div>
                                                </div>
                                                <div className="sku-table-cell">
                                                    <div className="sku-table-headers">
                                                        Name
                                                    </div>
                                                    <div className="sku-table-data">
                                                        {row.name}
                                                    </div>
                                                </div>
                                                <div className="sku-table-cell">
                                                    <div className="sku-table-headers">
                                                        ASIN
                                                    </div>
                                                    <div className="sku-table-data">
                                                        {row.asin}
                                                    </div>
                                                </div>
                                                <div className="sku-table-cell">
                                                    <div className="sku-table-headers">
                                                        SKU
                                                    </div>
                                                    <div className="sku-table-data">
                                                        {row.sku}
                                                    </div>
                                                </div>
                                                <div className="sku-table-cell">
                                                    <div className="sku-table-headers">
                                                        Total Quantity
                                                    </div>
                                                    <div className="sku-table-data">
                                                        {row.fQuantity}
                                                    </div>
                                                </div>
                                                <div className="sku-table-cell">
                                                    <div className="sku-table-headers">
                                                        Hold Quantity
                                                    </div>
                                                    <div className="sku-table-data">
                                                        {0}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button className="buy-now-button-sku">
                                    Buy Now
                                </button>{" "}
                            </>
                        ) : (
                            <> {loading && <LoaderComponent />}</>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkuTables;
