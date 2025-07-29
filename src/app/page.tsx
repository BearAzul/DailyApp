import { getPosts } from "@/actions/postAction";
import { getDbUserId } from "@/actions/userAction";
import CreatePost from "@/components/CreatePost";
import CardPosts from "@/components/CardPosts";
import RandomToFollow from "@/components/RandomToFollow";
import { currentUser } from "@clerk/nextjs/server";

const Home = async () => {
  const user = await currentUser();
  const posts = await getPosts();
  const dbUserId = await getDbUserId();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        {user ? <CreatePost /> : null}
        <div className="space-y-6">
          {posts.map((post) => (
            <CardPosts key={post.id} post={post} dbUserId={dbUserId}  />
          ))}
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        <RandomToFollow />
      </div>
    </div>
  );
};
export default Home;
