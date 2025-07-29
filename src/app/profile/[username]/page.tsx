import {
  getProfileByUsername,
  getUserPosts,
  getUserLikedPosts,
  isFollowing,
} from "@/actions/profileAction";
import { notFound } from "next/navigation";
import ProfileFetch from "./ProfileFetch";

type ProfilePageProps = {
  params: {
    username: string;
  };
};

export const generateMetadata = async ({
  params,
}: ProfilePageProps) => {
  const user = await getProfileByUsername(params.username);
  if (!user) return;
  return {
    title: `${user.name ?? user.username}`,
    description: user.bio || `Check out ${user.username}'s profile.`,
  };
};

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const user = await getProfileByUsername(params.username);
  if (!user) notFound();

  const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(user.id),
    getUserLikedPosts(user.id),
    isFollowing(user.id),
  ]);

  return (
    <ProfileFetch
      user={user}
      posts={posts}
      likedPosts={likedPosts}
      isFollowing={isCurrentUserFollowing}
    />
  );
};

export default ProfilePage;
