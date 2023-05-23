import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Props {
  query: string;
}

const SectionResult = ({ query }: Props) => {
  const { data, error, isLoading } = useSWR(
    `https://api.github.com/search/users?q=${query}`,
    fetcher
  );
  return (
    <div className="min-h-screen ml-10 mt-5">
      <h1 className="text-2xl">
        Hasil pencarian: <span className="text-indigo-600">{query}</span>
      </h1>
      <div className="max-w-full ml-10 mt-5">
        {isLoading && "Tunggu Sebentar..."}
        <p className="text-pink-600">{error && `${error}`}</p>
        {data &&
          data.items.map((user: any, index: number) => {
            return (
              <ul key={index} className="list-disc mb-5">
                <li>
                  <Link
                    href={`/cari/${user.login}`}
                    className="text-indigo-700 underline hover:decoration-2 transition-all"
                  >
                    {user.login}
                  </Link>
                </li>
                <li>
                  <Link
                    href={user.repos_url}
                    className="text-pink-600 underline hover:decoration-2 transition-all"
                  >
                    Repository
                  </Link>
                </li>
              </ul>
            );
          })}
      </div>
    </div>
  );
};

export default SectionResult;
