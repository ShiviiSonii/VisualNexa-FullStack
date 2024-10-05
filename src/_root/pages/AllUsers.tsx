import { useToast } from "@/components/ui/use-toast";
import { Loader, UserCard } from "@/components/shared";
import { useGetUsers } from "@/lib/react-query/queries";

const AllUsers = () => {
  const { toast } = useToast();

  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();

  if (isErrorCreators) {
    toast({ title: "Something went wrong." });
    
    return;
  }

  return (
    <div className="common-container">
      <div className="user-container">
        {/* <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2> */}
        <div className="flex gap-2 w-full max-w-5xl">
          {/* Save icon */}
          <img
            src="/assets/icons/people.svg"
            width={36}
            height={36}
            alt="users"
            className="invert-white"
          />
          {/* Title */}
          <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        </div>
        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full  ">
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
