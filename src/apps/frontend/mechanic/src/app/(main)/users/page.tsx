//
import Link from "next/link";

//
import { client } from "@/lib/services/client";

const UsersPage = async () => {
  const { status, body: users } = await client.users.getUsers();
  if (status !== 200) {
    return null;
  }

  return (
    <div>
      USERS PAGE
      <ul>
        {users.map(({ id, name }) => (
          <li key={id}>
            <Link href={`/users/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default UsersPage;
