import React, { useEffect, useState, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { metaDetailsApi } from '../../../core/api/meta-details';
import Loader from '@common/LoaderComponent/LoaderComponent';
const PageWrapper = props => {
  const [meta, setMeta] = useState({ title: '', description: '' });
  const url = window.location.href;

  useEffect(() => {
    if (url)
      metaDetailsApi(url)
        .then(response => {
          const { title, description } = response?.data;
          setMeta({ title, description });
        })
        .catch(error => {
          setMeta({
            title: 'SJ Computers',
            description:
              'Buy ALL Brands Touch Screen Laptops, Gaming Desktop, Business Computer, Best BTO and more We looked at many companies, including Dell and Apple.',
          });
        });
  }, [url]);

  // useEffect(() => {
  //   document.title = meta.title;
  //   const descriptionMetaTag = document.querySelector('meta[name="description"]');
  //   if (descriptionMetaTag) {
  //     descriptionMetaTag.setAttribute('content', meta.description);
  //   }
  // }, [meta]);

  return (
    <>
      {meta.title && (
        <Helmet>
          <title>{meta.title}</title>
          <meta name='description' content={meta.description} />
          <meta name='title' content={meta.title} />
        </Helmet>
      )}
      <Helmet>
        <link rel='canonical' href={location.href} />
      </Helmet>
      <Suspense fallback={<Loader />}>{props.children}</Suspense>
    </>
  );
};

export default PageWrapper;
