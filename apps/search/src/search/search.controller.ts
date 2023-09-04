import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  search(@Query() query: any){
    console.log('a');
    
  }
  // @Get('/sync')
  // sync(@Query() query: any){
  //   return this.searchService.syncData()
    
  // }
}
