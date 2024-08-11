import { useRouter } from 'next/navigation';
import {
  Heading,
  Avatar,
  Box,
  Center,
  Flex,
  Text,
  Stack,
  SimpleGrid,
  Button,
  Spinner,
} from '@chakra-ui/react';

export default function UserList({ users }) {
  const router = useRouter();

  const handleClick = (userId) => {
    router.push(`/posts/${userId}`);
  };

  if (!users || users.length === 0) {
    // Handle case when there are no users
    return (
      <Center py={6} h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Center py={6}>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
        {users.map((user) => (
          <Box
            key={user.id}
            maxW={'270px'}
            w={'full'}
            bg={'white'}
            boxShadow={'xl'}
            rounded={'xl'}
            overflow={'hidden'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
          >
            <Flex justify={'center'} mt={4}>
              <Avatar
                size={'xl'}
                name={user.name}
                bg={user.gender === 'male' ? 'blue.500' : 'pink.500'}
                pos={'relative'}
                _after={{
                  content: '""',
                  w: 4,
                  h: 4,
                  bg: user.status === 'active' ? 'green.300' : 'red.300',
                  border: '2px solid white',
                  rounded: 'full',
                  pos: 'absolute',
                  bottom: 0,
                  right: 3,
                }}
                css={{
                  border: '2px solid white',
                }}
              />
            </Flex>
            <Box p={6} height={'90px'}>
              <Stack spacing={2} align={'flex-start'} mb={5} flex={1} justify={'center'}>
                <Heading
                  fontSize={'2xl'}
                  fontWeight={500}
                  fontFamily={'body'}
                  textAlign={'center'}
                  width={'100%'}
                  isTruncated
                >
                  {user.name}
                </Heading>
                <Text
                  color={'gray.500'}
                  fontSize={'sm'}
                  fontWeight={500}
                  fontFamily={'body'}
                  textAlign={'center'}
                  width={'100%'}
                  isTruncated
                >
                  {user.email}
                </Text>
              </Stack>
            </Box>
            <Box p={6}>
              <Button mt={4} border={'1px'} borderColor={'gray.300'} bg={'white'} width={'100%'} color={'gray.500'} _hover={{ bg: 'blue.900', color: 'white' }} onClick={() => handleClick(user.id)} disabled={!user.id}>
                View Posts
              </Button>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Center>
  );
}