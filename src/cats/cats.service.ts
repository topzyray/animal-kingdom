import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './schema/cat.schema';
import { Model } from 'mongoose';
import { QueryCatDto } from './dto/query-cat.dto';
import { SearchCatDto } from './dto/search-cat.dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const newCat = await this.catModel.create(createCatDto);
    if (!newCat) {
      throw new NotImplementedException('Failed to create Cat');
    }
    return newCat;
  }

  async findAll(queryCatDto: QueryCatDto): Promise<Cat[]> {
    const { page = 1, limit = 10 } = queryCatDto;
    const allCat = await this.catModel
      .find()
      .skip((+page - 1) * +limit)
      .limit(+limit);

    if (!allCat) {
      throw new NotFoundException('Failed to fetch all cats');
    }
    if (allCat.length === 0) {
      throw new NotFoundException('No cats found');
    }
    return allCat;
  }

  async searchCat(searchCatDto: SearchCatDto) {
    if (!searchCatDto.name && !searchCatDto.breed && !searchCatDto.color) {
      throw new NotFoundException(
        'No search criteria provided. Please provide a search criteria such as name, breed or color with value',
      );
    }
    const cats = await this.catModel.find({ ...searchCatDto });
    if (cats.length === 0) {
      throw new NotFoundException(
        'No cats found with provided search criteria',
      );
    }
    return cats;
  }

  async findOne(id: string): Promise<Cat> {
    const cat = await this.catModel.findById(id).exec();
    if (!cat) {
      throw new NotFoundException(`Cat with id ${id} not found`);
    }
    return cat;
  }

  async update(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
    const updatedCat = await this.catModel.findByIdAndUpdate(id, updateCatDto, {
      new: true,
    });

    if (!updatedCat) {
      throw new NotFoundException(`Cat with id ${id} not found`);
    }
    return updatedCat;
  }

  async remove(id: string) {
    const deletedCat = await this.catModel.findByIdAndDelete(id);
    if (!deletedCat) {
      throw new NotFoundException(`Cat with id ${id} not found`);
    }
    return `Cat with id ${id} deleted successfully!`;
  }

  // For admin only

  // async createMany(createCatDto: CreateCatDto[]): Promise<Cat[]> {
  //   const newCats = await this.catModel.insertMany(createCatDto);
  //   if (!newCats) {
  //     throw new NotImplementedException('Failed to create Cat');
  //   }
  //   return newCats;
  // }

  // async removeAll() {
  //   const deletedCats = await this.catModel.deleteMany();
  //   if (deletedCats.deletedCount === 0) {
  //     throw new NotImplementedException(`Failed to delete all Cat resource!`);
  //   }
  //   return `All Cat resource deleted successfully!`;
  // }
}
