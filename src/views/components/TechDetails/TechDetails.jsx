import React, { useState } from 'react';
import './TechDetails.css';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../core/utils/helpers';

const TechDetails = ({ product }) => {
  const [collapseAll, setCollapseAll] = useState(true);
  const [summary, setSummary] = useState(true);
  const [other, setOther] = useState(true);
  const theme = useTheme();

  const processorChecker =
    product?.description?.cpu_model?.length > 0 &&
    product?.description?.cpu_model[0]?.manufacturer?.length > 0 &&
    product?.description?.cpu_model[0]?.manufacturer?.length > 0 &&
    product?.description?.cpu_model[0]?.speed?.length > 0 &&
    product?.description?.cpu_model[0]?.family?.length > 0
      ? true
      : false;

  const ramChecker =
    product?.description?.ram_memory?.length > 0 &&
    product?.description?.ram_memory[0]?.installed_size?.length > 0 &&
    product?.description?.ram_memory[0]?.technology?.length > 0
      ? true
      : false;

  const hardDriveChecker =
    product?.description?.hard_disk?.length > 0 &&
    product?.description?.hard_disk[0]?.size?.length > 0 &&
    product?.description?.hard_disk[0]?.description?.length > 0
      ? true
      : false;

  const wirelessChecker =
    product?.description?.wireless_communication_technology?.length > 0
      ? true
      : false;

  const itemTypeChecker =
    product?.description?.item_type_keyword?.length > 0 ? true : false;
  const isUpSmall = useMediaQuery(theme.breakpoints.up('md'));
  console.log(product, 'single product');
  return (
    <div className='tech-details-container'>
      <Grid container mt={3} spacing={5}>
        <Grid item lg={6}>
          <Grid container>
            <Grid>
              <h3
                className='tech-details-heading'
                style={{
                  fontSize: !isUpSmall ? '16px' : '18px',
                }}>
                Technical Details
              </h3>
            </Grid>
            <Grid>
              <Grid
                container
                onClick={() => {
                  setCollapseAll(!collapseAll);
                  setSummary(!summary);
                  setOther(!other);
                }}>
                {isUpSmall && (
                  <>
                    <Grid>
                      {collapseAll ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </Grid>
                    <Grid>
                      <p className='collapse-text mt-1'>Collapse all</p>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={6}>
          {isUpSmall && (
            <h3 className='tech-details-heading' style={{ fontSize: '18px' }}>
              Additional Information
            </h3>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item lg={6}>
          <>
            <Grid container onClick={() => setSummary(!summary)}>
              <Grid>
                {summary ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </Grid>
              <Grid>
                <p className='collapse-text mt-1'>Summary</p>
              </Grid>
            </Grid>
            {summary && (
              <table className='tech-details-container'>
                {processorChecker && (
                  <tr>
                    <td>Processor</td>
                    <td>
                      {product?.description?.cpu_model[0]?.speed[0]?.value +
                        ' ' +
                        product?.description?.cpu_model[0]?.speed[0]?.unit +
                        ' ' +
                        product?.description?.cpu_model[0]?.family[0]?.value}
                    </td>
                  </tr>
                )}
                {ramChecker && (
                  <tr>
                    <td>RAM</td>
                    <td>
                      {product?.description?.ram_memory[0]?.installed_size[0]
                        ?.value +
                        ' ' +
                        product?.description?.ram_memory[0]?.installed_size[0]
                          ?.unit +
                        ' ' +
                        product?.description?.ram_memory[0]?.technology[0]
                          ?.value}
                    </td>
                  </tr>
                )}
                {hardDriveChecker && (
                  <tr>
                    <td>Hard Drive</td>
                    <td>
                      {product?.description?.hard_disk[0]?.size[0]?.value +
                        ' ' +
                        product?.description?.hard_disk[0]?.size[0]?.unit +
                        ' ' +
                        product?.description?.hard_disk[0]?.description[0]
                          ?.value}
                    </td>
                  </tr>
                )}
                {wirelessChecker && (
                  <tr>
                    <td>Wireless Type</td>
                    <td>
                      {
                        product?.description
                          ?.wireless_communication_technology[0]?.value
                      }
                    </td>
                  </tr>
                )}
                {product?.description?.graphics_description?.length > 0 && (
                  <tr>
                    <td>Card Description</td>
                    <td>
                      {product?.description?.graphics_description[0]?.value}
                    </td>
                  </tr>
                )}
                {itemTypeChecker && (
                  <tr>
                    <td>Item Type</td>
                    <td>{product?.description?.item_type_keyword[0]?.value}</td>
                  </tr>
                )}
              </table>
            )}
            <Grid container onClick={() => setOther(!other)} mt={1}>
              <Grid>
                {other ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </Grid>
              <Grid>
                <p className='collapse-text mt-1'>Other Technical Details</p>
              </Grid>
            </Grid>
            {other && (
              <table className='tech-details-container'>
                {product?.description?.brand?.length > 0 && (
                  <tr>
                    <td>Brand</td>
                    <td>{product?.description?.brand[0]?.value}</td>
                  </tr>
                )}
                {/* {product?.description?.part_number?.length > 0 && (
                  <tr>
                    <td>Brand</td>
                    <td>{product?.description?.part_number[0]?.value}</td>
                  </tr>
                )} */}
                {product?.description?.model_number?.length > 0 && (
                  <tr>
                    <td>Item Model Number</td>
                    <td> {product?.description?.model_number[0]?.value}</td>
                  </tr>
                )}
                {product?.description?.hardware_platform?.length > 0 && (
                  <tr>
                    <td>Hardware Platform</td>
                    <td>
                      {' '}
                      {product?.description?.hardware_platform[0]?.value}
                    </td>
                  </tr>
                )}
                {product?.description?.operating_system?.length > 0 && (
                  <tr>
                    <td>Operating System</td>
                    <td> {product?.description?.operating_system[0]?.value}</td>
                  </tr>
                )}
                {product?.description?.item_package_weight?.length > 0 && (
                  <tr>
                    <td>Item Weight</td>
                    <td>
                      {product?.description?.item_package_weight[0]?.value +
                        ' ' +
                        product?.description?.item_package_weight[0]?.unit}
                    </td>
                  </tr>
                )}
                {product?.description?.item_package_dimensions?.length > 0 && (
                  <tr>
                    <td>Product Dimensions</td>
                    <td>
                      {product?.description?.item_package_dimensions[0]?.height
                        ?.value +
                        ' × ' +
                        product?.description?.item_package_dimensions[0]?.length
                          ?.value +
                        ' × ' +
                        product?.description?.item_package_dimensions[0]?.width
                          ?.value +
                        ' ' +
                        product?.description?.item_package_dimensions[0]?.height
                          ?.unit}
                    </td>
                  </tr>
                )}
                {product?.description?.item_package_dimensions?.length > 0 && (
                  <tr>
                    <td>Item Dimensions LxWxH</td>
                    <td>
                      {product?.description?.item_package_dimensions[0]?.height
                        ?.value +
                        ' × ' +
                        product?.description?.item_package_dimensions[0]?.length
                          ?.value +
                        ' × ' +
                        product?.description?.item_package_dimensions[0]?.width
                          ?.value +
                        ' ' +
                        product?.description?.item_package_dimensions[0]?.height
                          ?.unit}
                    </td>
                  </tr>
                )}
                {/* <tr>
                  <td>Color</td>
                  <td>Black</td>
                </tr>
                <tr>
                  <td>Power Source</td>
                  <td>AC</td>
                </tr> */}
                {product?.description?.manufacturer?.length > 0 && (
                  <tr>
                    <td>Manufacturer</td>
                    <td>{product?.description?.manufacturer[0]?.value}</td>
                  </tr>
                )}
                {product?.description?.processor_count?.length > 0 && (
                  <tr>
                    <td>Number of Processor</td>
                    <td>{product?.description?.processor_count[0]?.value}</td>
                  </tr>
                )}
                {product?.description?.system_ram_type?.length > 0 && (
                  <tr>
                    <td>Computer Memory Type</td>
                    <td>{product?.description?.system_ram_type[0]?.value}</td>
                  </tr>
                )}
                {product?.description?.flash_memory?.length > 0 &&
                  product?.description?.flash_memory[0]?.installed_size
                    ?.length > 0 && (
                    <tr>
                      <td>Flash Memory Size</td>
                      <td>
                        {product?.description?.flash_memory[0]
                          ?.installed_size[0]?.value +
                          ' ' +
                          product?.description?.flash_memory[0]
                            ?.installed_size[0]?.unit}
                      </td>
                    </tr>
                  )}
                {product?.description?.hardware_interface?.length > 0 && (
                  <tr>
                    <td>Hard Drive Interface</td>
                    <td>
                      {product?.description?.hardware_interface.map(
                        (item, index) => (
                          <span key={index}>{item.value + ' '}</span>
                        ),
                      )}
                    </td>
                  </tr>
                )}
                {/* <tr>
                  <td>Country of Origin</td>
                  <td>China</td>
                </tr> */}
                {/* <tr>
                  <td>Is Discontinued By Manufacturer</td>
                  <td>No</td>
                </tr> */}
                {product?.description?.product_site_launch_date?.length > 0 && (
                  <tr>
                    <td>Date First Available</td>
                    <td>
                      {formatDate(
                        product?.description?.product_site_launch_date[0]
                          ?.value,
                      )}
                    </td>
                  </tr>
                )}
              </table>
            )}
          </>
        </Grid>
        <Grid item lg={6} mt={4}>
          {!isUpSmall && (
            <h3 className='tech-details-heading' style={{ fontSize: '16px' }}>
              Additional Information
            </h3>
          )}
          <table className='tech-details-container'>
            <tr>
              <td>Customer Reviews</td>
              <td>
                <div className='d-flex align-items-center'>
                  <StarRatings
                    rating={product?.rating}
                    starRatedColor='rgb(232, 126, 36)'
                    numberOfStars={5}
                    name='rating'
                    isSelectable={false}
                    starDimension={'20px'}
                    starSpacing={'0'}
                  />
                  <span className='ms-2' style={{ color: '#1270c4' }}>
                    {product?.total_review}
                    {' Ratings'}
                  </span>
                </div>

                <p className='pt-2'>{product?.rating} out of 5 stars</p>
              </td>
            </tr>
          </table>
          <div className='additional-info-container'>
            <h1 style={{ fontSize: !isUpSmall && '16px' }}>
              Warranty & Support
            </h1>
            <p>
              SJ Computer offers a standard one-year warranty for both laptops
              and desktops, beginning from the date of purchase, subject to
              certain exclusions outlined on the product page. Additionally,
              laptop batteries, Apple products, tablets, and displays are
              covered by a limited 90-day warranty.
            </p>
            <p>
              Our warranty encompasses all expenses related to parts and labor
              for in-house repairs of hardware damage. However, it is important
              to note that accidental damage is not covered. This warranty is
              applicable only to consumers within the United States of America,
              and any damage caused by the end user will void the warranty.
            </p>
            <p>
              We strongly recommend retaining the original box and packing
              materials for potential warranty returns. Computers returned to SJ
              Computers without proper packaging may be considered potentially
              damaged, potentially impacting future warranty coverage. SJ
              Computers does not provide compensation for unauthorized
              third-party repairs.
            </p>
            <p>
              Clients are advised to uninstall any additional parts or upgrades
              not included with the original purchase before returning the
              computer to SJ Computers. SJ Computers will not be responsible for
              the replacement or repair of any illegal third-party parts shipped
              with the machine for warranty service if they are lost, damaged,
              or malfunctioning.
            </p>
            <p>
              It's important to note that SJ Computers assumes no responsibility
              for user data on machines returned for warranty servicing. In the
              event of data destruction, SJ Computers cannot be held
              accountable. Users are encouraged to regularly back up essential
              data. The SJ Computers Warranty exclusively applies to machines
              purchased for personal use and is non-transferable.
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default TechDetails;
