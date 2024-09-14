import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { ParamsCatDto } from './dto/params-cat.dto';
import { SearchCatDto } from './dto/search-cat.dto';
import { QueryCatDto } from './dto/query-cat.dto';

@Controller('animals/cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async createCat(@Body() createCatDto: CreateCatDto) {
    const data = await this.catsService.create(createCatDto);
    return {
      success: true,
      status: 201,
      message: 'Cat resource created successfully!',
      data,
    };
  }

 
  @Get()
  async findAllCats(@Query() queryCatDto: QueryCatDto) {
    const data = await this.catsService.findAll(queryCatDto);
    return {
      success: true,
      status: 200,
      data_count: data.length,
      data,
    };
  }

  @Get('search')
  async searchCat(@Query() searchCatDto: SearchCatDto) {
    const data = await this.catsService.searchCat(searchCatDto);
    return {
      success: true,
      status: 200,
      count: data.length,
      data,
    };
  }

  @Get(':id')
  async findCatById(@Param() paramsCatDto: ParamsCatDto) {
    const data = await this.catsService.findOne(paramsCatDto.id);
    return {
      success: true,
      status: 200,
      message: 'Cat resource fetched successfully!',
      data,
    };
  }

  @Patch(':id')
  async updateCatById(
    @Param() paramsCatDto: ParamsCatDto,
    @Body() updateCatDto: UpdateCatDto,
  ) {
    const data = await this.catsService.update(paramsCatDto.id, updateCatDto);
    return {
      success: true,
      status: 200,
      message: 'Cat resource updated successfully!',
      data,
    };
  }

  @Delete(':id')
  async removeCatById(@Param() paramsCatDto: ParamsCatDto) {
    const data = await this.catsService.remove(paramsCatDto.id);
    return {
      success: true,
      status: 200,
      message: data,
    };
  }

  // @Delete()
  // async removeAllCats() {
  //   const data = await this.catsService.removeAll();
  //   return {
  //     success: true,
  //     status: 200,
  //     message: data,
  //   };
  // }
}
