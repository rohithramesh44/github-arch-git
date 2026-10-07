import React from "react";

function UserCard({ user }) {
  return (
    <div className="flex justify-center">
      <div className="flex items-center justify-between gap-4 bg-gray-200  p-4 w-1/3 rounded-md">
        <div className="flex gap-4 items-center">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-16 h-16 rounded-full"
          />
          <h1 className="text-black min-w-40 max-w-50 capitalize font-semibold">
            {user.login}
          </h1>
        </div>
        <a href="/" className="py-2 px-4 bg-green-600 text-white rounded-md">
          View Profile
        </a>
      </div>
    </div>
  );
}

export default UserCard;
