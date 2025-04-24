import UserCard from "@/components/cards/UserCard";
import DataRenderer from "@/components/DataRenderer";
import LocalSearch from "@/components/search/LocalSearch";
import ROUTES from "@/constants/routes";
import { EMPTY_USERS } from "@/constants/states";
import { getUsers } from "@/lib/actions/user.action";
import React from "react";

const Community = async ({ searchParams }: RouteParams) => {
  const { page, pageSize, filter, query } = await searchParams;

  const { success, data, error } = await getUsers({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    filter,
    query,
  });

  const { users } = data || {};
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mt-11">
        <LocalSearch
          route={ROUTES.COMMUNITY}
          // iconPosition="left"
          imgSrc="/icons/search.svg"
          placeholder="There are some great devs here"
          otherClasses="flex-1"
        />
      </div>

      <DataRenderer
        empty={EMPTY_USERS}
        success={success}
        error={error}
        data={users}
        render={(users) => (
          <div className="mt-12 flex flex-wrap gap-5">
            {users.map((user, i) => (
              <UserCard key={user._id} {...user} />
            ))}
          </div>
        )}
      />
    </div>
  );
};

export default Community;
