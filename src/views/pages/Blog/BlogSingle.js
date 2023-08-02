import React from 'react'
import SingleBlog from '@components/Blog/SingleBlog/SingleBlog'
import PageWrapper from '../../PageWrapper'

const BlogSingle = () => {
  return (
    
     <PageWrapper title='SJ | Blogs' meta_descriptions='hello meta'>
  <div>
     <SingleBlog />
  </div>
     
   
  </PageWrapper> 
  
  )
}

export default BlogSingle