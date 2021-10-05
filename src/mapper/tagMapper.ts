import Tag from '../model/tag';
import TagDTO from '../model/DTO/tagDto';

function mapFromDto(tag: TagDTO): Tag {
  return { id: tag.id, text: tag.text } as Tag;
}

function mapFromModel(model: Tag): TagDTO {
  return { id: model.id, text: model.text };
}

export { mapFromDto, mapFromModel };
