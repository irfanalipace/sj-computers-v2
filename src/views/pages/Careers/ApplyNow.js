import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMobile } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Typography, Paper, Grid, InputAdornment, InputLabel } from '@mui/material';
import "../../components/Footer/FooterMenu/Contact.css";
import { Box } from "@mui/material";
import { FileInput } from "@mantine/core";
import { AttachFile } from "@material-ui/icons";
import { prettifyErrorfromObjectToArray } from "../../../core/utils/helpers";
const ApplyNow = () => {
    const params = new URLSearchParams(window.location.search);
    let jobId = params.get('jobId');
    // console.log('jobId', jobId);
    // ?customerId=
    const [fieldError, setFieldError] = useState('');

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        cv: Yup.mixed().required('CV is required'),
        // coverLetter: Yup.mixed().required('Cover letter is required'),
    });
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            cv: '',
            coverLetter: '',
        },
        validationSchema: validationSchema,
        onSubmit: async values => {
            const allparams = { ...values, jobid: jobId }
            try {
                console.log('values', allparams);

            } catch (error) {
                console.log('error', error);
                setFieldError(error.data.errors);
            }
        },
    });
    useEffect(() => {
        formik.setErrors(prettifyErrorfromObjectToArray(fieldError) || {});
    }, [fieldError]);
    // console.log('formik', formik.values);

    return (
        <div className="contact-container">
            <div className="contact-header">
                <div className="my-contact-menu">
                    <nav className="navbar navbar-expand-lg nav-contact-background-color">
                        <div className="container">
                            <div className="navbar-collapse">
                                <ul className="navbar-nav me-auto">
                                    <li className="nav-item ">
                                        <Link
                                            className="nav-link text-aligin-contact-menu link-no-hover on-focus-colo-contact"
                                            to="/careers"
                                        >
                                            <span>Career</span>
                                        </Link>
                                    </li>
                                    <span className="nav-item-contact"></span>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link text-aligin-contact-menu link-no-hover email-contact-hr-line on-focus-colo-contact"
                                            to="/"
                                        >
                                            Home
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="navbar-collapse justify-content-end ">
                                <ul className="navbar-nav">
                                    <li className="nav-item ">
                                        <Link
                                            className="nav-link text-aligin-contact-menu link-no-hover on-focus-colo-contact "
                                            to="mailto: cs@sjcomputersmn.com"
                                        >
                                            <FontAwesomeIcon
                                                icon={faEnvelope}
                                            />{" "}
                                            cs@sjcomputersmn.com
                                        </Link>
                                    </li>
                                    <span className="nav-item-contact"></span>
                                    <li className="nav-item ">
                                        <Link
                                            className="nav-link text-aligin-contact-menu link-no-hover email-contact-hr-line on-focus-colo-contact"
                                            to="tel: 952-452-8884"
                                        >
                                            <FontAwesomeIcon icon={faMobile} />{" "}
                                            952-452-8884
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="home-text-paragraph-contact">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-lg-12 col-sm-12">
                                <Box py={8}>
                                    <h4 className="contact-text-home">
                                        Bussiness System Analaytic
                                        {/* {user?.name} */}
                                    </h4>
                                    <h6 className="contact-text-home2">
                                        Job Application
                                    </h6>
                                </Box>
                            </div>
                        </div>
                    </div>
                </div>

                <Box className="container" mt={5}>
                    <h4 className="contact-heading-text-with-image">
                        Application Form
                    </h4>
                    <form onSubmit={formik.handleSubmit} style={{ width: '100%' }} encType="multipart/form-data">
                        <Box className="row">
                            <Box className="col-md-3">
                                <TextField
                                    label="First Name"
                                    fullWidth
                                    // sx={{ width: '30%' }}
                                    variant="standard"
                                    {...formik.getFieldProps('firstName')}
                                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                    helperText={formik.touched.firstName && formik.errors.firstName}
                                />
                            </Box>
                            <Box className="col-md-3" >
                                <TextField
                                    label="Last Name"
                                    fullWidth
                                    // sx={{ width: '30%', marginLeft: '20px' }}
                                    variant="standard"
                                    {...formik.getFieldProps('lastName')}
                                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                    helperText={formik.touched.lastName && formik.errors.lastName}
                                />
                            </Box>
                        </Box>


                        <Box className='row' mt={3}>
                            <Box className="col-md-6">
                                <TextField
                                    // sx={{ width: '50.5%' }}
                                    label="Email"
                                    variant="standard"
                                    fullWidth
                                    {...formik.getFieldProps('email')}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Box>
                        </Box>
                        <Box mt={4} className='row'>
                            <Box className="col-md-3">
                                <InputLabel>Upload CV</InputLabel>
                                <TextField
                                    id='cv'
                                    required
                                    // label='Upload CV'
                                    variant="standard"
                                    type="file"
                                    value={formik.values.cv}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.errors.cv}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <AttachFile />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                            <Box className="col-md-3">
                                <InputLabel>Upload Cover letter</InputLabel>
                                <TextField
                                    id='coverLetter'
                                    // label='Upload Cover letter'
                                    variant="standard"
                                    type="file"
                                    value={formik.values.coverLetter}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.errors.coverLetter}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <AttachFile />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                        </Box>

                        <Box className='row' my={5}>
                            <Box className='col-md-6' sx={{ textAlign: 'right' }}>
                                <Button type="submit" variant="contained" sx={{ background: '#318243' }}>
                                    Submit
                                </Button>
                            </Box>
                            <Box className='col-md-6'></Box>
                        </Box>


                    </form>
                </Box>
            </div>
        </div>
    );
};

export default ApplyNow;
