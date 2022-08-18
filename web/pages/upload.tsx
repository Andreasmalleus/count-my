import { NextPage } from "next";
import { Layout } from "../components/Layout";
import Image from "next/image";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { ErrorType } from "../types";
import ClipLoader from "react-spinners/ClipLoader";

export interface ResponseType {
  error: string;
  payload: string;
}

const UploadPage: NextPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileSizeLimit = 104857600; //100MB
  const [error, setError] = useState<ErrorType | null>(null);
  const [identifier, setIdentifer] = useState<String>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onDrop = (files: File[]) => {
    const file: File = files[0];
    if (file.size >= fileSizeLimit) {
      setError({ message: "File size can't be more than 100MB" });
    }
    if (file.type === "text/plain") {
      setSelectedFile(file);
      return;
    }
    setError({ message: "Only txt files are supported" });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "text/html": [".txt"],
    },
  });

  const handleSubmission = () => {
    if (!selectedFile) {
      setError({ message: "Please select a file" });
      return;
    }
    uploadFile();
  };

  const uploadFile = async () => {
    setIsLoading(true);
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
          setError({ message: data.error });
          setIsLoading(false);
          return;
        }
        setIsLoading(false);
        setIdentifer(data.payload);
        setSelectedFile(null);
        return;
      })
      .catch((e: Error) => {
        setError({ message: e.message });
        setIsLoading(false);
        return;
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
            setSelectedFile(null);
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
            {error ? (
              <div className="text-xs text-red-400">{error?.message}</div>
            ) : null}
            {/*Show identifier if the upload was successful*/}
            {isLoading ? (
              <div className="flex justify-center w-full mt-4">
                <div className="bg-white text-xs p-2 rounded-md shadow-md flex items-center">
                  <div className="mr-1">Loading...</div>
                  <ClipLoader size={12} />
                </div>
              </div>
            ) : null}
            {!identifier ? null : (
              <div className="flex justify-center w-full mt-4">
                <div className="bg-white text-xs p-2 rounded-md shadow-md flex">
                  <p>Your identifier: </p>
                  <span className="font-bold mx-1">{identifier}</span>
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </Layout>
  );
};

export default UploadPage;
