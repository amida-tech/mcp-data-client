import React from "react";
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

// mock facts to be used to generate rating.
const facts = [
  {
    identifier: "identifier-1",
    value: "value-1"
  }
];

const GET_RATING = gql`
  query GetRatings($facts: [Fact]!) {
    rating(facts: $facts) {
      value
    }
  }
`;

const RatingPage: React.FC = () => {
  const { error, data, refetch } = useQuery(GET_RATING, {
    variables: { facts }
  });
  // todo: we can consider using useLazyQuery if we don't want it to query on render
  // const [getRatings, { data, error, loading }] = useLazyQuery(GET_RATING, { variables: { facts } });
  // use refetch in order to call API every time. useQuery will return cached value by default
  if (error) return <p>{"Error :("}</p>;
  return (
    <div className="rating-page">
      <header className="rating-page__header">
        <button onClick={() => refetch()}>{"Fetch Rating"}</button>
        <div>{`The rating value is: ${data && data.rating.value}`}</div>
        <div>
          <Link to={"/app"}>
            {"Go to back to Home Page"}
          </Link>
        </div>
      </header>
    </div>
  );
};

export default RatingPage;
