import { useRouter } from "next/router";

function Button({ onClick, value, href }) {
  const router = useRouter();

  return (
    <input
      type="button"
      value={value}
      onClick={href ? () => router.push(href) : onClick}
      className="text-white w-20 text-center text-xs bg-pink-500 rounded-lg px-2 py-2 cursor-pointer transition-all transform bg-gradient-to-b border border-pink-500 from-pink-500 to-pink-500 hover:from-pink-500 hover:to-pink-600"
    />
  );
}

export default Button;
