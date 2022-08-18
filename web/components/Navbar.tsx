import Link from "next/link";

//TODO navbar broken please fix :()
export const Navbar = () => {
  return (
    <header className="bg-white h-full fixed w-full top-0 shadow-md max-h-12">
      <nav className="flex items-center max-w-5xl h-full justify-start m-auto">
        <Link href={"/"}>
          <h1 className="text-xl tracking-widest underline mr-4 cursor-pointer">
            CountMy
          </h1>
        </Link>
        <div className="text-sm">
          <Link href="/upload">
            <a className="ml-2 mr-2">Upload</a>
          </Link>
          <Link href="/result">
            <a className="ml-2">Result</a>
          </Link>
        </div>
      </nav>
    </header>
  );
};
/*
const Header = styled.header`
  background-color: rgb(255, 255, 255);
  max-height: 60px;
  height: 100%;
  position: sticky;
  top: 0;
  box-shadow: 0 -6px 10px 5px rgba(0, 0, 0, 0.2);
`;

const Nav = styled.nav`
  height: 100%;
  max-width: 70%;
  padding-top: 10px;
  padding-bottom: 10px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: start;
`;

*/
