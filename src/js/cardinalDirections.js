    // Function for converting directions
function directions (input) {
    var cardinalDirections = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    var range = 360 / cardinalDirections.length;
    var output = cardinalDirections[0];

    for (var i = cardinalDirections.length, j = 360; input > 0 && j > input - 22.5; (i--, j -= range)) {
        output = cardinalDirections[i];
    }
    return output;
}