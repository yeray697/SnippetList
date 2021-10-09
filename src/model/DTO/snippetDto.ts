interface SnippetDTO {
  id: string;
  title: string;
  description: string;
  tags: string[];
  pinned: boolean;
  updTimeStamp: number | Object;
}

export default SnippetDTO;
