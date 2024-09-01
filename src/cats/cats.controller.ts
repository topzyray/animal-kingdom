import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { ParamsCatDto } from './dto/params-cat.dto';

@Controller('animals/cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  createCat(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAllCats() {
    return this.catsService.findAll();
  }

  @Get(':id')
  findCatById(@Param() paramsCatDto: ParamsCatDto) {
    return this.catsService.findOne(paramsCatDto.id);
  }

  @Patch(':id')
  updateCatById(
    @Param() paramsCatDto: ParamsCatDto,
    @Body() updateCatDto: UpdateCatDto,
  ) {
    return this.catsService.update(paramsCatDto.id, updateCatDto);
  }

  @Delete(':id')
  removeCatById(@Param() paramsCatDto: ParamsCatDto) {
    return this.catsService.remove(paramsCatDto.id);
  }

  @Delete()
  removeAllCats() {
    return this.catsService.removeAll();
  }
}
