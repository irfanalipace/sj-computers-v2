// import { metaDetailsApi } from '../core/api/meta-details';

// import React, { useEffect, useState } from 'react';
// import { Helmet } from "react-helmet";

// const PageWrapper = (props) => {

//   const [meta, setMeta]=useState([])

//   const url = window.location.href;

//   useEffect(() => {

//     metaDetailsApi(url)
//         .then((response) => {
//         console.log(response?.data,'response data')
//           setMeta(response?.data);
//         })
//         .catch((error) => {
//             console.error("API Error:", error);
//         });
// }, [url]);

//   console.log(meta.description,'meta data@@')

//   const { title, meta_descriptions } = props;

//   useEffect(() => {
//     document.title = title;
//     const descriptionMetaTag = document.querySelector('meta[name="description"]');
//     if (descriptionMetaTag) {
//       descriptionMetaTag.setAttribute('content', meta_descriptions);
//     }
//   }, [title, meta_descriptions]);

//                   return <>

//                    {props.children}
//                           <Helmet>
//                             <title>{meta.title}</title>

//                             <meta
//                                 name="meta-description-meta-title"
//                                 content={meta.description}
//                             />
//                          </Helmet>
//                         </>;
// };

// export default PageWrapper;

// // import React, { useEffect, useState } from 'react';
// // import { Helmet } from 'react-helmet';
// // import { metaDetailsApi } from '../core/api/meta-details';

// // const PageWrapper = (props) => {
// //   const [meta, setMeta] = useState({ title: '', description: '' });
// //   const url = window.location.href;

// //   useEffect(() => {
// //     metaDetailsApi(url)
// //       .then((response) => {
// //         console.log(response?.data, 'response data');
// //         const { title, description } = response?.data;
// //         setMeta({ title, description });
// //       })
// //       .catch((error) => {
// //         console.error('API Error:', error);
// //       });
// //   }, [url]);

// //   useEffect(() => {
// //     document.title = meta.title;
// //     const descriptionMetaTag = document.querySelector('meta[name="description"]');
// //     if (descriptionMetaTag) {
// //       descriptionMetaTag.setAttribute('content', meta.description);
// //     }
// //   }, [meta]);
// // console.log(meta.title,'meta-data descriptions')
// //   return (
// //     <>
// //       {meta.title && (
// //         <Helmet>
// //           <title>{meta.title}</title>
// //           <meta name="description" content={meta.meta_descriptions} />
// //         </Helmet>
// //       )}

// //       {props.children}
// //     </>
// //   );
// // };

// // export default PageWrapper;

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { metaDetailsApi } from "../../../core/api/meta-details";

const PageWrapper = (props) => {
    const [meta, setMeta] = useState({ title: "", description: "" });
    const url = window.location.href;

    useEffect(() => {
        if (url)
            metaDetailsApi(url)
                .then((response) => {
                    const { title, description } = response?.data;
                    setMeta({ title, description });
                })
                .catch((error) => {
                    setMeta({
                        title: "SJ Computers",
                        description:
                            "Buy ALL Brands Touch Screen Laptops, Gaming Desktop, Business Computer, Best BTO and more We looked at many companies, including Dell and Apple.",
                    });
                });
    }, []);

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
                    <meta name="description" content={meta.description} />
                </Helmet>
            )}

            {props.children}
        </>
    );
};

export default PageWrapper;
