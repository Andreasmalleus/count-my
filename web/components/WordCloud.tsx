import ReactWordcloud from "react-wordcloud";

export const WordCloud = ({ data }: any): JSX.Element => {
  return (
    <ReactWordcloud
      words={data}
      options={{ fontSizes: [10, 40], rotations: 1, rotationAngles: [0, 0] }}
      maxWords={100}
    />
  );
};
