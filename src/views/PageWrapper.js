import { metaDetailsApi } from '../core/api/meta-details';

import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
const PageWrapper = (props) => {
  const [meta, setMeta]=useState("")
  

  useEffect(() => {
   
    metaDetailsApi()
        .then((response) => {
         
          setMeta(response.data);
          console.log(response?.data,'data meta')
        })
        .catch((error) => {
            console.error("API Error:", error);
        });
}, []);




















  const { title, meta_descriptions } = props;

  useEffect(() => {
    document.title = title;
    const descriptionMetaTag = document.querySelector('meta[name="description"]');
    if (descriptionMetaTag) {
      descriptionMetaTag.setAttribute('content', meta_descriptions);
    }
  }, [title, meta_descriptions]);

                  return <>
                   {props.children}
                          <Helmet>
                            <title>{props.title}</title>

                            <meta
                                name="meta-description-meta-title"
                                content={props.meta_descriptions}
                            />
                         </Helmet>
                        </>;
};

export default PageWrapper;
