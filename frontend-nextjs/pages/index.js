import Head from 'next/head';
import Layout from '../components/layout';
import NoteList from '../components/note-list';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Full Stack Dev Note</title>
                <meta name="description" content="Full Stack Dev Note" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <NoteList />
            </Layout>
        </div>
    )
}