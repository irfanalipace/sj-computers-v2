import React, { useEffect, useState } from "react";
import "./SkuTables.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Table from "./Table";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch } from "react-redux";
import { getInventory } from "../../../core/api/inventory.js";
import DynamicTable from "./DynamicTable";
import DataTable from "./DynamicTable";
const SkuTables = () => {
    const [val, setVal] = useState("");
    const [invent, setInvent] = useState();
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const handleChange = async (e) => {
        await getInventory({
            SKU: e.target.value,
        }).then((_) => {
            setInvent(_.data[0]?.product);
            let obj = [
                {
                    field: _?.data[0]?.product?.id,
                    headerName: "ID#",
                },
                {
                    field: _?.data[0]?.product?.name,
                    headerName: "Name",
                },
                {
                    field: _?.data[0]?.product?.asin,
                    headerName: "ASIN",
                },
            ];
            setData((state) => [...state, { ...obj }]);
            console.log(data, "sd");
        });
        setVal(e.target.value);
    };

    // const data = [
    //     { field: `id`, headerName: "ID#" },
    //     { field: "name", headerName: "Name" },
    //     { field: "asin", headerName: "ASIN" },
    //     { field: "price", headerName: "SKU" },
    //     { field: "rating", headerName: "Total Quantity" },
    //     { field: "rating", headerName: "Hold Quantity" },
    // ];

    return (
        <div>
            <div className="sku-page-dev">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="seach-input-sku">
                            {""}{" "}
                            {/* <label className="search-lable-span"> Search</label> */}
                            <FormControl sx={{ m: 1, minWidth: 300 }}>
                                <InputLabel id="demo-simple-select-label">
                                    Search
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={invent}
                                    label="Search by Name, ASIN"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={"AI-NRCD-SNXP"}>
                                        AI-NRCD-SNXP
                                    </MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            {/* <input
                                type="text"
                                className="search-sku-input-fields"
                                placeholder="Search by Name, ASIN"
                            /> */}
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="search-icon"
                            />
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
                        {invent ? (
                            <>
                                <div style={{ marginTop: "28px" }}>
                                    <h3 className="your-selected-product-sku">
                                        Your Selected Products
                                    </h3>
                                    <DataTable columns={data} rows={invent} />
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
