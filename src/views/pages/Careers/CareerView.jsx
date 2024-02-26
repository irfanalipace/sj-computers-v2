import React, { useEffect, useState } from 'react';
import './Careers.css';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMobile } from '@fortawesome/free-solid-svg-icons';
import { getJobDetails } from '../../../core/api/careers';
import LoaderComponent from '@common/LoaderComponent/LoaderComponent';
import ThankYou from '@components/ThankYou/ThankYou';
function CareerView() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const getData = async () => {
    setLoading(true);
    const response = await getJobDetails(id);
    setData(response.data);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='career-container'>
      <div className='career-header'>
        <div className='my-career-menu'>
          <nav className='navbar navbar-expand-sm nav-career-background-color'>
            <div className='container-lg'>
              <div className='navbar-collapse'>
                <ul className='navbar-nav me-auto'>
                  <li className='nav-item '>
                    <Link
                      className='nav-link text-aligin-career-menu link-no-hover on-focus-colo-career'
                      to='/careers'
                    >
                      <span>Careers</span>
                    </Link>
                  </li>
                  <span className='nav-item-career'></span>
                  <li className='nav-item'>
                    <Link
                      className='nav-link text-aligin-career-menu link-no-hover email-career-hr-line on-focus-colo-career'
                      to='/'
                    >
                      Home
                    </Link>
                  </li>
                </ul>
              </div>
              <div className='navbar-collapse justify-content-end '>
                <ul className='navbar-nav'>
                  <li className='nav-item '>
                    <Link
                      className='nav-link text-aligin-career-menu link-no-hover on-focus-colo-career '
                      to='mailto: cs@sjcomputersmn.com'
                    >
                      <FontAwesomeIcon icon={faEnvelope} /> cs@sjcomputersmn.com
                    </Link>
                  </li>
                  <span className='nav-item-career'></span>
                  <li className='nav-item '>
                    <Link
                      className='nav-link text-aligin-career-menu link-no-hover email-career-hr-line on-focus-colo-career'
                      to='tel: 952-452-8884'
                    >
                      <FontAwesomeIcon icon={faMobile} /> 952-452-8884
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        {loading ? (
          <LoaderComponent />
        ) : (
          <>
            <div className='home-text-paragraph-career'>
              <div className='container-lg py-3'>
                <div className='row py-sm-5'>
                  <div className='col-12 col-sm-6 col-md-9'>
                    <div className='p-tages-text-career px-sm-0 px-2'>
                      <h4 className='career-text-home text-capitalize'>
                        {data?.job_title}
                      </h4>
                      <h6 className='career-text-home2 text-capitalize'>
                        {data?.job_description}
                      </h6>
                    </div>
                  </div>
                  <div className='col-12 col-sm-6 col-md-3 d-flex justify-content-sm-center align-items-center'>
                    <div className='p-tages-text-career py-sm-0 py-3'>
                      <Link
                        to={
                          '/apply-now?jobId=' +
                          data?.id +
                          '&jobTitle=' +
                          data?.job_title
                        }
                        className='apply-now-btn'
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='view-job-body py-5'>
              <div className='container-lg pt-3'>
                <div className='pb-4'>
                  <div className='job-details-heading'>JOB DESCRIPTION:</div>
                  <div className='job-details-description pt-2'>
                    {data?.job_description}
                  </div>
                </div>
                <div className='pb-4'>
                  <div className='job-details-heading'>JOB REQUIREMENTS:</div>
                  <div className='job-details-description pt-2'>
                    {data?.job_requirements}
                  </div>
                </div>
                <div className='pb-4'>
                  <div className='job-details-heading'>PRIMARY WORKSITE: </div>
                  <div className='job-details-description pt-2'>
                    {data?.primary_worksite}
                  </div>
                </div>
                <div className='pb-4'>
                  <div className='job-details-heading'>
                    HOURS OF WORK AND SALARY: 
                  </div>
                  <div className='job-details-description pt-2'>
                    {data?.work_hours} hours a week full time work at an annual
                    salary ${data?.salary} 
                  </div>
                </div>
                {/* <div className="pb-4">
                                    <div className="job-details-heading">
                                        APPLICATIONS:
                                    </div>
                                    <div className="job-details-description pt-2">
                                         {data?.applications}
                                    </div>
                                </div> */}
                <div className='pt-2'>
                  <Link
                    className='btn btn-outline-success text-decoration-none apply-now-link'
                    to={
                      '/apply-now?jobId=' +
                      data?.id +
                      '&jobTitle=' +
                      data?.job_title
                    }
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CareerView;
