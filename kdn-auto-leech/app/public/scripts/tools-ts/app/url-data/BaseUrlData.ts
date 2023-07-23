export abstract class BaseUrlData {

    /** Name of the site whose settings will be used to crawl the URL*/
    private readonly _siteName: string;

    /** ID of the site whose settings will be used to crawl the URL */
    private readonly _siteId: number;

    /** URL to be crawled */
    private readonly _url: string;

    /** Name of the category in which crawled post will be saved */
    private readonly _categoryName: string;

    /** ID of the category in which crawled post will be saved */
    private readonly _categoryId: number;

    /** Response retrieved after requesting the server to crawl the post */
    private _response: string;

    /**
     * @param siteName
     * @param siteId
     * @param url
     * @param categoryName
     * @param categoryId
     */
    constructor(siteName: string, siteId: number, url: string, categoryName: string, categoryId: number) {
        this._siteName = (siteName || '').trim();
        this._siteId = siteId;
        this._url = (url || '').trim();
        this._categoryId = categoryId;
        this._categoryName = (categoryName || '').trim();
    }

    get siteName(): string {
        return this._siteName;
    }

    get siteId(): number {
        return this._siteId;
    }

    get url(): string {
        return this._url;
    }

    get categoryId(): number {
        return this._categoryId;
    }

    get categoryName(): string {
        return this._categoryName;
    }

    get response(): string {
        return this._response;
    }

    set response(value: string) {
        this._response = value;
    }

}