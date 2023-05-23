const getData = async (slug: string) => {
  const res = await fetch(`https://api.github.com/users/galihroswandi`);
  return res.json();
};

const DetailCari = async ({ params }: { params: { slug: string } }) => {
  const data = await getData(params.slug);
  return (
    <div className="min-h-screen">
      <div className="mt-10 ml-10">
        <p className="text-xl text-slate-900 font-medium">
          Detail user : {params.slug}
        </p>
        <p>{JSON.stringify(data)}</p>
      </div>
    </div>
  );
};

export default DetailCari;
