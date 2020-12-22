import React from "react";
import SummaryPanel from "../components/Recipe/components/SummaryPanel";

export default {
  title: "SummaryPanel",
};

const data = {
  serves: "2 people",
  duration: {
    cook: "1 hour",
    prep: "30 minutes",
    rest: "5 minutes",
  },
};

export const Default = () => <SummaryPanel {...data} />;
