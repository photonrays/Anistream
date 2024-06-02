
export default function AnimeInfoDetail({ title, detail }: { title: string, detail: React.ReactNode }) {
    return (
        <div className='flex text-sm'>
            <p className='mb-2 text-default-500'>{title}:&nbsp;</p>
            {detail}
        </div>
    )
}
