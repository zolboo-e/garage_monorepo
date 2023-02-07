//
import Link from "next/link";

//
import { client } from "@/lib/services/client";

const UserPage = async ({ params: { uid } }: { params: { uid: string } }) => {
  const { status, body: user } = await client.users.getUser({
    params: {
      id: uid,
    },
  });
  if (status !== 200) {
    return null;
  }

  return (
    <div>
      <Link href="/users">To users page</Link>
      <div>{`USER PAGE`}</div>
      <div>{`ID: ${user.id}`}</div>
      <div>{`NAME: ${user.name}`}</div>
    </div>
  );
};
export default UserPage;
