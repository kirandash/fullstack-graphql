## Client GraphQL with React

## 1 Intro

### 1.1 Intro

- How it started?
  - By FB, it was started with client side in focus for a way to align FE component props to align with BE data. So that there is no need of post processing. Just pass data directly
  - Slowly evolved into a fully functional query lang with schemas and features on both client and server side
- **GraphQL, The big pic. What is GraphQL?**
  - A spec that describes a declarative query language that your clients can use to ask an API for the exact data they want. This is achieved by creating a strongly typed Schema for your API, ultimate flexibility in how your API can resolve data, and client queries validated against your Schema.
  - It's just a [spec](https://spec.graphql.org/). There are several implementations and variations

### 1.2 GraphQL Playground

- For this project we will need a graphql server. But note that we might not need a server as well as we can also proxy REST APIs and use graphql on client side
- **Queries and Mutations from client**:
  - usually defined on server and used on client. We can also
- For playground: can use public graphql api: https://rickandmortyapi.com/graphql
- Graphql playground built on graphiql: https://github.com/graphql/graphiql
- Should be avl by default. Check api/graphql

## 2 GraphQL Basics

### 2.1 Operation Names

- Unique names for your client side Query and Mutation operations. Used for client side caching, indexing inside of tools like GraphQL playground, etc. Like naming your functions in JS vs keeping them anonymous.
- Anonymous query:
  ```graphql
  {
    characters {
      results {
        name
      }
    }
  }
  ```
- Query with name

```graphql
query AllCharacters {
  characters {
    results {
      name
    }
  }
}
```

- Note: We must keep them unique

### 2.2 Query operation

- Variables with operations

  - Operations can define arguments, very much like a function in most programming languages. Those variables can then be passed to query / mutation calls inside the operation as arguments. Variables are expected to be given at run time during operation execution from your client.
  - Example:

  ```graphql
  query CharactersByPage($page: Int) {
    characters(page: $page) {
      results {
        name
      }
    }
  }
  ```

  - Variables are defined with `$` prefix and must have a type
  - Variables can be optional or required, and can have default values
  - Variables are passed as a separate JSON object alongside the query

- Ex 2:

```graphql
query AllCharacters($page: Int, $filter: FilterCharacter) {
  characters(page: $page, filter: $filter) {
    results {
      name
    }
  }
}
```

### 2.3 Multiple Queries & Mutations & Aliases

- Alias:
  - Ex: to align with component prop without changing at BE API level
  - To avoid conflicts with interfaces etc to avoid collision

```
query AllCharacters($page:Int, $filter:FilterCharacter) {
	results: characters(page: $page, filter:$filter) {
    results {
      fullName: name
    }
  }
}
```

- Alias also helps us run same query twice when the body does not change. GraphQL by default does not allow it

```
query AllCharacters($page:Int, $filter:FilterCharacter) {
	results: characters(page: $page, filter:$filter) {
    results {
      fullName: name
    }
  }

  characters(page: $page, filter:$filter) {
    results {
      fullName: name
    }
  }
}
```

- This will run multiple queries on BE. BE AWARE!

- Mutation:

  ```
  mutation CreateAlbum() {
    createAlbum() {

    }
  }
  ```

  - Note: Mutations are not cached but it is still indexed and the operation name might be used by other tools. So it's better to write them

- Over the wire: these are sent as GET or POST etc based on the types of requests
- Note: We can also use directives with graphql to do some data processing if required
  - https://github.com/graphql-kit/graphql-lodash

### 2.4 Apollo Client Tool

- What is Apollo Client?
  - Encapsulates HTTP logic used to interact with a GraphQL API.
  - Doubles as a client side state management alternative as well.
  - If your GraphQL API is also an Apollo Server, provides some extra features.
  - Offers a plug approach for extending its capabilities.
  - It's also framework independent.
- Note: GraphQl client state management can be powerful and can be used as a replacement for state management libraries like redux
  - earlier in v1, graphql had redux built in but now it's not. So ideally use graphql for everything, local state and api caching/querying. But if you have redux already then use redux for local and graphql for caching data coming from API.

### 2.5 Storing data from the API

- storing data
  - All nodes are **stored flat** by an unique ID
  - Unique ID is defaulted to .id or .\_id from nodes. You can change this
  - Every node should send an .id or .\_id, or none at all. Or you have to customize that logic
- The rational behind storing flat is: it is easier and faster to update multiple instances in a flat structure rather than finding the same instances on a nested structure

## 3 Apollo React

### 3.1 Apollo Client & API Querying

- Use apollo client dev tools to see the flat structure

## 3 Apollo React

### 3.1 Apollo Client & API Querying

- Use apollo client dev tools to see the flat structure of data in the "Cache" tab
