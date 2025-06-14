export default function Loader() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-[13.6px] h-8 bg-[#076fe5] animate-loaderWave" style={{ animationDelay: '0s' }}></div>
      <div className="w-[13.6px] h-8 bg-[#076fe5] animate-loaderWave" style={{ animationDelay: '0.27s' }}></div>
      <div className="w-[13.6px] h-8 bg-[#076fe5] animate-loaderWave" style={{ animationDelay: '0.54s' }}></div>
    </div>
  );
}
