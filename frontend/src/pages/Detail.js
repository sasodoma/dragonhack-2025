import { useParams, Link } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();

  return (
    <div className="p-4 max-w-md mx-auto">
      <Link to="/" className="text-blue-500 underline mb-4 block">&larr; Back</Link>
      <h1 className="text-2xl font-bold">Card {id}</h1>
      <p className="mt-2 text-gray-700">Details about card {id} go here.</p>
    </div>
  );
}
