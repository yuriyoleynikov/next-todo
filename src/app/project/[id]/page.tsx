"use client"

import StoreContext from "@/app/StoreContext";
import { myStore } from "@/app/store";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useContext } from "react"

const Page = observer(({ params }: { params: { id: string } }) => {
    const store = useContext(StoreContext)
    console.log(store)
    return <StoreContext.Provider value={myStore}>
        <>
            <Link href={`/`}>Home</Link>
            <div>Projects Id: {params.id}</div>
            <div>store - {store?.projects.length}</div>
            <div>{store?.projects.find(project => project.id.toString() == params.id)?.name}</div>
        </>

    </StoreContext.Provider>
})

export default Page