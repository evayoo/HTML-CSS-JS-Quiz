import React, { useState } from "react";
import Nav from "../components/Nav";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [image, setImage] = useState(null);
  // 추가된 상태
  const [showPostDetail, setShowPostDetail] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");

  const addPost = () => {
    if (newPost.trim() === "") {
      setShowWarning(true);
      return;
    }
    setPosts((prevPosts) => [{ content: newPost, image: image }, ...prevPosts]);
    setNewPost("");
    setImage(null);
    setIsOpen(false);
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    setSearch(searchInput);
  };

  const filteredPosts = posts.filter((post) => post.content.includes(search));

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 추가된 함수들
  const showDetail = (post) => {
    setSelectedPost(post);
    setShowPostDetail(true);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const addComment = () => {
    if (newComment.trim() === "") {
      setShowWarning(true);
      return;
    }
    const updatedComments = { ...comments };
    const postId = selectedPost.id;
    if (!updatedComments[postId]) {
      updatedComments[postId] = [];
    }
    updatedComments[postId].push(newComment);
    setComments(updatedComments);
    setNewComment("");
  };

  return (
    <div>
      <Nav />
      <div className="flex flex-col min-h-screen bg-gray-200 pt-16 overflow-hidden">
        <div className="flex mt-16 h-full bg-gray-200">
          <div className="w-full p-4 max-w-screen-md mx-auto flex flex-col justify-between">
            <div className="mb-4 flex items-center border-b pb-2 fixed bg-gray-4">
              <div className="mx-auto w-500 flex items-center"></div>
              <input
                className="p-2 border border-gray-300 rounded mr-2"
                type="search"
                placeholder="Search..."
                value={searchInput}
                onChange={handleSearchInput}
              />
              <button
                onClick={handleSearch}
                className="ml-2 text-white bg-blue-500 rounded p-2"
              >
                검색
              </button>
            </div>
            <div className="overflow-auto mb-8 scrollbar-hide pt-14">
              {filteredPosts.map((post, index) => (
                <div
                  key={index}
                  className="p-2 mb-2 bg-white border border-gray-300 rounded whitespace-pre-wrap max-h-88 overflow-y-auto scrollbar-hide"
                >
                  {post.content}
                  {post.image && (
                    <img
                      src={post.image}
                      alt="post"
                      className="mt-2 w-full h-auto"
                    />
                  )}
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    <button className="text-blue-500">
                      <img
                        src="like_126473.png"
                        alt="Like"
                        style={{ width: "32px", height: "32px" }}
                      />
                    </button>

                    {/* 수정된 Comment 버튼 */}
                    <button
                      onClick={() => showDetail(post)}
                      className="text-blue-500"
                    >
                      Comment
                    </button>
                    <button className="text-blue-500">Share</button>
                    <button className="text-blue-500">View</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end fixed right-0 bottom-0 mb-4">
              <button
                onClick={() => setIsOpen(true)}
                className="p-2 text-white bg-blue-500 rounded mt-2"
                style={{ width: "140px", height: "50px", marginRight: "180px" }}
              >
                글쓰기
              </button>
              {isOpen && (
                <div className="fixed z-80 inset-0 overflow-y-auto">
                  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div
                      className="fixed inset-0 transition-opacity"
                      aria-hidden="true"
                    >
                      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-md sm:w-full sm:my-16">
                      <div className="p-4 sm:p-10 text-center overflow-y-auto">
                        <h3 className="mb-2 text-2xl font-bold text-gray-800">
                          글쓰기
                        </h3>
                        <textarea
                          value={newPost}
                          onChange={(e) => setNewPost(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="w-1/2 p-2 mt-2 border border-gray-300 rounded text-center cursor-pointer"
                        />
                        {image && (
                          <img
                            src={image}
                            alt="preview"
                            className="mt-2 w-full h-auto"
                          />
                        )}
                        <div className="mt-4 flex justify-center gap-x-4">
                          <button
                            onClick={addPost}
                            className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
                          >
                            완료
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            setShowConfirm(true);
                          }}
                          className="absolute top-0 right-0 p-4 text-gray-400 hover:text-gray-800"
                        >
                          &times;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {showPostDetail && (
                <div className="fixed z-80 inset-0 overflow-y-auto">
                  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div
                      className="fixed inset-0 transition-opacity"
                      aria-hidden="true"
                    >
                      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <div
                      className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full sm:my-8"
                      style={{ width: "80%", height: "90%" }} // 상세 페이지 크기 조절
                    >
                      <div className="p-4 sm:p-10 text-center overflow-y-auto max-h-96">
                        <h3 className="mb-2 text-2xl font-bold text-gray-800">
                          상세 페이지
                        </h3>
                        <p className="whitespace-pre-wrap">
                          {selectedPost?.content}
                        </p>
                        {selectedPost?.image && (
                          <img
                            src={selectedPost.image}
                            alt="post"
                            className="mt-2 w-full h-auto"
                          />
                        )}
                        <div className="mt-2 grid grid-cols-4 gap-2">
                          <button className="text-blue-500">Like</button>
                          <button onClick={addComment} className="text-blue-500">
                            Comment
                          </button>
                          <button className="text-blue-500">Share</button>
                          <button className="text-blue-500">View</button>
                        </div>
                        <div className="mt-4">
                          <textarea
                            value={newComment}
                            onChange={handleCommentChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="댓글 작성..."
                          />
                          <button
                            onClick={() => setShowPostDetail(false)}
                            className="absolute top-0 right-0 p-4 text-gray-400 hover:text-gray-800"
                            style={{ fontSize: "24px" }}
                          >
                            댓글 작성
                          </button>
                        </div>
                        <button
                          onClick={() => setShowPostDetail(false)}
                          className="absolute top-0 right-0 p-4 text-gray-400 hover:text-gray-800"
                        >
                          &times;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {showWarning && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div
                      className="fixed inset-0 transition-opacity"
                      aria-hidden="true"
                    >
                      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <div
                      className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-sm sm:w-full sm:my-16"
                      style={{ width: "270px", height: "200x" }}
                    >
                      <div className="p-4 sm:p-10 text-center overflow-y-auto">
                        <h3 className="mb-2 text-2xl font-bold text-gray-800">
                          알림
                        </h3>
                        <p className="text-gray-600">내용이 없습니다.</p>
                        <div className="mt-4 flex justify-center gap-x-4">
                          <button
                            onClick={() => setShowWarning(false)}
                            className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
                          >
                            닫기
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {showConfirm && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div
                      className="fixed inset-0 transition-opacity"
                      aria-hidden="true"
                    >
                      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <div
                      className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-sm sm:w-full sm:my-16"
                      style={{ width: "270px", height: "200px" }}
                    >
                      <div className="p-4 sm:p-10 text-center overflow-y-auto">
                        <h3 className="mb-2 text-2xl font-bold text-gray-800">
                          작성취소
                        </h3>
                        <p className="text-gray-600">작성을 취소하시겠습니까?</p>
                        <div className="mt-4 flex justify-center gap-x-4">
                          <button
                            onClick={() => {
                              setNewPost("");
                              setIsOpen(false);
                              setShowConfirm(false);
                            }}
                            className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
                          >
                            예
                          </button>
                          <button
                            onClick={() => setShowConfirm(false)}
                            className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
                          >
                            아니오
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
