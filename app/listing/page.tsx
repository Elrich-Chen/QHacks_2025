import Image from "next/image";
import Navbar from "../../components/Navbar";
import PostCol from "../../components/PostsCol";

export default function Listing() {
  return (
    <div>
      <Navbar />
      <div>
        <PostCol />
      </div>
    </div>
  );
}