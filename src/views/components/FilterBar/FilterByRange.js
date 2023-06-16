import React from 'react'
import FilterBar from './FilterBar';

const FilterByRange = ({getCategory}) => {
    let renderRangeSliders = (category) => {
        return (
            <div>
                {filters[category]?.least_MB &&
                filters[category]?.highest_MB ? (
                    <div className="my-2  filter-value">
                        <label
                            className="radio-container"
                            htmlFor={category + "MB"}
                        >
                            <input
                                type="radio"
                                value="MB"
                                id={category + "MB"}
                                className="me-1"
                                name={category}
                                checked={selectedUnit[category]?.unit === "MB"}
                                onChange={() => handleRangeUnit(category, "MB")}
                            />
                            <span className="radiomark "></span>
                            MB
                        </label>
                    </div>
                ) : (
                    <></>
                )}

                {filters[category]?.least_GB &&
                filters[category]?.highest_GB ? (
                    <div className="my-2  filter-value">
                        <label
                            className="radio-container"
                            htmlFor={category + "GB"}
                        >
                            <input
                                type="radio"
                                value="GB"
                                id={category + "GB"}
                                className="me-1"
                                name={category}
                                checked={selectedUnit[category]?.unit === "GB"}
                                onChange={(e) =>
                                    handleRangeUnit(category, "GB")
                                }
                            />
                            <span className="radiomark "></span>
                            GB
                        </label>
                    </div>
                ) : (
                    <></>
                )}

                {filters[category]?.least_TB &&
                filters[category]?.highest_TB ? (
                    <li className="my-2 filter-value">
                        <label
                            className="radio-container"
                            htmlFor={category + "TB"}
                        >
                            <input
                                type="radio"
                                value="TB"
                                id={category + "TB"}
                                className="me-1"
                                name={category}
                                checked={selectedUnit[category]?.unit === "TB"}
                                onChange={(e, values) =>
                                    handleRangeUnit(category, "TB")
                                }
                            />
                            <span className="radiomark "></span>
                            TB
                        </label>
                    </li>
                ) : (
                    <></>
                )}
                <div>
                    <Slider
                        style={{ color: "#52ac66" }}
                        value={[
                            selectedUnit[category].range?.min ||
                                rangeValues[category][
                                    selectedUnit[category]?.unit
                                ]?.min,
                            selectedUnit[category].range?.max ||
                                rangeValues[category][
                                    selectedUnit[category]?.unit
                                ]?.max,
                        ]}
                        onChange={(e, values) =>
                            handleRange(
                                e,
                                category,
                                selectedUnit[category]?.unit,
                                values
                            )
                        }
                        valueLabelDisplay="auto"
                        min={
                            rangeValues[category][selectedUnit[category]?.unit]
                                ?.min
                        }
                        max={
                            rangeValues[category][selectedUnit[category]?.unit]
                                ?.max
                        }
                        aria-labelledby="price-range-slider"
                    />
                </div>
                <div className="filter-button-category-page">
                    <Button
                        isLoading={isLoading}
                        onClick={(e) => applyRange(e, category)}
                    >
                        Apply
                    </Button>
                </div>
            </div>
        );
    };
  return (
    <div>
        {/* <FilterBar renderRangeSliders={category} /> */}
        {getCategory(renderRangeSliders)}
    </div>
  )
}

export default FilterByRange