import Image from "next/image";
import GetHeaderTitle from "./GetHeaderTitle";
import { IoIosNotificationsOutline } from "react-icons/io";

function Header() {
  return (
    <header className="sticky top-0 z-40  bg-[#ffffff] px-4 h-16 flex items-center justify-between">
      {/* <div className="md:hidden w-6" /> */}
      {/* Spacer for mobile */}
      <div className="flex items-center gap-2 pl-12 lg:pl-0">
        <h1 className="text-lg font-semibold">
          <GetHeaderTitle />
        </h1>
      </div>
      <div className="flex items-center">
        <div className="flex gap-5 items-center ">
          {/* <div className="text-sm text-right">
            <div className="font-medium">Tailor Coter</div>
            <div className="text-muted-foreground text-xs">Customer Service</div>
          </div> */}
          <div className="relative">
            <IoIosNotificationsOutline className="h-10 w-10 text-[#817f9b]" />
            <span className="absolute top-1.5 right-1.5 bg-primary text-white rounded-full w-3 h-3 flex items-center justify-center text-xs"></span>
          </div>
          <Image
            height={40}
            width={40}
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Super%20Admin-czj6ar9X0anuBDtJzwPc2tK6yWKJcE.png"
            alt="Profile"
            className="h-8 w-8 rounded-full"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
