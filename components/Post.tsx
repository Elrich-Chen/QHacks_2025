import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostMediaGird from './PostMediaGird';
import PostFooter from './PostFooter';

interface PostProps {
    id : string;
    user: {
      name: string;
      profilePic: string;
      timestamp: string;
    };
    content: {
      title: string;
      description: string;
    };
    media: string[];
  }
  
  export default function Post({ id, user, content, media }: PostProps) {
    return (
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        color: 'black',
      }}>
        <PostHeader user={user} />
        <PostContent content={content} />
        <PostMediaGird media={media} />
        <PostFooter id = {id}/>
      </div>
    );
  }