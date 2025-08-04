import './App.css'
import { useEffect } from 'react';
import {useQuery,gql} from '@apollo/client'

const GET_USERS = gql`
query GetUsers{
  getUsers{
    id
    name
    age
    isAdmin
  }
}
`
const GET_USER_BY_ID = gql`
query GetUserById($id:ID!){
  getUserById(id:$id){
    name
  }
}`

interface User {
  id:number;
  name: string;
  age: number;
  isAdmin: boolean;
}

function App() {
const {data,loading:isLoading,error} = useQuery<{getUsers:User[]}>(GET_USERS);
const {data:user,loading,error:userError} = useQuery<{getUserById:User}>(GET_USER_BY_ID,{variables:{id:"1"}})

useEffect(() => {
  console.log(data);
}, [data]);
  return (
    <>
      <h1>All Users</h1>
      {isLoading && <h2>Loading...</h2>}
      {error && <h2>Error: {error.message}</h2>}
      <div>
        {data?.getUsers.map((user) => (
          <div key={user.id}>
            {user.name} {user.age}
          </div>
        ))}
      </div>

      <h1>User by ID</h1>
      {loading && <h2>Loading...</h2>}
      {userError && <h2>Error: {userError.message}</h2>}
      <div>
        {user?.getUserById.name} {user?.getUserById.age}
      </div>
    </>
  );
}

export default App
