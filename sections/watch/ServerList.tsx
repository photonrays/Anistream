import { IEpisodeServer } from '@/services/consumet/types'
import React, { memo } from 'react'

interface ServerListProps {
    serverList?: IEpisodeServer[],
    handleChangeServer: any,
    server?: string
}

function ServerList({ serverList, handleChangeServer, server }: ServerListProps) {
    return (
        <div className="flex mt-5">
            <p className="mr-4">Servers:</p>
            <div className="flex flex-wrap gap-2 items-center">
                {serverList?.map((s, index) => (
                    <button onClick={() => handleChangeServer(s.name)} className={`${server === s.name ? "bg-primary" : "bg-gray"} py-2 px-5 rounded-md text-sm`} key={index}>
                        {s.name}
                    </button>))}
            </div >
        </div>
    )
}

export default memo(ServerList)
