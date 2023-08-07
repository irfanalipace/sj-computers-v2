
import React, { useEffect, useState,Suspense } from 'react';
import { Helmet } from 'react-helmet';
import {metaDetailsApi} from './core/api/meta-details'
import Loader from "@common/LoaderComponent/LoaderComponent";
const PageWrapper = (props) => {

  const [meta, setMeta] = useState({ title: '', description: '' });
  const url = window.location.href;

  useEffect(() => {

    metaDetailsApi(url)
      .then((response) => {
     
        const { title, description } = response?.data;
        setMeta({ title, description });
      })
      .catch((error) => {
        console.error('API Error:', error);
        setMeta({ title: 'SJ Computers', description:'' });
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
    <Suspense fallback={<Loader />}>
      {meta.title && (
        <Helmet>
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
      )}

      {props.children}
    </Suspense>
  );
};

export default PageWrapper;