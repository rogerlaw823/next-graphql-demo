import Image from 'next/image';
import { useState } from 'react';
import {ApolloClient, InMemoryCache, gql} from '@apollo/client';
import { Flex, Text } from '@chakra-ui/react';
import { SimpleGrid } from '@chakra-ui/react';
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Home(results) {
    const [character] = useState(results.character);
    const router = useRouter();

    return (
      <Flex direction="column" justify="center" align="center">
        <SimpleGrid columns={[1]} spacing="40px" center>
          <div>
            <Image src={character.image} width={300} height={300} />
            <h1>Name: {character.name}</h1>
            <h1>Status: {character.status}</h1>
            <h1>Gender: {character.gender}</h1>
            <h1>Species: {character.species}</h1>
            <Text align="right" color="blue"><Link href="/">Back</Link></Text>
          </div>
        </SimpleGrid>
      </Flex>
    )
}

export async function getStaticPaths() {
  var paths = [];
  for (var idx = 1; idx <= 671; idx++) {
    paths[idx] = {params: {id: idx.toString()}};
  }

  return {
    paths: paths,
    fallback: false
  };
}

export async function getStaticProps(context) {
    const client = new ApolloClient({
      uri: "https://rickandmortyapi.com/graphql/",
      cache: new InMemoryCache(),
    });
    const { data } = await client.query({
      query: gql`
        query {
            character(id: ${context.params.id}) {
                id
                name
                status
                gender
                species
                image
            }
        }`,
    });
  
    return {
      props: {
        character: data.character,
      },
    };
}