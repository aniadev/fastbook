import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewfeedPost from "../Newfeed/NewfeedPost";
//api
import profileApi from "../../api/profileApi";

function Posts({ info }) {
  let { id } = useParams();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await profileApi.getPosts({ _id: id });
        if (response.success) {
          // console.log(response);
          setPosts(response.posts);
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getPosts();
    // setPosts([
    //   {
    //     // default post
    //     postId: "pid00",
    //     userId: "2",
    //     name: "Quỳnh Hoa",
    //     avatar:
    //       "https://scontent.fhan2-2.fna.fbcdn.net/v/t1.6435-9/55576557_2338978699712093_8400321977838993408_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=174925&_nc_ohc=M03HiIbNOA8AX87BXHR&_nc_ht=scontent.fhan2-2.fna&oh=93f4e309ad47e9c563a6412120aeeb22&oe=618AB03B",
    //     content: `Hê hê \r\n BKFS Cup 2019 😘😘😘 #20200420`,
    //     image:
    //       "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.6435-9/54358221_2337526049857358_5451961486165409792_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=174925&_nc_ohc=UNbrc6vCoZMAX9ORrPx&tn=JZOqhw_6mOOiWWjn&_nc_ht=scontent.fhan2-3.fna&oh=133f9a628a82d74cbdc364fb870b3f95&oe=618C17B9",
    //     time: "March 17 2019",
    //     likes: 78,
    //     comments: 18,
    //   },
    // ]);
  }, [id]);
  return (
    <div className="profile-posts">
      {posts.length > 0 ? (
        posts.map((post) => {
          post = {
            ...post,
            name: info.name,
            avatar: info.avatar,
            blueTick: info.blueTick,
          };
          return <NewfeedPost key={post.postId} postData={post} />;
        })
      ) : (
        <span style={{ color: "#fff" }}>No data</span>
      )}
    </div>
  );
}

export default Posts;
