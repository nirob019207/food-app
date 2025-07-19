import Footer from "@/components/nav/Footer";
import Header from "@/components/nav/Header";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <Header/>
      <main>{children}</main>
      <Footer/>
    </>
  );
};

export default CommonLayout;
