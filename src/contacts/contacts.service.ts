import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contacts } from './entities/contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contacts)
    private readonly contactsRepository: Repository<Contacts>,
  ) {}

  async create(createContactDto: CreateContactDto) {
    return await this.contactsRepository.save(createContactDto);
  }

  async findAll() {
    return this.contactsRepository.find();
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    const contact = await this.contactsRepository.findOne({
      where: { id },
    });
    if (!contact) throw new NotFoundException('This contacts not found');
    await this.contactsRepository.update(id, updateContactDto);
    return { success: true };
  }

  async remove(id: number) {
    const contacts = await this.contactsRepository.findOne({
      where: { id },
    });
    if (!contacts) throw new NotFoundException('This contacts not found');
    await this.contactsRepository.delete(id);
    return { success: true };
  }
}
