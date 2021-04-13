import { ChevronLeftIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

function Title({ title, back }) {
  const router = useRouter();

  return (
    <div className="flex max-w-7xl mx-auto items-center text-white">
      {back && <ChevronLeftIcon className="h-7 cursor-pointer transition-all transform translate-x-0 hover:-translate-x-1" onClick={() => router.back()} />}
      <h3 className="text-lg text-lef">
        {title}
      </h3>
    </div>
  );
}

export default Title;
