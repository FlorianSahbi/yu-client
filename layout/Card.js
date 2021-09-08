import Link from "next/link";

function Card({
  id, title, subtitle, thumbnail, color = "blue", loading,
}) {
  if (loading) {
    return (
      <div className="h-64 shadow-lg">
        <div className="w-full h-full bg-gray-500 animate-pulse" />
      </div>
    );
  }

  return (
    <Link href={`/${subtitle}/${id}`}>
      <div className="rounded-lg relative cursor-pointer h-64 shadow-lg">
        <img
          src={thumbnail}
          alt="me"
          className="w-full h-full object-cover object-center rounded-lg"
        />
        <div className="truncate w-10/12 absolute bottom-0 right-0 mb-1 mr-1">
          <p className={`pl-4 pr-2 via-${color}-500 from-${color}-500 bg-gradient-to-l capitalize text-white text-right text-xs`}>
            {subtitle}
          </p>
          <p className="truncate text-xs pl-4 pr-2 via-black from-black bg-gradient-to-l capitalize text-white text-right sm:text-base">
            {title}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Card;
