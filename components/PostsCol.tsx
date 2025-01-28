import Post from "./Post";

export default function MainPage() {
    const posts = [
      {
        id: '1',
        user: {
          name: 'Elrich Chen',
          profilePic: './elrich_pfp.jpg',
          timestamp: '1 hour ago',
        },
        content: {
          title: 'Available May 2025 on a 12 month lease at $2,946',
          description: `Spacious, sunny 3-bedroom apartment occupying the 2nd floor with 4 bedrooms and 2 bathrooms (each with a shower).
            💰 Rent: $1,050/month (utilities not included).
            🏠 Address: 316 Albert St.
            🧺 In-house laundry (no creepy basement trips—washer and dryer included).
            🚗 Parking included (no extra costs).
            👩‍🤝‍👩 We’re a friendly, easygoing group of girls who love mixing it up—whether it’s a chill night in or a fun night out, we’re happy to do either!
            🙏 We’re looking for someone who’s kind, respectful, and enjoys going out/staying in.

            💬 If you’re interested or have any questions about us or the house, feel free to message me—we’re excited to meet our future housemate!`,
        },
        media: [
          './buildings2&3/building2.jpg',
          './interior2_3/interior2_2.jpeg',
          './interior2_3/interior2.jpg',
        ],
      },
      {
        id: '2',
        user: {
          name: 'Elrich Chen',
          profilePic: './users/steve.jpg',
          timestamp: '2 hours ago',
        },
        content: {
          title: 'Modern studio apartment available downtown!',
          description: `🏠 Fully furnished with all modern amenities, perfect for a cozy stay.
            🌆 Enjoy breathtaking views from your private balcony.
            🚶‍♂️ Just steps away from major transit hubs—super convenient!
            🛋️ Spacious living room, perfect for relaxing or entertaining guests.
            🍳 Fully equipped kitchen for all your cooking needs.
            🛏️ Comfortable bedrooms with plenty of storage space.
            🔑 Ready to move in—bring your bags and make it home today!
            
            💬 If you’re interested or have any questions about us or the house, feel free to message me—we’re excited to meet our future housemate!`,
        },
        media: [
          './buildings1/1.jpg',
          './buildings1/2.jpg',
          './buildings1/3.jpeg',
          './buildings1/4.jpg',
        ],
      },
      {
        id: '3',
        user: {
          name: 'Elrich Chen',
          profilePic: './users/henrycaviil.jpeg',
          timestamp: '3 hours ago',
        },
        content: {
          title: 'Looking for a roommate for Fall 2025 semester',
          description: `🏡 Cozy 2-bedroom apartment, perfect for students or young professionals.
            🍴 Shared kitchen with modern appliances for all your cooking adventures.
            📍 Located in a prime area, close to shops, restaurants, and public transit.
            🛏️ Fully furnished bedrooms with comfortable beds and storage.
            🛁 Clean and well-maintained shared bathroom.
            👩‍🤝‍👩 Friendly and welcoming roommates.
            📞 Contact us today to schedule a viewing or for more information!
            
            💬 If you’re interested or have any questions about us or the house, feel free to message me—we’re excited to meet our future housemate!`,
        },
        media: [
          './interior2_3/interior3_1.jpeg',
          './interior2_3/interior3_2.jpg',
          './interior2_3/interior3_3.png',
        ],
      },
    ];
  
    return (
      <div style={{ maxWidth: '600px', margin: '20px auto', paddingTop: '60px' }}>
        {posts.map((post) => (
          <Post
            key={post.id}
            id = {post.id}
            user={post.user}
            content={post.content}
            media={post.media}
          />
        ))}
      </div>
    );
  }