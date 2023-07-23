import {FindReplaceTabBase} from "../base/FindReplaceTabBase";

export class FindReplaceTab extends FindReplaceTabBase {

    constructor() {
        super('findReplace', 'tab-options-box-find-replace', '#FF0000');
    }

    protected getKeyFindReplaces(): string {
        return 'find_replace';
    }

}