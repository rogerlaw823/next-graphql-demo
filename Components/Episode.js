import React from 'react';
import { Text, SimpleGrid } from '@chakra-ui/react';

const Episode = ({episode}) => {
    if (episode.name != null) {
        return (
            <SimpleGrid columns={[1]} spacing="40px">
                <div key={episode.id}>
                    <Text align="center">Episode Name: {episode.name}</Text>
                    <Text align="center">Air Date: {episode.air_date}</Text>
                    <Text align="center">Created Time: {episode.created}</Text>
                </div>
            </SimpleGrid>
        );
    } else {
        return (<div>Please enter a valid episode id</div>);
    }
}

export default Episode;