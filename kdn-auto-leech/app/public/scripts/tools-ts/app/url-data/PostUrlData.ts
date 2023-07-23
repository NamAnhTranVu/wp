import {BaseUrlData} from "./BaseUrlData";

export class PostUrlData extends BaseUrlData {

    /** Featured image URL for the post */
    private readonly _imageUrl: string;

    /** ID of the crawled post */
    private _postId: number;

    /** URL of the crawled post */
    private _postUrl: string;

    /**
     * @param siteName
     * @param siteId
     * @param url
     * @param categoryName
     * @param categoryId
     * @param imageUrl
     */
    constructor(siteName: string, siteId: number, url: string, categoryName: string, categoryId: number, imageUrl: string) {
        super(siteName, siteId, url, categoryName, categoryId);
        this._imageUrl = imageUrl || '';
    }

    get imageUrl(): string {
        return this._imageUrl;
    }

    get postId(): number {
        return this._postId;
    }

    set postId(value: number) {
        this._postId = value;
    }

    get postUrl(): string {
        return this._postUrl;
    }

    set postUrl(value: string) {
        this._postUrl = value;
    }

}