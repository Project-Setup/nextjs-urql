import { devtoolsExchange } from '@urql/devtools';
import { cacheExchange } from '@urql/exchange-graphcache';
import { NextUrqlClientConfig } from 'next-urql';
import { debugExchange, dedupExchange, fetchExchange } from 'urql';
import getIsClient from 'lib/utils/getIsClient';

const getUrqlClientOptions: NextUrqlClientConfig = (ssrCache) => {
  const isClient = getIsClient();
  const isProd = process.env.NEXT_PUBLIC_ENV === 'production';
  return {
    url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || '',
    exchanges: [
      ...(isClient && !isProd ? [devtoolsExchange, debugExchange] : []),
      dedupExchange,
      cacheExchange({}),
      ssrCache, // ssrExchange has to come before fetchExchange
      fetchExchange,
    ],
  };
};

export default getUrqlClientOptions;
