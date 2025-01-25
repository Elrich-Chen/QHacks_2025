import Link from 'next/link'; // Import Next.js Link

export default function PostFooter() {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: '1px solid #ddd',
        paddingTop: '10px',
      }}>
        <button style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#888',
          fontSize: '1rem',
        }}>👍 Like</button>
        <button style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#888',
          fontSize: '1rem',
          paddingLeft: '60px',
        }}>💬 Comment</button>
        
        <Link href={'/'} style={{ display: 'inline-block' }}>
        <button style={{
          background: '#1877f2',
          border: 'none',
          cursor: 'pointer',
          color: 'white',
          fontSize: '1rem',
          padding: '5px',
          borderRadius: '15px',
        }}>💬 Start Messaging !
        </button>
        </Link>
        
      </div>
    );
  }