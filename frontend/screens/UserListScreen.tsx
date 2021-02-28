import { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { FiCheck, FiX } from 'react-icons/fi';
import { MdBuild } from 'react-icons/md';
import {
  Container,
  Heading,
  Text,
  Flex,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,

} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Loader from 'components/Loader';
import Error from 'components/Error';
import { listUsers, deleteUser } from '../store/actions/userActions';

const UserListScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      router.push('/');
    }
  }, [dispatch, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <Container>
        <Heading fontSize="40px" mb={10}>Users</Heading>
        <Text fontSize="20px" mb={10}>
          This page lists users who are currently using this service
        </Text>
        {error && <Error>{error}</Error>}
        {loading ? <Loader /> : (
          <Flex direction="column" justify="center" align="center">
            <Table variant="simple">
              <TableCaption>Users</TableCaption>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>NAME</Th>
                  <Th isNumeric>Email</Th>
                  <Th>Admin</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map((user) => (
                  <Tr key={user._id}>
                    <Td>{user._id}</Td>
                    <Td>{user.name}</Td>
                    <Td isNumeric>{user.email}</Td>
                    <Td isNumeric>{user.isAdmin ? <FiCheck /> : <FiX />}</Td>
                    <Td>
                      <Link href={`/admin/user/${user._id}`}>
                        <Button leftIcon={<MdBuild />} colorScheme="pink" variant="solid">
                          Edit user
                        </Button>
                      </Link>
                    </Td>
                    <Td>
                      <Button leftIcon={<FiX />} colorScheme="red" variant="solid" onClick={() => deleteHandler(user._id)}>
                        Delete user
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Flex>
        )}

      </Container>
    </>
  );
};
export default UserListScreen;
