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
import { CreateCareer } from "../../../core/api/careers";
import { toast } from "react-toastify";
import Thankyou from '../../components/ThankYou/ThankYou'
const ApplyNow = () => {
    const params = new URLSearchParams(window.location.search);
    let jobId = params.get('jobId');
    // console.log('jobId', jobId);
    // ?customerId=
    const [fieldError, setFieldError] = useState('');
    const [loadThankyou, setLoadThankyou] = useState(false)
    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required('Required'),
        last_name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        // resume: Yup.mixed().required('CV is required'),
        // cover_letter: Yup.mixed().required('Cover letter is required'),
    });
    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            resume: '',
            cover_letter: '',
        },
        validationSchema: validationSchema,
        onSubmit: async values => {
            const allparams = { ...values, career_id: jobId }
            try {
                const res = await CreateCareer(allparams);
                console.log('result: ', res);
                if (res) {
                    toast.success('Application Submitted Successfully');
                    setLoadThankyou(true)
                }

            } catch (error) {
                console.log('error', error.data.errors?.career_id);
                if (error.data.errors) {
                    setFieldError(error.data.errors);
                    if (error.data.errors?.career_id) toast.error('The selected career is not available')
                }
                else toast.error(error.data.message)
            }
        },
    });
    useEffect(() => {
        formik.setErrors(prettifyErrorfromObjectToArray(fieldError) || {});
    }, [fieldError]);
    // console.log('fieldError', fieldError);

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
                                        Business System Analyst
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
                {loadThankyou === false ? <>
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
                                        required
                                        // sx={{ width: '30%' }}
                                        variant="standard"
                                        {...formik.getFieldProps('first_name')}
                                        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                        helperText={formik.touched.first_name && formik.errors.first_name}
                                    />
                                </Box>
                                <Box className="col-md-3" >
                                    <TextField
                                        label="Last Name"
                                        fullWidth
                                        required
                                        // sx={{ width: '30%', marginLeft: '20px' }}
                                        variant="standard"
                                        {...formik.getFieldProps('last_name')}
                                        error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                        helperText={formik.touched.last_name && formik.errors.last_name}
                                    />
                                </Box>
                            </Box>


                            <Box className='row' mt={3}>
                                <Box className="col-md-6">
                                    <TextField
                                        // sx={{ width: '50.5%' }}
                                        label="Email"
                                        variant="standard"
                                        required
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
                                        id='resume'
                                        required
                                        // label='Upload resume'
                                        variant="standard"
                                        type="file"
                                        // value={formik.values.resume.file_name}
                                        onChange={(e) => formik.setFieldValue('resume', e.target.files[0])}

                                        error={formik.touched.resume && Boolean(formik.errors.resume)}
                                        helperText={formik.touched.resume && formik.errors.resume}

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
                                        id='cover_letter'
                                        required
                                        // label='Upload Cover letter'
                                        variant="standard"
                                        type="file"
                                        // value={formik.values.cover_letter}
                                        // onChange={formik.handleChange}
                                        onChange={(e) => formik.setFieldValue('cover_letter', e.target.files[0])}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.cover_letter && Boolean(formik.errors.cover_letter)}
                                        helperText={formik.touched.cover_letter && formik.errors.cover_letter}
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
                </> : <Thankyou />}

            </div>
        </div>
    );
};

export default ApplyNow;
