import ApiService from '@services/apiService';

export function getBlogsPagesApi(page = 1, per_page = 12) {
  return new Promise((resolve, reject) => {
    ApiService.get(`/blogs?page=${page}&per_page=${per_page}`)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        console.error('API Error:', error);
        reject(error);
      });
  });
}

export function getBlogsHeaderPagesApi(page = 1, per_page = 4) {
  return new Promise((resolve, reject) => {
    ApiService.get(`/blogs?page=${page}&per_page=${per_page}`)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        console.error('API Error:', error);
        reject(error);
      });
  });
}

export function blogSlugApiblogDetails(slug) {
  return new Promise((resolve, reject) => {
    ApiService.get(`/get-blogs?slug=${slug}`)
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error blogsDetail', e);
        reject(e);
      });
  });
}

export function blogHeaderDetails(slug) {
  return new Promise((resolve, reject) => {
    ApiService.get(`/get-blogs?slug=${slug}`)
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error blogsDetail', e);
        reject(e);
      });
  });
}

///Category Api Call
export function getCategoryApi(category_id, page = 1, per_page = 12) {
  return new Promise((resolve, reject) => {
    ApiService.get(
      `/category-blogs?category_id=${category_id}&page=${page}&per_page=${per_page}`,
    )
      .then(response => {
        console.print(response, 'category the blogs');
        resolve(response);
      })
      .catch(e => {
        console.error('Error in getCategoryApi:', e);
        reject(e);
      });
  });
}
