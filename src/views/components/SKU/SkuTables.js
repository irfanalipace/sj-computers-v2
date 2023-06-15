import { useState } from "react";
import "./SkuTables.css";
import { TextField, FormControl } from "@mui/material";
import { getInventory, inventoryAction } from "@api/inventory.js";
import LoaderComponent from "@common/LoaderComponent/LoaderComponent";

export const SkuTables = ({render, setRender}) => {
    const [invent, setInvent] = useState();
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [holdQuantity, setholdQuantity] = useState("");
    const [loading, setLoading] = useState(false);
    const [action, setAction] = useState(null);

    const handleChange = async (e) => {
        setLoading(true);
        await getInventory(search)
            .then((_) => {
                setLoading(false);

                if (_.data.length > 0) {
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
                }
            })
            .catch((e) => {
                setLoading(false);
                console.print(search);
            });
    };

    const handlehold = async (e) => {
        setLoading(true);
        await inventoryAction({
            action: "hold",
            quantity: holdQuantity,
            search,
        })
            .then((_) => {
                setLoading(false);
                setAction("HOLD");
                setRender(render+1);
         
                if (_.data.length > 0) {
                    setInvent(_?.data[0]?.product);
                    let obj = [
                        {
                            id: _?.data[0]?.product?.id,
                            name: _?.data[0]?.product?.name,
                            asin: _?.data[0]?.product?.asin,
                            sku: _?.data[0]?.product?.sku,
                            hQuantity: holdQuantity,
                            fQuantity: _?.data[0]?.quantity,
                        },
                    ];
                    setData(() => [...obj]);
                }
            })
            .catch((e) => {
                setLoading(false);
            });
    };

    const handleRelease = async (e) => {
        setLoading(true);
        setholdQuantity(null);
        await inventoryAction({
            action: "release",
            quantity: holdQuantity,
            search: search,
        })
            .then((_) => {
                setAction("RELEASE");
                setLoading(false);
                if (_.data.length > 0) {
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
                    setholdQuantity(0);
                    setData(() => [...obj]);
                }
            })
            .catch((e) => {
                setLoading(false);
            });
    };

    const handleBuy = () => {
        setInvent();
        setData([]);
        setSearch("");
        setholdQuantity("");
        setLoading(false);
        setAction("");
    };

    return (
        <div>
            <div className="sku-page-dev mb-5">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 ps-0">
                        {/* <div className="seach-input-sku">
                            {""}{" "}
                            <FormControl
                                className="search-field"
                                sx={{ m: 1, minWidth: 500 }}
                            >
                                <TextField
                                    id="outlined-basic"
                                    label="Search by SKU"
                                    variant="outlined"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </FormControl>
                            <button
                                onClick={handleChange}
                                className="sku-form-btn"
                            >
                                Search
                            </button>
                        </div> */}
                   
                        <div className="seach-input-sku">
                            {""}{" "}
                            <FormControl
                                className="search-field"
                                sx={{ m: 1, minWidth: 500 }}
                            >
                                <TextField
                                    id="outlined-basic"
                                    label="Search by SKU"
                                    variant="outlined"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </FormControl>
                            <button
                                onClick={handleChange}
                                className="sku-form-btn"
                            >
                                Search
                            </button>
                        </div>
                      
                    </div>
                </div>
                {invent?.id ? (
                    <div className="row">
                        <div className="sku-main-dev-button">
                            <span>
                                <b>Add or Release Product’s quantity</b>
                            </span>
                            <div
                                style={{
                                    marginTop: "10px",
                                    paddingBottom: "4px",
                                }}
                                className="mein-input-dev-section"
                            >
                                <input
                                    type="text"
                                    className="search-sku-input-asin"
                                    placeholder="Enter quantity..."
                                    value={holdQuantity}
                                    // readOnly={action === "HOLD"}
                                    onChange={(_) =>
                                        setholdQuantity(_.target.value)
                                    }
                                />
                            </div>

                            <div className="button-sku-button">
                                {/* {(!action || action === "RELEASE") && ( */}
                                <button onClick={handlehold} disabled={loading}>
                                    Hold
                                </button>
                                {/* )} */}
                                {/* {action === "HOLD" && (
                                    <button
                                        onClick={handleRelease}
                                        style={{
                                            
                                            background: "#269C40",
                                            border: "none",
                                        }}
                                        disabled={loading}
                                    >
                                        Release
                                    </button>
                                )} */}
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
                <div>
                    <div>
                        {" "}
                        {loading ? (
                            <LoaderComponent />
                        ) : (
                            <>
                                {invent?.id ? (
                                    <>
                                        <div
                                            style={{
                                                marginTop: "28px",
                                            }}
                                        >
                                            <h3 className="your-selected-product-sku">
                                                Your Selected Products
                                            </h3>
                                            <div>
                                                {data.map((row, index) => (
                                                    <div
                                                        className="table"
                                                        key={index}
                                                    >
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
                                                                {row.hQuantity}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleBuy}
                                            className="buy-now-button-sku"
                                        >
                                            Clear
                                        </button>{" "}
                                    </>
                                ) : (
                                    <h3 className="my-3">No data to show...</h3>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
