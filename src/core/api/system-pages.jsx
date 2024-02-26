import ApiService from '@services/apiService';

export function getSystemPagesApi(pageName) {
  console.print(pageName, 'pageName');
  // return;
  return new Promise((resolve, reject) => {
    const body = {
      key: pageName,
    };

    ApiService.get(`/system-pages`, '', body)
      .then(response => {
        console.print(
          'file: system-pages.js | getSystemPagesApi| response',
          response.data,
        );
        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error system-pages', e);
        reject(e);
      });
  });
}
