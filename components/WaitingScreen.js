import { MusicNoteIcon } from "@heroicons/react/solid";

function WaitingScreen() {
  return (
    <section className="h-screen w-screen relative top-0 left-0 right-0 bottom-0 z-50 bg-gray-900 bg-hero-endless-clouds flex justify-center items-center">
      <div className="absolute top-10 left-10 right-10 bottom-10 full items-center border-4 border-red-50">
        <p className="h-full w-full flex justify-center items-center text-gray-200 text-2xl border-4">
          <MusicNoteIcon className="max-h-6 mr-1 text-white animate-pulse" />
          Chargement...
        </p>
      </div>
    </section>
  )
}

export default WaitingScreen;
