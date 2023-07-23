import {FindReplaceTabBase} from "../base/FindReplaceTabBase";

export class FileFindReplaceTab extends FindReplaceTabBase {

    constructor() {
        super('fileFindReplace', 'tab-options-box-file-find-replace', '#FF0000');
    }

    protected getKeyFindReplaces(): string {
        return 'file_find_replace';
    }
}