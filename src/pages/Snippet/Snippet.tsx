import { TextField } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';

const SnippetPage = ({ match }: RouteComponentProps<{ id: string }>) => {
  //ToDo let editMode = match.path.startsWith('/snippet/edit/'); //ToDo constant

  return (
    <form className={''} noValidate autoComplete="off">
      <TextField
        required
        id="outlined-required"
        label="Title"
        placeholder="Title"
        variant="outlined"
      />
      <TextField
        required
        id="outlined-required"
        label="Description"
        placeholder="Description"
        multiline
        rowsMax={4}
        variant="outlined"
      />
    </form>
  );
};

export default SnippetPage;
