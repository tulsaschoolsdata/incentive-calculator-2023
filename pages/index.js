import Link from 'next/link'

export default function Home() {

  return (
    <>
      <h1 className={'text-center'}>Retention Incentive Calculator</h1>

      <div className={'flex justify-center space-x-2'}>
        <Link href="/returning">
          <button>Returning for 22-23</button>
        </Link>
      </div>
    </>
  )
}
