import useLanguage from "../hooks/useLanguage";

const HomePage = () => {
  const { isSuccess, data } = useLanguage();

  if (isSuccess) console.log(data);

  return <div>HomePage</div>;
};

export default HomePage;
