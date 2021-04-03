import { withUrqlClient } from 'next-urql';
import { Navbar } from '../components/Navbar';
import { createUrqlClient } from '../utils/createUrqlClient';

const Home = () => {
  return (
    <>
      <Navbar />
    </>
  );
};
export default withUrqlClient(createUrqlClient)(Home);
