import Tag from './tag';
import BaseModel from './baseModel';

interface Snippet extends BaseModel {
  title: string;
  description: string;
  tags: Tag[];
  pinned: boolean;
}

export default Snippet;
