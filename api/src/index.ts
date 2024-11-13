import * as dotenv from "dotenv";
import "reflect-metadata";
import { ApolloServer } from "@apollo/server"; // preserve-line
import { startStandaloneServer } from "@apollo/server/standalone"; // preserve-line
import { AppDataSource } from "./data-source";
import setCookie from "set-cookie-parser";
import * as jwt from "jsonwebtoken";
import getSchema from "./schema";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

// const typeDefs = `#graphql
//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
//   # This "Book" type defines the queryable fields for every book in our data source.

//   type Repo {
//     id: String
//     name: String
//     url: String
//     isPrivate: Int
//   }

//   type Lang {
//     id: Int
//     label: String
//   }

//   type Status {
//     id: Int
//     label: String
//   }

//   # The "Query" type is special: it lists all of the available queries that
//   # clients can execute, along with the return type for each. In this
//   # case, the "books" query returns an array of zero or more Books (defined above).

//   type Query {
//     repos: [Repo]
//     langs: [Lang]
//     status: [Status]
//   }
// `;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
// const resolvers = {
//   Query: {
//     repos: () => repos,
//     langs: () => langs,
//     status: () => status,
//   },
// };

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
dotenv.config();
const { AUTH_SECRET_KEY, PORT } = process.env;

(async () => {
  await AppDataSource.initialize();
  const schema = await getSchema();

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { host: "0.0.0.0", port: Number(PORT) },
    context: async ({ req, res }) => {
      if (!req.headers.cookie) return { res };

      const { cdatokenexample } = setCookie.parse(
        req.headers.cookie as string,
        {
          map: true,
        }
      );

      if (!cdatokenexample) return { res };

      const payload = jwt.verify(
        cdatokenexample.value,
        AUTH_SECRET_KEY as string
      );

      if (!payload) return { res };
      return { res, cookie: payload };
    },
  });

  console.info("Docker compose is watching");
  console.log(`🚀  Server ready at: ${url}`);
})();
