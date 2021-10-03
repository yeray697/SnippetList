import Tag from "../model/tag";
import TagDTO from "../model/DTO/tagDto";

function mapFromDto(id: string, tag: TagDTO): Tag {
    return {id: id, text: tag.text} as Tag;
}

//ToDo if necessary
function mapFromModel(model: Tag) {//: BaseModelViewEntity<TagDTO> {
    //return { id: model.id} as TagDTO;
    //return mapFromModelBase(model);
    //return dto;
}

export {mapFromDto, mapFromModel};