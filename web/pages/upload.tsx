import { NextPage } from "next";
import { Layout } from "../components/Layout";
import Image from "next/image";
import { useReducer, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ErrorType } from "../types";
import { Loader } from "../components/Loader";
import { useUploadReducer } from "../hooks/useUploadReducer";

export interface ResponseType {
  error: string;
  payload: string;
}

const UploadPage: NextPage = () => {
  const fileSizeLimit = 104857600; //100MB

  const { state, dispatch } = useUploadReducer({
    error: "",
    selectedFile: null,
    isLoading: false,
    isCopied: false,
    identifier: "",
  });

  const { error, isCopied, isLoading, identifier, selectedFile } = state;

  const onDrop = (files: File[]) => {
    const file: File = files[0];
    if (file.size >= fileSizeLimit) {
      dispatch({
        type: "ERROR",
        message: "File size can't be more than 100MB",
      });
    }
    if (file.type === "text/plain") {
      dispatch({ type: "FILE", payload: file });
      return;
    }
    dispatch({ type: "ERROR", message: "Only txt files are supported" });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "text/html": [".txt"],
    },
  });

  const handleSubmission = () => {
    if (!selectedFile) {
      dispatch({ type: "ERROR", message: "Please select a file" });
      return;
    }
    uploadFile();
  };

  const toggleClipboard = () => {
    console.log(isCopied);
    if (isCopied) {
      navigator.clipboard.writeText("");
      dispatch({ type: "COPY" });
      return;
    }
    navigator.clipboard.writeText(identifier);
    dispatch({ type: "COPY" });
  };

  const uploadFile = async () => {
    dispatch({ type: "LOADING" });
    const formData = new FormData();
    formData.append("file", selectedFile!);
    fetch(
      `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}/upload`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data: ResponseType) => {
        if (data.error) {
          dispatch({ type: "ERROR", message: data.error });
          return;
        }
        dispatch({ type: "SUCCESS", payload: data.payload });
        return;
      })
      .catch(({ message }: Error) => {
        dispatch({ type: "ERROR", message });
      });
  };

  const ChosenFilesMenu = (file: File) => (
    <div
      className="bg-white rounded-md p-2 shadow-md mt-2 w-full"
      key={file.name}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src={"/icons/document.svg"}
            width={20}
            height={20}
            alt={"Icon that looks like a document"}
          />
          <div className="ml-1 text-xs">{file.name}</div>
          <div className="ml-1 text-xs">{Math.round(file.size)}</div>
        </div>
        <Image
          src={"/icons/close.svg"}
          alt={"Icon that with x marked in it"}
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={() => {
            dispatch({ type: "FILE", payload: null });
          }}
        />
      </div>
    </div>
  );

  return (
    <Layout>
      <section className="flex flex-col justify-center items-center w-full h-full">
        <div className="w-1/2 h-1/2">
          <div
            {...getRootProps()}
            className="bg-white rounded-md flex flex-col items-center justify-center shadow-md cursor-pointer h-5/6"
          >
            <input {...getInputProps()} />
            <div className="text-xs text-center">
              <p>
                <span className="text-blue-400 mx-1">Drag</span>&apos;n&apos;
                <span className="text-blue-400 mx-1">drop</span>some text files
                here,
              </p>
              <p>or </p>
              <p>
                <span className="mx-1 text-blue-400">click</span>
                on the box to select files.
              </p>
            </div>
          </div>
          <aside className="flex flex-col items-start h-1/6">
            {/*List the uploaded files*/}
            {selectedFile ? ChosenFilesMenu(selectedFile) : null}
            <button onClick={handleSubmission} className="btn-primary my-2">
              Upload your file
            </button>
            {/*Show errors*/}
            {error ? <div className="text-xs text-red-400">{error}</div> : null}
            {/*Show identifier if the upload was successful*/}
            {isLoading ? <Loader /> : null}
            {!identifier ? null : (
              <div className="flex justify-center w-full mt-4">
                <div className="bg-white text-xs p-2 rounded-md shadow-md flex items-center">
                  <p>Your identifier: </p>
                  <span className="font-bold mx-1">{identifier}</span>
                </div>
                <button
                  className="ml-1 rounded-md bg-white shadow-md px-2 flex justify-center items-center"
                  style={{
                    backgroundColor: isCopied ? "rgb(96 165 250)" : "white",
                  }}
                  onClick={() => toggleClipboard()}
                >
                  <Image
                    src={"/icons/clipboard.svg"}
                    width={15}
                    height={15}
                    alt={"Clipboard icon"}
                  />
                </button>
              </div>
            )}
          </aside>
        </div>
      </section>
    </Layout>
  );
};

export default UploadPage;
