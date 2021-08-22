import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { ChevronLeftIcon } from '@heroicons/react/solid';
import { ChevronRightIcon } from '@heroicons/react/outline';
import Image from 'next/image';

function NameList(props) { 
    const router = useRouter(); 
    const myLists = props.pgarr;   
    return ( 
        <>  
            {
                myLists.map((pgnum) =>
                <Link href={`/search?term=${router.query.term}&start=${pgnum*10}`} >
                    <h3 className="ml-3 cursor-pointer hover:underline">{pgnum}</h3>
                </Link>  
                 
                )
            }
        </>
    );  
  }  

const PaginationButton = ({results}) => {

    const router = useRouter();
    const startIndex = Number(router.query.start)||0;
    var pgarr = [];
    var startPage = startIndex;
    const total_page = Math.floor(results.searchInformation?.totalResults/10);
    if(startIndex > total_page)
    {
        startPage = 0 
        for(var i=startPage;i<total_page;i++)
        {
            pgarr=[...pgarr,i+1];
        }
    }
    else
    {
        startPage = Math.floor(startIndex/10)
        for(var i=startPage;i<startPage+10;i++)
        {
            pgarr=[...pgarr,i+1];
        } 
    }
    
    return (
        <div className="flex flex-col">
            <div className="flex justify-between max-w-lg text-blue-700 mb-2">
                
                    
                        <div className="flex flex-grow items-center cursor-pointer hover:underline">
                            
                                {startIndex > 9 &&(
                                    <Link href={`/search?term=${router.query.term}&start=${startIndex-10}`} >
                                        <ChevronLeftIcon className="h-7"/>
                                    </Link>
                                )}
                            
                            <Image src="https://i.postimg.cc/sfG95svs/gooooogle.jpg" width={400} height={50} />
                            
                                {startIndex < total_page-9 &&(
                                    <Link href={`/search?term=${router.query.term}&start=${startIndex+10}`} >
                                        <ChevronRightIcon className="h-7"/>
                                    </Link>
                                )}
                            
                        </div>
                                                
            </div>
            <div className="flex flex-grow items-center text-blue-700">
                {startIndex > 9 &&(
                    <Link href={`/search?term=${router.query.term}&start=${startIndex-10}`} >
                    <p className="cursor-pointer hover:underline mr-7">Previous</p>
                    </Link>
                )}
                
                <NameList pgarr = {pgarr} />
                {startIndex < total_page-9 &&(
                    <Link href={`/search?term=${router.query.term}&start=${startIndex+10}`} >
                    <p className="cursor-pointer hover:underline ml-10">Next</p>
                    </Link>
                )}
                
            </div>
        </div>
        
    )
}

export default PaginationButton
