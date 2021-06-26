import React from 'react';
import Image from 'next/image';
import {Heading, SimpleGrid} from '@chakra-ui/react';

const Character = ({characters}) => {
    return (
        <SimpleGrid columns={[1,2,3]} spacing="40px">
            {characters.map(character => {
                return(
                    <a href={"/character-detail/" + character.id} key={"character-id-" + character.id}>
                        <Image src={character.image} width={300} height={300} />
                        <Heading as="h4" align="center" size="md" >
                            {character.name}
                        </Heading>
                    </a>
                )
            })}
        </SimpleGrid>
    )
}

export default Character;