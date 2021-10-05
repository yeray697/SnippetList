interface SnippetDTO {
  id: string;
  title: string;
  description: string;
  tags: string[];
  pinned: boolean;
}

export default SnippetDTO;
