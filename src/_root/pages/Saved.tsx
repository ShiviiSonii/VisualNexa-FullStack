import { Models } from "appwrite";

import { GridPostList, Loader } from "@/components/shared";
import { useGetCurrentUser } from "@/lib/react-query/queries";

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();

  const savePosts = currentUser?.save
    .map((savePost: Models.Document) => ({
      ...savePost.post,
      creator: {
        imageUrl: currentUser.imageUrl,
      },
    }))
    .reverse();

    return (
      <div className="saved-container">
        {/* Title */}
        <div className="flex gap-2 w-full max-w-5xl">
          {/* Save icon */}
          <img
            src="/assets/icons/save.svg"
            width={36}
            height={36}
            alt="edit"
            className="invert-white"
          />
          {/* Title */}
          <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
        </div>
     
        {/* Loader or Saved Posts List */}
        {!currentUser ? (
          <Loader /> // Show loader if currentUser is not available
        ) : (
          <ul className="w-full flex justify-center max-w-5xl gap-9">
            {/* Show message if no posts available, otherwise show GridPostList */}
            {savePosts.length === 0 ? (
              <p className="text-dark-4">No available posts</p>
            ) : (
              <GridPostList posts={savePosts} showStats={false} />
            )}
          </ul>
        )}
      </div>
    );
    
    
};

export default Saved;
