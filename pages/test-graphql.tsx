import type { GetStaticProps, NextPage } from 'next';
import styles from 'styles/Home.module.css';
import { withUrqlClient, initUrqlClient, SSRData } from 'next-urql';
import { ssrExchange, useQuery } from 'urql';
import { USER_QUERY } from 'graphql/query/userQuery';
import getUrqlClientOptions from 'lib/urql/getUrqlClientOptions';
interface PageProps {
  urqlState: SSRData;
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const ssrCache = ssrExchange({ isClient: false });
  const urqlClientOption = getUrqlClientOptions(ssrCache);
  const client = initUrqlClient(urqlClientOption, false);

  const result = await client?.query(USER_QUERY).toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
    revalidate: 600,
  };
};

const TestGraphql: NextPage<PageProps> = (props) => {
  const [result] = useQuery({ query: USER_QUERY });
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Graphql Tester</h1>
      <div className={styles.grid}>
        <div className="graphql-container">
          <button className={styles.card} type="button">
            try fetch
          </button>
          <div className="grapql-result">
            <p className={styles.code}>{JSON.stringify(result.data)}</p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .graphql-testing-container {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          align-items: flex-start;
        }
        .graphql-testing-container > div {
          width: 100%;
          border-color: black;
        }
        button.${styles.card} {
          cursor: pointer;
          background: transparent;
        }
        button.${styles.card}:active {
          border-color: lightblue;
          color: lightblue;
        }
      `}</style>
    </div>
  );
};

export default withUrqlClient(getUrqlClientOptions, {
  neverSuspend: true, // don't use Suspend on server side
  ssr: false, // don't generate getInitialProps for the page
  staleWhileRevalidate: true, // tell client to do network-only data fetching again if the cached data is outdated
})(TestGraphql);
