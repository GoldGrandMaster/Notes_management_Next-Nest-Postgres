import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { mock } from 'node:test';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

describe('NotesController', () => {
  let controller: NotesController;
  let mockNote: Note = new Note();
  let notesService: NotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [NotesService, {
        provide: getRepositoryToken(Note),
        useValue: {
          save: jest.fn().mockResolvedValue(mockNote),
          find: jest.fn().mockResolvedValue([mockNote])
        }
      }],
    }).compile();

    controller = module.get<NotesController>(NotesController);
    notesService = module.get<NotesService>(NotesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return array of notes', async () => {
      const result = [
        {
          "id": 1,
          "name": "write notes here",
          "completed": false
        }
      ];
      jest.spyOn(notesService, 'findAll').mockImplementation(() => Promise.resolve(result));
      expect(await controller.findAll()).toBe(result);
    })
  })
});
