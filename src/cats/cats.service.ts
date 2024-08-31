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

  async findAll(): Promise<Cat[]> {
    const allCat = await this.catModel.find();
    if (!allCat) {
      throw new NotFoundException('Failed to fetch all cats');
    }
    if (allCat.length === 0) {
      throw new NotFoundException('No cats found');
    }
    return allCat;
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
}
