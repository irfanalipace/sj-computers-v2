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
