
import React, { useEffect } from 'react';
import { Helmet } from "react-helmet";
const PageWrapper = (props) => {
  const { title, meta_descriptions } = props;
console.log(props.meta_descriptions,'1111')
  useEffect(() => {
    document.title = title;
    const descriptionMetaTag = document.querySelector('meta[name="description"]');
    if (descriptionMetaTag) {
      descriptionMetaTag.setAttribute('content', meta_descriptions);
    }
  }, [title, meta_descriptions]);

                  return <>
                   {/* {props.children} */}
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
