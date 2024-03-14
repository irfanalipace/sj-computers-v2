export function snakeCaseToPrettyText(snakeCase) {
  // Split the snake_case string into an array of words
  var words = snakeCase.split('_');

  // Convert each word to lowercase and capitalize the first letter
  var prettyWords = words.map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  // Join the words with spaces and return the result
  return prettyWords.join(' ');
}

export const downloadFile = fileUrl => {
  const filename = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);

  fetch(fileUrl)
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch(error => {
      console.error('Error downloading file:', error);
    });
};

export const formatDate = dateString => {
  const options = {
    day: '2-digit',

    month: 'short',

    year: 'numeric',
  };

  const date = new Date(dateString);

  return date.toLocaleDateString(undefined, options);
};

export function formatDateByMonthName(inputDate) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Create a Date object from the input date
  const dateObject = new Date(inputDate);

  // Extract the components of the date
  const month = months[dateObject.getMonth()];
  const day = dateObject.getDate();
  const year = dateObject.getFullYear();

  // Format the date string
  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate;
}

export const prettifyError = error => {
  let prettifiedError = '';

  for (const key in error) {
    if (Array.isArray(error[key])) {
      const formattedErrors = error[key].map(message => `${message}<br>`);

      prettifiedError += `<strong>${
        key.charAt(0).toUpperCase() + key.slice(1)
      }:</strong> ${formattedErrors.join('')}`;
    } else {
      prettifiedError += `<strong>${key}:</strong> ${error[key]}<br>`;
    }
  }

  return prettifiedError;
};
export function prettifyErrorfromObjectToArray(errors) {
  try {
    const prettified = {};

    for (const key in errors) {
      const parts = key.split('.');
      let current = prettified;

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];

        if (i === parts.length - 1) {
          current[part] = errors[key];
        } else {
          if (!current[part]) {
            if (parts[i + 1].match(/^\d+$/)) {
              current[part] = [];
            } else {
              current[part] = {};
            }
          }
          current = current[part];
        }
      }
    }
    return prettified;
  } catch (error) {
    return [];
  }
}

export function convertDateToLongFormat(inputDate) {
  try {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(inputDate);
    return date.toLocaleDateString(undefined, options);
  } catch (error) {
    return '';
  }
}

export function removeProtocolAndBaseUrl(url) {
  // Use a regular expression to match the protocol and base URL
  var match = url.match(/^https?:\/\/[^\/]+/i);

  // If a match is found, remove it from the original URL
  if (match) {
    var baseUrl = match[0];
    var urlWithoutProtocolAndBaseUrl = url.replace(baseUrl, '');
    return urlWithoutProtocolAndBaseUrl;
  }

  // If no match is found, return the original URL
  return url;
}

export const createThumbnail = async videoSrc => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.src = videoSrc;

    video.addEventListener('loadeddata', () => {
      video.currentTime = 1;

      video.addEventListener(
        'seeked',
        () => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          const imageDataUrl = canvas.toDataURL();
          resolve(imageDataUrl);
        },
        { once: true },
      );
    });

    video.addEventListener('error', e => {
      reject(new Error(`Error loading video: ${e.message}`));
    });
  });
};
export function filterFiles(files, allowedTypes, maxSize = 5) {
  const maxSizeInBytes = maxSize * 1024 * 1024;
  const validFiles = [];
  const errors = [];
  Array.from(files).forEach(file => {
    if (file?.size > maxSizeInBytes) {
      errors.push(
        `${file.name} exceeds the maximum allowed file size of ${maxSize}MB.`,
      );
    } else if (!allowedTypes.includes(file?.type)) {
      errors.push(`${file?.name} has an invalid file type.`);
    } else {
      validFiles.push(file);
    }
  });

  return {
    validFiles: validFiles,
    errors: errors,
  };
}

// utils/urlHelper.js

export const generatePath = (url, searchParams) => {
  if (!url) {
    // Return the default URL when the provided URL is undefined or null
    return '/';
  }

  const newURL = new URL(url);
  const params = new URLSearchParams();
  for (const key in searchParams) {
    params.append(key, searchParams[key]);
  }
  return newURL.pathname + '?' + params.toString();
};

export function extractJsonObjectFromError(inputString) {
  const errorMessage = 'Something went wrong.';

  if (!inputString.startsWith(errorMessage)) {
    return {};
  }

  const jsonString = inputString.substring(errorMessage.length).trim();

  try {
    const jsonObject = JSON.parse(jsonString);
    return jsonObject;
  } catch (error) {
    return {};
  }
}

export const makeDataLayerItemObject = itemArray => {
  const shapedItemArray = itemArray?.map((item, index) => {
    const ShpaedItem = {
      item_id: item?.id || item?.product?.id || item?.cartItem?.id,
      item_name:
        item?.product?.name || item?.cartItem?.product?.name || item?.name,
      // affiliation: 'Google Merchandise Store',
      // coupon: 'SUMMER_FUN',
      discount: item?.discount || 0,
      index: index,
      item_brand:
        item?.product?.brand?.name ||
        item?.cartItem?.product?.brand?.name ||
        item?.brand?.name,
      // item_category: 'Apparel',
      // item_category2: 'Adult',
      // item_category3: 'Shirts',
      // item_category4: 'Crew',
      // item_category5: 'Short sleeve',
      // item_list_id: 'related_products',
      // item_list_name: 'Related Products',
      // item_variant: 'green',
      // location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
      price:
        parseFloat(item?.price) ||
        parseFloat(item?.product?.price) ||
        item?.cartItem?.price,
      quantity: item?.quantity || item?.cartItem?.quantity,
    };
    return ShpaedItem;
  });

  return shapedItemArray;
};

export function formatingDate(dateString) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const date = new Date(dateString);
  console.print(dateString, 'dateString');

  // Extracting date components
  const year = date.getFullYear();
  const month = months[date.getMonth()]; // Get month name from the array
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Timezone offset
  const timezoneOffset = date.getTimezoneOffset();
  const timezoneOffsetHours = Math.abs(Math.floor(timezoneOffset / 60))
    .toString()
    .padStart(2, '0');
  const timezoneOffsetMinutes = Math.abs(timezoneOffset % 60)
    .toString()
    .padStart(2, '0');
  const timezoneSign = timezoneOffset < 0 ? '+' : '-';

  // Constructing the formatted date string
  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate;
}
