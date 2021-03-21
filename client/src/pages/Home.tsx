import React from "react";
import { NormalLink } from "../components/NormalLink";
import { Spinner } from "../components/Spinner";
import { useNotesQuery } from "../generated/graphql";
export const Home: React.FC<{}> = () => {
  const { data } = useNotesQuery({ fetchPolicy: "network-only" });

  return (
    <div className="h-24 min-h-full mt-4">
      <h1 className="min-h-full font-body align-center text-4xl text-center">
        Take My Notes
      </h1>
      {!data ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-xl">
            <NormalLink to="/notes">Create a note</NormalLink>
          </h1>
          {data.notes &&
            data.notes.map((i) => (
              <>
                <div className="shadow p-4 bg-white mt-4 mb-4  max-w-lg w-full">
                  <div className="text-left">
                    <h3 className="mb-2 text-gray-700">Title: {i.title}</h3>
                    <p className="text-grey-600 text-sm">Body: {i.text}</p>
                  </div>
                  ​
                  <div className="mt-4">
                    <button className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded">
                      Delete note
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded ml-4">
                      Edit note
                    </button>
                  </div>
                </div>
              </>
            ))}
        </div>
      )}
    </div>
  );
};
