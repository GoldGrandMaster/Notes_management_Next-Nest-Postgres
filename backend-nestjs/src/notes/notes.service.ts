import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) { }

  create(createNoteDto: CreateNoteDto) {
    return this.noteRepository.save(createNoteDto);
  }

  findAll(completed?: boolean) {
    if (!completed) {
      return this.noteRepository.find();
    } else {
      return this.noteRepository.findBy({ completed });
    }
  }

  findOne(id: number) {
    return this.noteRepository.findOneBy({ id });
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const note = await this.noteRepository.findOneBy({ id });
    if(!note) {
      throw new NotFoundException("note not found");
    }
    note.name = updateNoteDto.name;
    note.completed = updateNoteDto.completed;
    return this.noteRepository.save(note);
  }

  remove(id: number) {
    this.noteRepository.delete(id);
  }
}
