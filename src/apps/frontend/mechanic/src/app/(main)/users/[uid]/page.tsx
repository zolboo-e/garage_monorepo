//
import Link from "next/link";
import { classNames } from "utilities";

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
      <Link className="link" href="/users">
        To users page
      </Link>
      <div className={classNames("font-bold text-blue-400")}>{`USER PAGE`}</div>
      <div>{`ID: ${user.id}`}</div>
      <div>{`NAME: ${user.name}`}</div>
    </div>
  );
};
export default UserPage;
