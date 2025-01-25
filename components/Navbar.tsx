import nav from './Navbar.module.css';
import Image from 'next/image';

export default function Navbar() {
    return (
      <header className={nav.navbar}>
        <div className={nav.left}>
          <div className={nav.logo}></div>

          <div className={nav.searchbar}>
            <Image src="/search.svg" alt="Facebook Logo" width={13} height={13} />
            <input type="text" placeholder="Search Facebook" />
          </div>
        </div>

        <div className={nav.icons}>
          <span><Image src="/house.svg" alt="Facebook Logo" width={25} height={25} /></span>

          <span><Image src="/group.png" alt="Facebook Logo" width={25} height={25} /></span>
          
          <span><Image src="/playlist.png" alt="Facebook Logo" width={25} height={25} /></span>

          <span><Image src="/market.png" alt="Facebook Logo" width={25} height={25} /></span>

          <span><Image src="/society.png" alt="Facebook Logo" width={25} height={25} /></span>
        </div>

        <div className={nav.contacts}>
          <span className={nav.circle}><Image src="/messenger.svg" alt="Facebook Logo" width={25} height={25} /></span>
          <span className={nav.circle}><Image src="/grid.png" alt="Facebook Logo" width={25} height={25} /></span>
          <span className={nav.circle}><Image src="/notification.png" alt="Facebook Logo" width={25} height={25} /></span>
          <span style={{ width: '40px', height: '42px', position: 'relative' }}>
            <Image 
              src="/elrich_pfp.jpg" 
              alt="User Profile" 
              layout="fill" 
              objectFit="cover" 
              style={{ borderRadius: '80%' }}
            />
          </span>
        </div>
      </header>
    );
  }