import React from "react";
import Quiz from "@/components/quiz";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className="bg-muted min-h-screen">
      <Quiz />
    </div>
  );
};

export default HomePage;
