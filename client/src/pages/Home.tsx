import React, { useEffect } from "react";
import { useNotesQuery } from "../generated/graphql";
export const Home: React.FC<{}> = () => {
  // const [{ data }] = useNotesQuery();
  return (
    <div className="h-24 min-h-full mt-4">
      <h1 className="min-h-full font-body align-center text-4xl text-center">
        Take My Notes
      </h1>
      {/* {!data ? (
        <div>loading...</div>
      ) : (
        data.notes.map((p: any) => <div key={p.id}>{p.title}</div>)
      )} */}
    </div>
  );
};
