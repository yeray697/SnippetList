import SnippetDTO from '../model/DTO/snippetDto';
import Tag from '../model/tag';
import Snippet from '../model/snippet';
import BaseModelViewEntity from '../model/DTO/firebaseBaseDto';

function mapFromDto(id: string, snippet: SnippetDTO, tagList: Tag[]): Snippet {
  var tags: Tag[] = parseTags(snippet.tags, tagList);
  return {
    id: id,
    title: snippet.title,
    description: snippet.description,
    pinned: snippet.pinned,
    tags: tags,
  } as Snippet;
}

function mapFromModel(model: Snippet): SnippetDTO {
  return {
    title: model.title,
    description: model.description,
    pinned: model.pinned,
    tags: model.tags.map(t => t.id),
  } as SnippetDTO;
}

function mapArrayFromModel(model: Snippet[]): BaseModelViewEntity<SnippetDTO> {
  return Object.fromEntries(model.map(m => [m.id, mapFromModel(m)]));
}

function parseTags(tags: string[], parsedTags: Tag[]) {
  return !tags
    ? []
    : tags.map(t => {
        return parsedTags.find(pt => pt.id === t)!;
      });
}

export { mapFromDto, mapFromModel, mapArrayFromModel };
