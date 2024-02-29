import ApiService from '@services/apiService';

export function contactUsApi({ subject_name, email, message }) {
  return new Promise((resolve, reject) => {
    ApiService.post(`/contact-us`, {
      subject_name,
      email,
      message,
    })
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        console.print('Console Log: : error contactUs', e);
        reject(e);
      });
  });
}
