import React from "react"

import {
  Flex,
  Heading,
  Input,
  Button,
  Stack,
  FormLabel,
  FormControl,
} from "@chakra-ui/react"
// import { Container } from './styles';

function SignIn() {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        w="100%"
        maxW={360}
        bg="gray.700"
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <Stack spacing="4">
          <FormControl>
            <FormLabel htmlFor="username">Usuario</FormLabel>
            <Input
              id="username"
              variant="filled"
              type="text"
              name="username"
              size="lg"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Senha</FormLabel>
            <Input
              id="password"
              variant="filled"
              type="password"
              name="password"
              size="lg"
            />
          </FormControl>
        </Stack>
        <Button type="submit" mt="6">
          Entrar
        </Button>
        <Heading as="h6" size="xs" mt="6" alignSelf="center">
          &copy; Sisac Brasil Sistemas @2021{" "}
        </Heading>
      </Flex>
    </Flex>
  )
}

export default SignIn
