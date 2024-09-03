import React from "react";
import Quiz from "@/components/quiz";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className="bg-muted">
      <Quiz />
    </div>
  );
};

export default HomePage;
