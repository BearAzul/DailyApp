import {
  getProfileByUsername,
  getUserPosts,
  getUserLikedPosts,
  isFollowing,
} from "@/actions/profileAction";
import { notFound } from "next/navigation";
import ProfileFetch from "./ProfileFetch";


const ProfilePage = async ({ params }: { params: { username: string }}) => {
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
