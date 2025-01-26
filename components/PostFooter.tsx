import Link from 'next/link'; // Import Next.js Link


interface PostFooterProps {
  id: string; // Accept `id` explicitly as a prop
}

export default function PostFooter({ id }: PostFooterProps) {
  if (!id) {
    console.error("PostFooter: 'id' is undefined");
  } 
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
        
        <Link href={`/chatbot${id}`} style={{ display: 'inline-block' }}>
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