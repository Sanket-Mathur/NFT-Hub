import Link  from 'next/Link'

const Navbar = () =>{
    return (
        <nav className="border-b p-6">
            <p className='text-4xl font-bold'>NFT-Hub</p>
            <div className='flex mt-4'>
            <Link href='/'>
                <a className='mr-6 text-pink-500'>
                Home
                </a>
            </Link>
            <Link href='/create_item'>
                <a className='mr-6 text-pink-500'>
                Sell Digital Asset
                </a>
            </Link>
            <Link href='/my-assets'>
                <a className='mr-6 text-pink-500'>
                My Digital Assets
                </a>
            </Link>
            <Link href='/dashboard'>
                <a className='mr-6 text-pink-500'>
                Dashboard
                </a>
            </Link>
            </div>
        </nav>
    );
}

export default Navbar;