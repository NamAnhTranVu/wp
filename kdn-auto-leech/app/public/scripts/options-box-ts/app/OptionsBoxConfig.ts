import {OptionsBoxType} from "./enums/OptionsBoxType";

export class OptionsBoxConfig {

    private static instance: OptionsBoxConfig = null;

    private config: {};

    private _type: OptionsBoxType;

    private keyBox = 'box';
    private keyTabs = 'tabs';
    private keyType = 'type';

    /**
     * Get the instance
     */
    public static getInstance() {
        if (this.instance === null) this.instance = new OptionsBoxConfig();
        return this.instance;
    }

    /** This is a singleton */
    private constructor() {}

    /**
     * Prepares the instance according to the given configuration
     * @param {object} config Options box configuration
     */
    public prepare(config: {}) {
        this.config = config;
        this.prepareType();
    }

    /*
     * GETTERS
     */

    /**
     * Get the type of the options box
     */
    get type(): OptionsBoxType {
        return this._type;
    }

    /**
     * Get tab settings using the key of an options box tab
     * @param {string} tabKey
     */
    getTabSettings(tabKey: string): null | any {
        return this.objectGet(this.config, this.keyTabs + '.' + tabKey);
    }

    /*
     *
     */

    /**
     * Prepares the type of the options box
     */
    private prepareType() {
        // Get the type from the config
        let type = this.objectGet(this.config, this.keyBox + '.' + this.keyType);
        this._type = Object.values(OptionsBoxType).includes(type) ? type : OptionsBoxType.DEF;
    }

    /**
     * Get value from an object using dot notation
     * @param {object} obj The object
     * @param {string} key Dot notation. E.g. 'box.type' to get 'file' from {'box': {'type' => 'file' } }
     * @return {null|any}
     * @see https://stackoverflow.com/a/6394168/2883487
     */
    private objectGet(obj: any, key: string) {
        // Split the key into its parts to get an array of keys.
        return key.split('.').reduce((acc, current) => {
            // If the accumulator is null, stop.
            if (acc === null) return;

            // Try to get the item from the accumulator using the current key. If the key does not exist, set the
            // accumulator to null.
            return acc.hasOwnProperty(current) ? acc[current] : null;
        }, obj) || null; // If a valid value is not found, return null.
    }

}