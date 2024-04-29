import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { NotesService } from './notes.service';

describe('NotesService', () => {
  let service: NotesService;
  let mockNote: Note = new Note();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotesService, {
        provide: getRepositoryToken(Note),
        useValue: {
          save: jest.fn().mockResolvedValue(mockNote),
          find: jest.fn().mockResolvedValue([mockNote])
        }
      }],
    }).compile();

    service = module.get<NotesService>(NotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return array of notes', async () => {
      const notes = await service.findAll();
      expect(notes).toStrictEqual([mockNote]);
    })
  })
});
