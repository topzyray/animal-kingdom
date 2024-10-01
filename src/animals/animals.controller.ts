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
} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { ParamsAnimalDto } from './dto/params-animal.dto';
import { SearchAnimalDto } from './dto/search-animal.dto';
import { QueryAnimalDto } from './dto/query-animal.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';

// @Roles(['admin'])
// @UseGuards(AuthenticationGuard, AuthorizationGuard)

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @UseGuards(AuthenticationGuard)
  @Post()
  async createAnimal(
    @Body() createAnimalDto: CreateAnimalDto,
    @Req() { userId },
  ) {
    return this.animalsService.create(createAnimalDto, userId);
  }

  @Get()
  async findAllAnimals(@Query() queryAnimalDto: QueryAnimalDto) {
    return this.animalsService.findAll(queryAnimalDto);
  }

  @Get('search')
  async searchAnimal(@Query() searchAnimalDto: SearchAnimalDto) {
    return this.animalsService.searchAnimal(searchAnimalDto);
  }

  @UseGuards(AuthenticationGuard)
  @Get('user')
  async findAllAnimalsByUser(@Req() { userId }) {
    return this.animalsService.findAllAnimalsByUser(userId);
  }

  @UseGuards(AuthenticationGuard)
  @Get('user/:id')
  async findAnimalByIdByUser(
    @Param() paramsAnimalDto: ParamsAnimalDto,
    @Req() { userId },
  ) {
    return this.animalsService.findAnimalByIdByUser(paramsAnimalDto.id, userId);
  }

  @Get(':id')
  async findAnimalById(@Param() paramsAnimalDto: ParamsAnimalDto) {
    return this.animalsService.findOne(paramsAnimalDto.id);
  }

  @UseGuards(AuthenticationGuard)
  @Patch(':id')
  async updateAnimalById(
    @Param() paramsAnimalDto: ParamsAnimalDto,
    @Body() updateAnimalDto: UpdateAnimalDto,
    @Req() { userId },
  ) {
    return this.animalsService.update(
      paramsAnimalDto.id,
      updateAnimalDto,
      userId,
    );
  }

  @UseGuards(AuthenticationGuard)
  @Delete(':id')
  async removeAnimalById(
    @Param() paramsAnimalDto: ParamsAnimalDto,
    @Req() { userId },
  ) {
    return this.animalsService.remove(paramsAnimalDto.id, userId);
  }

  // For admins only

  // @Post()
  // async createManyAnimal(@Body() createAnimalDto: CreateAnimalDto[]) {
  //   console.log(createAnimalDto);
  //   // return this.animalsService.createMany(createAnimalDto);
  // }

  // @Delete()
  // async removeAllAnimals() {
  //   return this.animalsService.removeAll();
  // }
}
