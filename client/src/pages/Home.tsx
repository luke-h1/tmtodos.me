import React from "react";
import { Wrapper } from "../components/Wrapper";
import { useNotesQuery } from "../generated/graphql";
export const Home: React.FC<{}> = () => {
  const { data } = useNotesQuery();
  return (
    <div className="h-24 min-h-full mt-4">
      <h1 className="min-h-full font-body align-center text-4xl text-center">
        Take My Notes
      </h1>
      {!data ? (
        <div>loading...</div>
      ) : (
        data.notes.map((p) => (
          <Wrapper>
            <div>title: {p.title}</div>
            <div>text: {p.text}</div>
            <hr />
            <br />
          </Wrapper>
        ))
      )}
    </div>
  );
};
