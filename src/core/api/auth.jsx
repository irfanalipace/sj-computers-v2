import ApiService from '@services/apiService';

export function loginApi({ email, password }) {
  return new Promise((resolve, reject) => {
    ApiService.post('/login', {
      email,
      password,
    })
      .then(response => {
        console.print('file: auth.module.js | login| response', response);
        resolve(response.data);
      })
      .catch(e => {
        console.print('Console Log: : error Login', e);
        reject(e);
      });
  });
}

export function registerApi({ name, email, password, confirmPassword }) {
  return new Promise((resolve, reject) => {
    ApiService.post(`/register`, {
      name: name,
      email: email,
      password: password,
      password_confirmation: confirmPassword,
    })
      .then(response => {
        console.print('file: auth.module.js | register| response', response);
        resolve(response.data);
      })
      .catch(e => {
        console.print('Console Log: : error', e);
        reject(e);
      });
  });
}

export function logoutApi() {
  return new Promise((resolve, reject) => {
    ApiService.post('/logout', {
      // userId: email,
      // password,
    })
      .then(response => {
        console.print('file: auth.module.js | logout| response', response);
        resolve(response.data);
      })
      .catch(e => {
        console.print('Console Log: : error', e);
        reject(e);
      });
  });
}

export function verifyEmailApi(email) {
  return new Promise((resolve, reject) => {
    ApiService.post('verify-email', {
      email,
      // formData,
    })
      .then(response => {
        console.print(
          'file: auth.module.js | verifyEmailApi| response',
          response,
        );
        resolve(response.data);
      })
      .catch(e => {
        console.print('Console Log: : error', e);
        reject(e);
      });
  });
}

export function verifyOtpApi({ otp }, token) {
  return new Promise((resolve, reject) => {
    ApiService.post(
      'verify-otp',
      {
        otp_code: otp,
      },
      '',
      token,
    )
      .then(response => {
        console.print(
          'file: auth.module.js | verifyOtpApi| response',
          response,
        );
        resolve(response.data);
      })
      .catch(e => {
        console.print('Console Log: : error', e);
        reject(e);
      });
  });
}

export function forgetPasswordApi({ email }) {
  return new Promise((resolve, reject) => {
    ApiService.post('forgot-password', {
      email,
    })
      .then(response => {
        console.print(
          'file: auth.module.js | forgetPasswordApi| response',
          response,
        );
        resolve(response.data);
      })
      .catch(e => {
        console.print('Console Log: : error', e);
        reject(e);
      });
  });
}

export function resetPasswordApi({
  access_token,
  email,
  password,
  confirm_password,
}) {
  ApiService.setHeader('Authorization', 'Bearer ' + access_token);
  return new Promise((resolve, reject) => {
    ApiService.post('reset-password', {
      email,
      password,
      password_confirmation: confirm_password,
      token: access_token,
    })
      .then(response => {
        console.print(
          'file: auth.module.js | resetPasswordApi| response',
          response,
        );
        resolve(response.data);
      })
      .catch(e => {
        console.print('Console Log: : error', e);
        reject(e);
      });
  });
}

export function updateProfileApi(formData) {
  ApiService.setHeader('content-type', 'multipart/form-data');
  return new Promise((resolve, reject) => {
    ApiService.post('update-profile', formData, '', '', true)
      .then(response => {
        console.print(
          'file: auth.module.js | updateProfileApi| response',
          response,
        );
        resolve(response.data);
      })
      .catch(e => {
        console.print('Console Log: : error', e);
        reject(e);
      });
    ApiService.setHeader('content-type', 'application/json');
  });
}

export function deleteProfilePicApi(data) {
  return new Promise((resolve, reject) => {
    ApiService.post('delete-profile-picture', data)
      .then(response => {
        console.print(
          'file: auth.module.js | deleteProfilePicApi| response',
          response,
        );
        resolve(response.data);
      })
      .catch(e => {
        console.print('Console Log: : error', e);
        reject(e);
      });
  });
}

export function updatePasswordApi(data) {
  return new Promise((resolve, reject) => {
    ApiService.post('change-password', data)
      .then(response => {
        console.print(
          'file: auth.module.js | updateProfileApi| response',
          response,
        );
        resolve(response.data);
      })
      .catch(e => {
        console.print('Console Log: : error', e);
        reject(e);
      });
  });
}
