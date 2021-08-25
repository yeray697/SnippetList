import Tag from "./tag";

interface Snippet {
  id: string
  title: string
  description: string
  tags: Tag[]
  pinned: boolean
}

export default Snippet
