import { useHistory } from 'react-router-dom';

function Playground() {
  const history = useHistory();
  var env = process.env.NODE_ENV || 'development';
  if (env === 'production') {
    history.push('/');
  }
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0px',
        left: '0px',
        paddingTop: '96px',
        backgroundColor: '#fff',
      }}
    ></div>
  );
}

export default Playground;
