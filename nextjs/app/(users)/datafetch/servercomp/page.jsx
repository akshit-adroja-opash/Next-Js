import genderData from '../../../data/gender-data.json';

import ClientContent from './ClientContent.jsx';

const DataFetchServer = async ({ searchParams }) => {
  const params = await searchParams;
  let userName = params?.name || '';

  if (Array.isArray(userName)) {
    userName = userName[0];
  }

  return <ClientContent initialName={userName} />;
};

export default DataFetchServer;

