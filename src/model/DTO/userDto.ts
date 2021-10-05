import SnippetDTO from './snippetDto';
import TagDTO from './tagDto';

interface UserDTO {
  name: string;
  snippets: { [key: string]: SnippetDTO };
  tags: { [key: string]: TagDTO };
}

export default UserDTO;
