//
import Link from "next/link";
import { classNames } from "utilities";

//
import { client } from "@/lib/services/client";

const UsersPage = async () => {
  const { status, body: users } = await client.users.getUsers();
  if (status !== 200) {
    return null;
  }

  return (
    <div>
      <div className={classNames("font-bold text-blue-400")}>USERS PAGE</div>
      <ul>
        {users.map(({ id, name }) => (
          <li key={id}>
            <Link className="link" href={`/users/${id}`}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default UsersPage;
