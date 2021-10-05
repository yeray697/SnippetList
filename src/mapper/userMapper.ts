import firebase from 'firebase/app';
import UserDTO from '../model/DTO/userDto';
import User from '../model/user';
import {
  mapFromDto as mapTagFromDto,
  mapArrayFromModel as mapTagFromModel,
} from './tagMapper';
import {
  mapFromDto as mapSnippetFromDto,
  mapArrayFromModel as mapSnippetFromModel,
} from './snippetMapper';

function mapFromDto(id: string, dto: UserDTO): User {
  var parsedTags = dto?.tags
    ? Object.entries(dto.tags).map(([key, value]) => mapTagFromDto(key, value))
    : [];
  var parsedSnippets = dto?.snippets
    ? Object.entries(dto.snippets).map(([key, value]) =>
        mapSnippetFromDto(key, value, parsedTags)
      )
    : [];
  return {
    id: id,
    name: dto.name,
    snippets: parsedSnippets,
    tags: parsedTags,
  } as User;
}

function mapFromSnapshot(snapshot: firebase.database.DataSnapshot) {
  return mapFromDto(snapshot.key!!, snapshot.val());
}

function mapFromModel(model: User): UserDTO {
  return {
    name: model.name,
    tags: mapTagFromModel(model.tags),
    snippets: mapSnippetFromModel(model.snippets),
  } as UserDTO;
}

export { mapFromDto, mapFromSnapshot, mapFromModel };
