import "./App.css";
import { gql, useQuery } from "@apollo/client";

const query = gql`
  query GetTodosWithUser {
    getTodos {
      id
      title
      completed
      user {
        id
        name
      }
    }
  }
`;

function App() {
  const { error, data, loading } = useQuery(query);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Who created?</th>
          </tr>
        </thead>
        <tbody>
          {data?.getTodos.map((task: any) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task?.user?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
