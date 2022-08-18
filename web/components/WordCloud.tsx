import ReactWordcloud from "react-wordcloud";

export const WordCloud = ({ data }: any): JSX.Element => {
  return (
    <ReactWordcloud
      words={data}
      options={{ fontSizes: [10, 40] }}
      maxWords={100}
    />
  );
};
