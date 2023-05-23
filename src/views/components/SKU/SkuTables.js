import React, { useEffect, useState } from "react";
import "./SkuTables.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Table from "./Table";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { getInventory } from "../../../core/api/inventory.js";
import DataTable from "./DynamicTable";
const SkuTables = () => {
    const [invent, setInvent] = useState();
    const [data, setData] = useState([]);
    const handleChange = async (e) => {
        await getInventory({
            SKU: e.target.value,
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
    const columns = [
        { field: "id", headerName: "ID", width: 130 },
        { field: "name", headerName: "Name", width: 150 },
        { field: "asin", headerName: "ASIN", width: 150 },
        {
            field: "sku",
            headerName: "SKU",
            type: "number",
            width: 100,
        },
        {
            field: "quantity",
            headerName: "Total Quantity",
            sortable: false,
            width: 170,
        },
        {
            field: "hold_quantity",
            headerName: "Hold Quantity",
            sortable: false,
            width: 180,
        },
    ];

    return (
        <div>
            <div className="sku-page-dev">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="seach-input-sku">
                            {""}{" "}
                            <FormControl sx={{ m: 1, minWidth: 300 }}>
                                <TextField
                                    id="outlined-basic"
                                    label="Search"
                                    variant="outlined"
                                    onChange={(e) => e.target.value}
                                    value={invent}
                                    onChange={handleChange}
                                />
                                {/* <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={invent}
                                    label="Search by Name, ASIN"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={"AI-NRCD-SNXP"}>
                                        AI-NRCD-SNXP
                                    </MenuItem>
                                </Select> */}
                            </FormControl>
                            {/* <FontAwesomeIcon
                                icon={faSearch}
                                className="search-icon"
                            /> */}
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
                            {/* <input
                                type="text"
                                className="search-sku-input-quantity"
                                placeholder="Add Quantity"
                            /> */}
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
                                    <DataTable columns={columns} rows={data} />
                                </div>
                                <button className="buy-now-button-sku">
                                    Buy Now
                                </button>{" "}
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkuTables;
