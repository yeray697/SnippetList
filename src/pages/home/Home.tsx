import Snippet from '../../model/snippet';
import SnippetListContainer from '../../components/snippet_list/SnippetListContainer';
import { getSnippets } from '../../service/snippetService';
import { useEffect, useState } from 'react';

const Home = () => {
  const [list, setList] = useState<Snippet[]>();

  useEffect(() => {
    if (!list)
      getSnippets(
        snippets => {
          setList(snippets);
        },
        exception => {
          throw exception;
        }
      );
  }, [list]);

  return <>{list && <SnippetListContainer items={list} />}</>;
};

export default Home;
