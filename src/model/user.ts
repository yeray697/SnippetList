import BaseModel from "./baseModel"
import Snippet from "./snippet"
import Tag from "./tag"

interface User extends BaseModel {
  name: string
  snippets: Snippet[]
  tags: Tag[]
}

export default User