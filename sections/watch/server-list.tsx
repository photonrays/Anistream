import { ServerProps } from '@/app/(main)/watch/[id]/page'
import { EpisodeServers } from '@/services/aniwatch/types/parsers'

interface ServerListProps {
    serverList?: EpisodeServers,
    handleChangeServer: any,
    server?: ServerProps
}

function ServerList({ serverList, handleChangeServer, server }: ServerListProps) {
    return (
        <div className="mt-5 flex flex-col gap-4">
            {serverList?.sub && serverList.sub.length > 0 && <div className='grid grid-cols-[90px_1fr]'>
                <p className="mr-4">Sub:</p>
                <div className="flex flex-wrap gap-2 items-center">
                    {serverList.sub.map((s, index) => (
                        <button onClick={() => handleChangeServer(s, "sub")} className={`${server?.category === 'sub' && server.serverName === s.serverName ? "bg-primary text-white" : "bg-card"} py-2 px-5 rounded-md text-sm`} key={index}>
                            {s.serverName}
                        </button>))}
                </div >
            </div>}
            {serverList?.dub && serverList.dub.length > 0 && <div className='grid grid-cols-[90px_1fr]'>
                <p className="mr-4">Dub:</p>
                <div className="flex flex-wrap gap-2 items-center">
                    {serverList.dub.map((s, index) => (
                        <button onClick={() => handleChangeServer(s, "dub")} className={`${server?.category === 'dub' && server?.serverName === s.serverName ? "bg-primary text-white" : "bg-card"} py-2 px-5 rounded-md text-sm`} key={index}>
                            {s.serverName}
                        </button>))}
                </div >
            </div>}
            {serverList?.raw && serverList.raw.length > 0 && <div className='grid grid-cols-[90px_1fr]'>
                <p className="mr-4">Raw:</p>
                <div className="flex flex-wrap gap-2 items-center">
                    {serverList.raw.map((s, index) => (
                        <button onClick={() => handleChangeServer(s, "raw")} className={`${server?.category === 'raw' && server.serverName === s.serverName ? "bg-primary text-white" : "bg-card"} py-2 px-5 rounded-md text-sm`} key={index}>
                            {s.serverName}
                        </button>))}
                </div >
            </div>}
        </div>
    )
}

export default ServerList
