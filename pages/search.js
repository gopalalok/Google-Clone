import Head from 'next/head'
import React from 'react'
import Header from '../components/Header'
import { API_KEY, CONTEXT_KEY } from '../keys'
import Response from '../Response';
import { useRouter } from 'next/dist/client/router';
import SearchResults from '../components/SearchResults';
import Footer from '../components/Footer';


const search = ({ results }) => {

    const router = useRouter();
    console.log(results)
    return (
        <>
            <Head>
                <title>{router.query.term} - Search Results</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <SearchResults results={results} />
            <Footer />
        </>
        
    )
}

export default search


export async function getServerSideProps(context){
    const useDummyData = false;
    const startIndex = context.query.start||"0";  

    const data = useDummyData? Response : await fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${context.query.term}&start=${startIndex}`
    ).then((res)=>res.json());

    return{
        props:{
            results:data,
            
        },
    };
}