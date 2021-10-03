import firebase from 'firebase/app';
import UserDTO from "../model/DTO/userDto";
import User from "../model/user";
import { mapFromDto as mapTagFromDto } from "./tagMapper";
import { mapFromDto as mapSnippetFromDto } from "./snippetMapper";

function mapFromDto(id: string, dto: UserDTO) { //}: User[] {
    var parsedTags = dto?.tags ? Object.entries(dto.tags).map(([key, value]) => (mapTagFromDto(key,value))) : [];
    var parsedSnippets = dto?.snippets ? Object.entries(dto.snippets).map(([key, value]) => mapSnippetFromDto(key, value, parsedTags)) : [];
    return {id: id, snippets: parsedSnippets, tags: parsedTags} as User;
}

function mapFromSnapshot(snapshot: firebase.database.DataSnapshot) { 
    return mapFromDto(snapshot.key!!, snapshot.val()); 
}

//ToDo If necessary
function mapFromModel(model: User) {//: UserDTO {
    //return mapFromModelBase(model);
    //return dto;
}

export {mapFromDto, mapFromSnapshot, mapFromModel};