import Snippet from '../../model/snippet';
import SnippetListContainer from '../../components/snippet_list/SnippetListContainer';

const Home = () => {
  let list: Snippet[] = [
    {
      id: 1,
      title: 'title111111111111111111111111111111111111111111111',
      description:
        'Lsfa gasga gag a gag ag agag ag agaga2 gagag agag agag 5aaagg gag ' +
        '3333333333333333 444444444444444444444 ' +
        '5555555555555555 666666666666666666666 ' +
        '7777777777777777 888888888888888888888 ' +
        '9999999999999999 000000000000000000000 ' +
        '1111111111111111 222222222222222222222 ' +
        '3333333333333333 444444444444444444444 ' +
        '5555555555555555 666666666666666666666 ' +
        '7777777777777777 888888888888888888888 ',
      tags: ['tag1', 'tag2', 'tag3', 'tag4'],
      pinned: true,
    },
    {
      id: 2,
      title: 'title2',
      description: '',
      tags: [],
      pinned: false,
    },
    {
      id: 3,
      title: 'title3',
      description: 'agaga',
      tags: [],
      pinned: false,
    },
    {
      id: 4,
      title: 'title4',
      description: 'agaga',
      tags: [],
      pinned: false,
    },
    {
      id: 5,
      title: 'title5',
      description: 'agaga',
      tags: [],
      pinned: false,
    },
    {
      id: 6,
      title: 'title6',
      description: 'agaga',
      tags: [],
      pinned: true,
    },
    {
      id: 7,
      title: 'title7',
      description: '',
      tags: [],
      pinned: false,
    },
    {
      id: 8,
      title: 'title8',
      description: 'agaga',
      tags: [],
      pinned: true,
    },
    {
      id: 9,
      title: 'title9',
      description: 'agaga',
      tags: [
        'taaag1',
        'tag2faf',
        'taggggg3',
        'taffffffggggffggggfffffffggggggfasssaaffffffffffg4',
        'tag5',
        'tag6',
        'tag7',
      ],
      pinned: false,
    },
    {
      id: 10,
      title: 'title10',
      description: 'agaga',
      tags: [],
      pinned: false,
    },
    {
      id: 11,
      title: 'title11',
      description: 'agaga',
      tags: [],
      pinned: false,
    },
  ];

  return <SnippetListContainer items={list} />;
};

export default Home;
