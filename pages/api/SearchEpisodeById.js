import {ApolloClient, InMemoryCache, gql} from '@apollo/client';

const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache(),
});

export default async (req, res) => {
    const search = req.body;
    try {
        const {data} = await client.query({
            query: gql`
              query {
                episode(id: "${search}") {
                  id
                  name
                  air_date
                  created
                  characters {
                    id
                    name
                    status
                    gender
                    species
                    image
                  }
                }
              }
            `
        });
        res.status(200).json({
          episode: data.episode,
          characters: data.episode.characters,
          error: null
        });
    } catch (error) {
        if (error.message == "404: Not found") {
            res.status(400).json({characters: null, error: "Not Found"});
        } else {
            res.status(500).json({characters: null, error: "Internal Error"});
        }
    }
}