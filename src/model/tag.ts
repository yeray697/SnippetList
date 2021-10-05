import BaseModel from './baseModel';

interface Tag extends BaseModel {
  id: string;
  text: string;
}

export default Tag;
