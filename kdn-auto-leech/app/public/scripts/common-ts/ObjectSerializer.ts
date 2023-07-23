/**
 * Registers $.fn.serializeObjectNoNull function. See {@link registerFunction}.
 */
export class ObjectSerializer {

    private static INSTANCE: ObjectSerializer = null;

    public static getInstance() {
        if (this.INSTANCE === null) this.INSTANCE = new ObjectSerializer();
        return this.INSTANCE;
    }

    private constructor() {
        this.registerFunction();
    }

    /**
     * Serializes the inputs by using "form-serializer" node module, and removes null values from the array-valued inputs.
     * E.g. if the array-valued inputs start from index 4, serializeObject function returns [null, null, null, object].
     * This function removes the null values.
     */
    private registerFunction() {

        $.fn.serializeObjectNoNull = function() {
            let result = $.fn.serializeObject.apply(this, arguments);
            // console.log(result);

            for(let key in result) {
                if (!result.hasOwnProperty(key)) continue;

                // If this is not an array, no need to check it for null values.
                if (!(result[key] instanceof Array)) continue;

                result[key] = result[key].filter(function(el: any) {
                    return el !== null;
                });
            }

            return result;
        };
    }

}