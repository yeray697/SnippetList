import firebase from 'firebase/app';
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

function mapFromDto(id: string, dto: UserDTO): User {
  let parsedTags = dto?.tags
    ? Object.entries(dto.tags).map(([key, value]) => mapTagFromDto(value))
    : [];
  let parsedSnippets = dto?.snippets
    ? Object.entries(dto.snippets).map(([key, value]) =>
        mapSnippetFromDto(value, parsedTags)
      )
    : [];

  return {
    id: id,
    name: dto.name,
    snippets: parsedSnippets,
    tags: parsedTags,
  } as User;
}

function mapFromSnapshot(snapshot: firebase.database.DataSnapshot): User {
  return mapFromDto(snapshot.key!!, snapshot.val());
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

export { mapFromDto, mapFromSnapshot, mapFromModel };
