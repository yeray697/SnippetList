import SnippetDTO from '../model/DTO/snippetDto';
import Tag from '../model/tag';
import Snippet from '../model/snippet';

function mapFromDto(snippet: SnippetDTO, tagList: Tag[]): Snippet {
  var tags: Tag[] = parseTags(snippet.tags, tagList);
  return {
    id: snippet.id,
    title: snippet.title,
    description: snippet.description,
    pinned: snippet.pinned,
    tags: tags,
  } as Snippet;
}

function mapFromModel(model: Snippet): SnippetDTO {
  return {
    id: model.id,
    title: model.title,
    description: model.description,
    pinned: model.pinned,
    tags: model.tags.map(t => t.id),
  } as SnippetDTO;
}

function parseTags(tags: string[], parsedTags: Tag[]) {
  return !tags
    ? []
    : tags.map(t => {
        return parsedTags.find(pt => pt.id === t)!;
      });
}

export { mapFromDto, mapFromModel };
