import { PropsWithChildren } from "react";
import { Navbar } from "./Navbar";

export const Layout: React.FC<PropsWithChildren> = ({
  children,
}): JSX.Element => {
  return (
    <div className="h-full">
      <Navbar />
      <main className="m-auto max-w-5xl max-h-full h-full">{children}</main>
    </div>
  );
};
