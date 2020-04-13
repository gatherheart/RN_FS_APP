import React from "react";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";

const QUERY = gql`
  {
    allUsers {
      id
    }
  }
`;
function NoteList() {
  const { loading, error, data } = useQuery(QUERY);
  if (loading) console.log(loading);
  if (error) console.log(error);
  console.log(data);
  return <></>;
}

export default NoteList;
