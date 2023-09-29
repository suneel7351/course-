import { Button, Container, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

function Notfound() {
  return (
    <Container h={'90vh'}>
      <VStack justifyContent={'center'} h="full" spacing={'4'}>
        <Heading size={'3xl'} children={<RiErrorWarningFill />} />
        <Heading children="Page not found." />
        <Link to="/">
          <Button>Go To Home</Button>
        </Link>
      </VStack>
    </Container>
  );
}

export default Notfound;
