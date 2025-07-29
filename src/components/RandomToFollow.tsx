import { getRandomUsers } from "@/actions/userAction"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import ButtonFollow from "./ButtonFollow";


const RandomToFollow = async () => {
  const users = await getRandomUsers()
  if (!users || users.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Follow For New Friends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex gap-2 items-center justify-between "
            >
              <div className="flex items-center gap-1">
                <Link href={`/profile/${user.username}`}>
                  <Avatar>
                    <AvatarImage
                      src={
                        user.image ??
                        `https://ui-avatars.com/api/?name=${user.name}&background=random`
                      }
                    />
                  </Avatar>
                </Link>
                <div className="text-xs">
                  <Link
                    href={`/profile/${user.username}`}
                    className="font-medium cursor-pointer"
                  >
                    {user.name}
                  </Link>
                  <p className="text-muted-foreground">@{user.username}</p>
                  <p className="text-muted-foreground">
                    {user._count.followers} followers
                  </p>
                </div>
              </div>
              <ButtonFollow userId={user.id} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default RandomToFollow