import {
  getProfileByUsername,
  getUserPosts,
  getUserLikedPosts,
  isFollowing,
} from "@/actions/profileAction";
import { notFound } from "next/navigation";
import ProfileFetch from "./ProfileFetch";

type ParamsType = Promise<{ username: string }>;

export const generateMetadata = async ({ params }: { params: ParamsType }) => {
  const { username } = await params;
  const user = await getProfileByUsername(username);
  if (!user) return;
  return {
    title: `${user.name} (@${user.username}) - Profile`,
    description: `Profile of ${user.name}, a user on our platform.`,
  };
};

const ProfilePage = async ({ params }: { params: ParamsType }) => {
  const { username } = await params;
  const user = await getProfileByUsername(username);
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
