'use client'; // Enable client-side features
import { useState } from 'react';

interface PostContentProps {
    content: {
      title: string;
      description: string;
    };
  }
  
  export default function PostContent({ content }: PostContentProps) {
    const [isExpanded, setIsExpanded] = useState(false); // Track if content is expanded

    // Function to toggle the expanded state
    const toggleContent = () => {
      setIsExpanded(!isExpanded);
    };

    return (
      <div style={{ marginBottom: '15px' }}>
        <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>{content.title}</p>
        <p style={{ marginBottom: '10px', whiteSpace: 'pre-line' }}>
        {isExpanded
          ? content.description // Show full description if expanded
          : `${content.description.substring(0, 100)}...`} {/* Show truncated content */}
        </p>
        {content.description.length > 100 && ( // Only show button if content is long
        <button style={{
          background: 'none',
          border: 'none',
          color: '#1877f2',
          cursor: 'pointer',
          fontSize: '0.9rem',
        }}
          onClick={toggleContent}>
          {isExpanded ? 'See Less' : 'See More'}
        </button>)}
      </div>
    );
  }