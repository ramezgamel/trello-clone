export default function Error({ error }: { error?: string | undefined }) {
  return (
    <div className="flex  bg-red-500 my-auto text-white py-3 rounded-md flex-col items-center justify-center w-full h-full ">
      <h2>Some thing went wrong😒</h2>
      {error && <p>{error}</p>}
    </div>
  );
}
