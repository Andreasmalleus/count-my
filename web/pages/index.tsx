import Link from "next/link";
import { Layout } from "../components/Layout";

const Home = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col text-center">
          <p className="text-5xl mb-4">
            Welcome to
            <span className="tracking-widest mx-3 underline text-slate-500">
              CountMy
            </span>
            !
          </p>
          <h2 className="text-xl mb-2">
            Upload files and see the magic happen.
          </h2>
          <p>
            Start by uploading your
            <span className="mx-1 text-slate-500">txt</span>
            files
            <span className="ml-1 text-blue-400 cursor-pointer font-black">
              <Link href={"/upload"}>here</Link>
            </span>
            ...
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
