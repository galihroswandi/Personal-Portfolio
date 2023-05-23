const getDataRepos = async (slug: string) => {
  const res = await fetch(`https://api.github.com/users/${slug}/repos`);

  await new Promise((r) => setTimeout(r, 3000));

  return res.json();
};

interface Props {
  slug: string;
}

const RepoList = async ({ slug }: Props) => {
  const dataRepos = await getDataRepos(slug);
  return (
    <>
      <p className="mt-5 text-lg text-pink-500">Repository</p>
      <p>{JSON.stringify(dataRepos)}</p>
    </>
  );
};

export default RepoList;
