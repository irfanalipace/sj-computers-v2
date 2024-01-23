export function snakeCaseToPrettyText(snakeCase) {
    // Split the snake_case string into an array of words
    var words = snakeCase.split("_");

    // Convert each word to lowercase and capitalize the first letter
    var prettyWords = words.map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    // Join the words with spaces and return the result
    return prettyWords.join(" ");
}

export const downloadFile = (fileUrl) => {
    const filename = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);

    fetch(fileUrl)
        .then((response) => response.blob())
        .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
        })
        .catch((error) => {
            console.error("Error downloading file:", error);
        });
};

export const formatDate = (dateString) => {
    const options = {
        day: "2-digit",

        month: "short",

        year: "numeric",
    };

    const date = new Date(dateString);

    return date.toLocaleDateString(undefined, options);
};

export const prettifyError = (error) => {
    let prettifiedError = "";

    for (const key in error) {
        if (Array.isArray(error[key])) {
            const formattedErrors = error[key].map(
                (message) => `${message}<br>`
            );

            prettifiedError += `<strong>${
                key.charAt(0).toUpperCase() + key.slice(1)
            }:</strong> ${formattedErrors.join("")}`;
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
            const parts = key.split(".");
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
        const options = { year: "numeric", month: "long", day: "numeric" };
        const date = new Date(inputDate);
        return date.toLocaleDateString(undefined, options);
    } catch (error) {
        return "";
    }
}

export function removeProtocolAndBaseUrl(url) {
    // Use a regular expression to match the protocol and base URL
    var match = url.match(/^https?:\/\/[^\/]+/i);

    // If a match is found, remove it from the original URL
    if (match) {
        var baseUrl = match[0];
        var urlWithoutProtocolAndBaseUrl = url.replace(baseUrl, "");
        return urlWithoutProtocolAndBaseUrl;
    }

    // If no match is found, return the original URL
    return url;
}

export const createThumbnail = async (videoSrc) => {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.crossOrigin = 'anonymous';
        video.src = videoSrc;
 
        video.addEventListener('loadeddata', () => {
            video.currentTime = 1;
 
            video.addEventListener('seeked', () => {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
 
                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
 
                const imageDataUrl = canvas.toDataURL();
                resolve(imageDataUrl);
            }, { once: true });
        });
 
        video.addEventListener('error', (e) => {
            reject(new Error(`Error loading video: ${e.message}`));
        });
    });
};
