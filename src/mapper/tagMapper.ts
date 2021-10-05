import Tag from '../model/tag';
import TagDTO from '../model/DTO/tagDto';
import BaseModelViewEntity from '../model/DTO/firebaseBaseDto';

function mapFromDto(id: string, tag: TagDTO): Tag {
  return { id: id, text: tag.text } as Tag;
}

function mapFromModel(model: Tag): TagDTO {
  return { text: model.text };
}

function mapArrayFromModel(model: Tag[]): BaseModelViewEntity<TagDTO> {
  return Object.fromEntries(model.map(m => [m.id, mapFromModel(m)]));
}

export { mapFromDto, mapFromModel, mapArrayFromModel };
