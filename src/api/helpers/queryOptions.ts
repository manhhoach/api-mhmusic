import { getPagination } from "../helpers/pagination";


export default class QueryOptions {
    limit: number;
    offset: number;
    condition: any;
    order: any;
    constructor(page_index: number, page_size: number, condition?: any, sort?: string) {
        this.limit = getPagination(page_index, page_size).limit;
        this.offset = getPagination(page_index, page_size).offset;
        this.condition = condition;
        this.order = sort ? this.createSortOption(sort) : { createdAt: "DESC" }

    }
    createSortOption(sort: string) {
        let fieldSort, order: any = {};
        if (sort.startsWith('-') || sort.startsWith('+')) {
            fieldSort = sort.slice(1, sort.length)
            order[fieldSort] = sort[0] === '-' ? "DESC" : "ASC";
        }
        else
            order[sort] = "ASC"

        return order;
    }
}