import { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
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
  Tfoot,

} from '@chakra-ui/react';
import { useRouter } from 'next/router';
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

  return (
    <>
      <Container>
        <Heading fontSize="40px" mb={10}>Users</Heading>
        <Text fontSize="20px" mb={10}>
          This page lists users who are currently using this service
        </Text>
        <Flex direction="column" justify="center" align="center">
          <Table variant="simple">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>NAME</Th>
                <Th isNumeric>Email</Th>
                <th>Admin User</th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
                <Td isNumeric>25.4</Td>

              </Tr>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
                <Td isNumeric>25.4</Td>

              </Tr>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
                <Td isNumeric>25.4</Td>

              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
                <Td isNumeric>25.4</Td>

              </Tr>
            </Tfoot>
          </Table>
        </Flex>
      </Container>
    </>
  );
};
export default UserListScreen;
