export class ToolsVariables {

    public selectorToolsContainer = '#container-tools';
    public selectorTabNavigation = this.selectorToolsContainer + ' > .nav-tab-wrapper';
    public selectorTabs = this.selectorToolsContainer + ' > .tab';

    private static INSTANCE: ToolsVariables = null;

    /**
     * This class is a singleton. Get the instance with this method.
     */
    public static getInstance() {
        if (this.INSTANCE === null) this.INSTANCE = new ToolsVariables();
        return this.INSTANCE;
    }

    private constructor() { }

}