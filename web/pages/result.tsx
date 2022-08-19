import { NextPage } from "next";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { Table } from "../components/Table";
import ReactWordcloud from "react-wordcloud";
import { ErrorType } from "../types";
import { WordCloud } from "../components/WordCloud";
import ClipLoader from "react-spinners/ClipLoader";
import { Loader } from "../components/Loader";
import { useResultReducer } from "../hooks/useResultReducer";

interface GetResponse {
  error: string;
  payload: {
    data: string;
    id: number;
    identifier: string;
  };
}

interface DeleteResponse {
  error: string;
  payload: boolean;
}

interface WordCloudTags {
  text: string;
  value: number;
}

type DataType = Record<string, number>;

const ResultPage: NextPage = () => {
  const { state, dispatch } = useResultReducer({
    data: null,
    identifier: "",
    filters: "",
    error: "",
    isLoading: false,
  });

  const { data, identifier, filters, error, isLoading } = state;

  const fetchData = () => {
    dispatch({ type: "LOADING" });
    fetch(
      `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}/data?` +
        new URLSearchParams({
          identifier,
        })
    )
      .then((res) => res.json())
      .then((data: GetResponse) => {
        if (data.error) {
          dispatch({ type: "ERROR", message: data.error });
          return;
        }
        dispatch({ type: "SUCCESS", payload: JSON.parse(data.payload.data) });
        return;
      })
      .catch(({ message }: Error) => dispatch({ type: "ERROR", message }));
  };

  const deleteEntry = () => {
    fetch(
      `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}/data?` +
        new URLSearchParams({
          identifier,
        }),
      { method: "DELETE" }
    )
      .then((res) => res.json())
      .then((data: DeleteResponse) => {
        if (data.error) {
          dispatch({ type: "ERROR", message: data.error });
          return;
        }
        dispatch({ type: "RESET" });
      })
      .catch(({ message }) => dispatch({ type: "ERROR", message }));
  };

  const convertToList = (data: DataType): WordCloudTags[] =>
    Object.keys(data).map((key) => ({ text: key, value: data[key] }));

  return (
    <Layout>
      <div className="w-full h-full flex flex-col justify-center items-center">
        {!data ? (
          <div className="flex flex-col w-1/2">
            <label className="text-xs text-left mb-2">
              Enter your identifier
            </label>
            <input
              type="text"
              className="w-full p-2 rounded-md placeholder:text-xs text-xs shadow-md"
              placeholder="identifier"
              value={identifier}
              onChange={(e) =>
                dispatch({ type: "IDENTIFIER", payload: e.target.value })
              }
            />
            <button
              className="btn-primary w-fit mt-2"
              onClick={() => fetchData()}
            >
              Fetch
            </button>
            {isLoading ? <Loader /> : null}
            {error ? (
              <div className="text-xs text-red-400 mt-2">{error}</div>
            ) : null}
          </div>
        ) : (
          <div className="flex flex-col justify-center">
            <div className="flex items-center w-full">
              <div className="w-full">
                <WordCloud
                  data={convertToList(data).filter(
                    ({ text }) => !filters.split(",").includes(text)
                  )}
                />
              </div>
              <div className="w-1/4">
                <label htmlFor="" className="text-xs">
                  Add filters (comma delimeted)
                </label>
                <input
                  type="text"
                  className="bg-white rounded-md mb-2 p-1 flex flex-col text-xs shadow-md w-full"
                  onChange={(e) =>
                    dispatch({ type: "FILTERS", payload: e.target.value })
                  }
                  placeholder={"my,name,is"}
                />
                <Table data={data} filters={filters} />
                <div className="flex items-center mt-2 justify-between">
                  <a
                    className="btn-primary"
                    type="button"
                    href={`data:text/json;charset=utf-8,${encodeURIComponent(
                      JSON.stringify({ word_counts: data }, null, 4)
                    )}`}
                    download="word-counts.json"
                  >
                    Download JSON
                  </a>
                  <button className="btn-primary" onClick={() => deleteEntry()}>
                    Delete result
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ResultPage;
