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
