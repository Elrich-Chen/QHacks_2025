interface PostMediaGridProps {
    media: string[];
  }
  
  export default function PostMediaGrid({ media }: PostMediaGridProps) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
        marginBottom: '15px',
      }}>
        {media.slice(0, 4).map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Media ${index + 1}`}
            style={{
              width: '100%',
              height: '100px',
              objectFit: 'cover',
              borderRadius: '5px',
            }}
          />
        ))}
        {media.length > 4 && (
          <div style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '5px',
          }}>
            <img
              src={media[4]}
              alt="More media"
              style={{
                width: '100%',
                height: '100px',
                objectFit: 'cover',
              }}
            />
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}>
              +{media.length - 4}
            </div>
          </div>
        )}
      </div>
    );
  }