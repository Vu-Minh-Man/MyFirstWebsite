import Head from "next/head";

import styles from "../../styles/Home.module.css";

function Layout(props) {
  const { children, title } = props;
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <main>{children}</main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

export default Layout;
