import { gql, useQuery } from '@apollo/client';
import Client  from './client.tsx';

const client = Client();

const GET_EE = gql`
  query employee($id: ID!) {
    getemployee(id: $id) {
      id
      name
      email
    }
  }
`;

const Employee= ({ employeeId }: { employeeId: string }) => {
  const { loading, error, data } = useQuery(GET_EE, {
    variables: { id: employeeId },
    client,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Employee Data</h1>
      <p>ID: {data.getUser.id}</p>
      <p>Name: {data.getUser.name}</p>
      <p>Email: {data.getUser.email}</p>
    </div>
  );
};

export default Employee;