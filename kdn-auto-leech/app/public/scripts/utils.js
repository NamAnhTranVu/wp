/**
 * Format a string like sprintf function of PHP. Example usage:
 * "{0} is dead, but {1} is alive! {0} {2}".format("ASP", "ASP.NET")
 *
 * @see http://stackoverflow.com/a/4673436/2883487
 */
if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

/**
 * Flash the background color of an object
 * @param {object} $element Target element
 */
function flashBackground($element) {
    $element.stop().css("background-color", "#b8ea84")
        .animate({ backgroundColor: "#FFFFFF"}, 1000, 'swing', function() {
            // Remove the background color style definition when the animation is done.
            $element.css("background-color", '')
        });
}