import UserDTO from '../model/DTO/userDto';
import User from '../model/user';
import {
  mapFromDto as mapTagFromDto,
  mapFromModel as mapTagFromModel,
} from './tagMapper';
import {
  mapFromDto as mapSnippetFromDto,
  mapFromModel as mapSnippetFromModel,
} from './snippetMapper';

function mapFromDto(dto: UserDTO): User {
  let parsedTags = dto?.tags
    ? Object.entries(dto.tags).map(([key, value]) => mapTagFromDto(value))
    : [];
  let parsedSnippets = dto?.snippets
    ? Object.entries(dto.snippets).map(([key, value]) =>
        mapSnippetFromDto(value, parsedTags)
      )
    : [];

  return {
    name: dto.name,
    snippets: parsedSnippets,
    tags: parsedTags,
  } as User;
}

function mapFromDtoWithId(id: string, user: UserDTO): User {
  return { ...mapFromDto(user), ...{ id: id } };
}

function mapFromModel(model: User): UserDTO {
  return {
    name: model.name,
    tags: Object.fromEntries(model.tags.map(t => [t.id, mapTagFromModel(t)])),
    snippets: Object.fromEntries(
      model.snippets.map(s => [s.id, mapSnippetFromModel(s)])
    ),
  } as UserDTO;
}

export { mapFromDto, mapFromDtoWithId, mapFromModel };
