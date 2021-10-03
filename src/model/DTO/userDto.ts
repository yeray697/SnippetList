import BaseModelViewEntity from "./firebaseBaseDto";
import SnippetDTO from "./snippetDto";
import TagDTO from "./tagDto";

interface UserDTO {
    name: string;
    snippets: BaseModelViewEntity<SnippetDTO>
    tags: BaseModelViewEntity<TagDTO>
}

export default UserDTO