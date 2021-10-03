import SnippetDTO from "../model/DTO/snippetDto";
import Tag from "../model/tag";
import Snippet from "../model/snippet";

function mapFromDto(id: string, snippet: SnippetDTO, tagList: Tag[]) : Snippet {
    
    var tags : Tag[] =  parseTags(snippet.tags, tagList); 
    return {
        id: id,
        title: snippet.title,
        description: snippet.description,
        pinned: snippet.pinned,
        tags: tags
    } as Snippet
}

function mapFromModel(model: Snippet) :SnippetDTO {
    let tagsId: string[] = model.tags.map(t => t.id);

    return {
        title: model.title
        ,description:model.description
        ,pinned: model.pinned
        ,tags: tagsId
    } as SnippetDTO;
}

function parseTags(tags: string[], parsedTags: Tag[]) {
    return (!tags) ? [] : tags.map( t => {
        return parsedTags.find(pt => pt.id === t)!;
    })
}

export {mapFromDto, mapFromModel};