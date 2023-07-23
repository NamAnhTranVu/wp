import {TabBase} from "./tabs/base/TabBase";
import {TabName} from "./enums/TabName";
import {CalculationsTab} from "./tabs/default/CalculationsTab";
import {FindReplaceTab} from "./tabs/default/FindReplaceTab";
import {GeneralTab} from "./tabs/default/GeneralTab";
import {ImportExportTab} from "./tabs/default/ImportExportTab";
import {NotesTab} from "./tabs/default/NotesTab";
import {TemplatesTab} from "./tabs/default/TemplatesTab";
import {FileFindReplaceTab} from "./tabs/file/FileFindReplaceTab";
import {FileOperationsTab} from "./tabs/file/FileOperationsTab";
import {FileTemplatesTab} from "./tabs/file/FileTemplatesTab";

export class TabFactory {

    private static instances: {[key: string]: TabBase} = {};

    /**
     * Get an instance for a tab type.
     * @param {TabName} tabName
     */
    public static getInstance(tabName: TabName): TabBase {
        if(!this.instances.hasOwnProperty(tabName)) {
            let instance: TabBase;

            // It would be much better if this switch statement is gotten rid of. I could not find a nice way to create
            // new instances from class names. Actually, each tab must have had a getInstance method to implement a
            // singleton pattern. But, I could not find a nice way to get the name of the child class from the parent
            // TabBase. So, here we are with an ugly switch.

            switch (tabName) {
                case TabName.CALCULATIONS:
                    instance = new CalculationsTab();
                    break;

                case TabName.FIND_REPLACE:
                    instance = new FindReplaceTab();
                    break;

                case TabName.GENERAL:
                    instance = new GeneralTab();
                    break;

                case TabName.IMPORT_EXPORT:
                    instance = new ImportExportTab();
                    break;

                case TabName.NOTES:
                    instance = new NotesTab();
                    break;

                case TabName.TEMPLATES:
                    instance = new TemplatesTab();
                    break;

                case TabName.FILE_FIND_REPLACE:
                    instance = new FileFindReplaceTab();
                    break;

                case TabName.FILE_OPERATIONS:
                    instance = new FileOperationsTab();
                    break;

                case TabName.FILE_TEMPLATES:
                    instance = new FileTemplatesTab();
                    break;
            }

            // Store the instance
            this.instances[tabName] = instance;
        }

        // Return the instance
        return this.instances[tabName];
    }
}