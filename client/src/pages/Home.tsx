import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { NormalLink } from "../components/NormalLink";
import { Spinner } from "../components/Spinner";
import { Wrapper } from "../components/Wrapper";
import { useNotesQuery } from "../generated/graphql";
export const Home: React.FC<{}> = () => {
  const { data } = useNotesQuery({ fetchPolicy: 'network-only' });

  return (
    <div className="h-24 min-h-full mt-4">
      <h1 className="min-h-full font-body align-center text-4xl text-center">
        Take My Notes
      </h1>
      {!data ? (
        <Spinner />
      ) : (
        <Wrapper>
          <h1 className="text-xl">
            <NormalLink to="/notes">Create a note</NormalLink>
          </h1>
          {data.notes &&
            data.notes.map((i) => (
              <>
                <div>title: {i.title}</div>
                <div>text: {i.text}</div>
                <hr />
                <br />
              </>
            ))}
        </Wrapper>
      )}
    </div>
  );
};
