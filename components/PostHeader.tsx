'use client'; // Enable client-side features
import { useState } from 'react';
import Link from 'next/link'; // Import Next.js Link

interface PostHeaderProps {
    user: {
      name: string;
      profilePic: string;
      timestamp: string;
    };
  }
  
  export default function PostHeader({ user }: PostHeaderProps) {
    const [isExpanded, setIsExpanded] = useState(false); // Track if content is expanded

    // Function to toggle the expanded state
    const toggleContent = () => {
      setIsExpanded(!isExpanded);
    };

    return (
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <Link href={'/'} style={{ display: 'inline-block' }}>
        <img
          src={user.profilePic}
          alt={`${user.name}'s profile`}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            marginRight: '10px',
            objectFit: 'contain',
          }}
        />
        </Link>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>{user.name}</p>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#888' }}>{user.timestamp}</p>
        </div>
        <button style={{
          background: 'none',
          border: 'none',
          fontSize: '1.2rem',
          cursor: 'pointer',
          color: '#888',
        }}>⋯</button>
      </div>
    );
  }