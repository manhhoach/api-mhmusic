import { getPagination } from "../helpers/pagination";
import { ILike } from "typeorm"

export default class QueryOptions {
    limit: number;
    offset: number;
    condition: any;
    order: any;
    constructor(page_index: number, page_size: number, query: any) {
        this.limit = getPagination(page_index, page_size).limit;
        this.offset = getPagination(page_index, page_size).offset;
        this.order = query.order ? this.createSortOption(query.order) : { createdAt: "DESC" }
        this.condition = query.name ? this.createLikeOption(query.name) : {}
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

    createLikeOption(name: string) {
        return { name: ILike(`%${name.toLowerCase()}%`) }
    }
}