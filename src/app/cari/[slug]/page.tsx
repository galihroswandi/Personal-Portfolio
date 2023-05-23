import { Suspense } from "react";
import RepoList from "./sectionRepository";

const getDataUser = async (slug: string) => {
  const res = await fetch(`https://api.github.com/users/${slug}`);
  return res.json();
};

// !PARAREL & SEQUENTIL DATA FETCHING

// const getDataRepos = async (slug: string) => {
//   const res = await fetch(`https://api.github.com/users/${slug}/repos`);

//   await new Promise((r) => setTimeout(r, 3000));

//   return res.json();
// };

// interface Props {
//   slug: string;
// }

// const RepoList = async ({ slug }: Props) => {
//   const dataRepos = await getDataRepos(slug);
//   return (
//     <>
//       <p className="mt-5 text-lg text-pink-500">Repository</p>
//       <p>{JSON.stringify(dataRepos)}</p>
//     </>
//   );
// };

const DetailCari = async ({ params }: { params: { slug: string } }) => {
  const dataUser = await getDataUser(params.slug);
  // const dataRepos = getDataRepos(params.slug);

  // Pararel data fetching
  // const [user, repos] = await Promise.all([dataUser, dataRepos]);

  return (
    <div className="min-h-screen w-full">
      <div className="mt-10 ml-10">
        <p className="text-xl text-slate-900 font-medium">
          Detail user : {params.slug}
        </p>
        <p>{JSON.stringify(dataUser)}</p>
        {/* <p>{JSON.stringify(user)}</p> */}

        <div className="mt-10">
          {/* <p className="mt-5 text-lg text-pink-500">Repository</p>
          <p>{JSON.stringify(repos)}</p> */}

          {/* !SEQUENTIL DATA Fetching */}
          <Suspense fallback={<>Sedang mengambil data...</>}>
            {/* @ts-ignore */}
            <RepoList slug={params.slug} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default DetailCari;
