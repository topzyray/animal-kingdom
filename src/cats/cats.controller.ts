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

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param() paramsCatDto: ParamsCatDto) {
    return this.catsService.findOne(paramsCatDto.id);
  }

  @Patch(':id')
  update(
    @Param() paramsCatDto: ParamsCatDto,
    @Body() updateCatDto: UpdateCatDto,
  ) {
    return this.catsService.update(paramsCatDto.id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param() paramsCatDto: ParamsCatDto) {
    return this.catsService.remove(paramsCatDto.id);
  }
}
