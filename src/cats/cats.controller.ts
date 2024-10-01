import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
  Headers,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { ParamsCatDto } from './dto/params-cat.dto';
import { SearchCatDto } from './dto/search-cat.dto';
import { QueryCatDto } from './dto/query-cat.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';

// @Roles(['admin'])
// @UseGuards(AuthenticationGuard, AuthorizationGuard)
@UseGuards(AuthenticationGuard)
@Controller('animals/cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async createCat(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  async findAllCats(
    @Query() queryCatDto: QueryCatDto,
    @Req() { userId },
    @Headers('accept-language') language,
  ) {
    console.log(userId);
    return this.catsService.findAll(queryCatDto);
  }

  @Get('search')
  async searchCat(@Query() searchCatDto: SearchCatDto) {
    return this.catsService.searchCat(searchCatDto);
  }

  @Get(':id')
  async findCatById(@Param() paramsCatDto: ParamsCatDto) {
    return this.catsService.findOne(paramsCatDto.id);
  }

  @Patch(':id')
  async updateCatById(
    @Param() paramsCatDto: ParamsCatDto,
    @Body() updateCatDto: UpdateCatDto,
  ) {
    return this.catsService.update(paramsCatDto.id, updateCatDto);
  }

  @Delete(':id')
  async removeCatById(@Param() paramsCatDto: ParamsCatDto) {
    return this.catsService.remove(paramsCatDto.id);
  }

  // For admins only

  // @Post()
  // async createManyCat(@Body() createCatDto: CreateCatDto[]) {
  //   console.log(createCatDto);
  //   // return this.catsService.createMany(createCatDto);
  // }

  // @Delete()
  // async removeAllCats() {
  //   return this.catsService.removeAll();
  // }
}
