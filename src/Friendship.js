import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import FriendshipInfo from "./FriendshipInfo";

const Friendship = () => {
  const [creatorId, setCreatorId] = useState();
  const [targetId, setTargetId] = useState();
  const [userId, setUserId] = useState();
  const [friendships, setFriendships] = useState();
  const [createResultMessage, setCreateResultMessage] = useState("");
  const [createMessageColor, setCreateMessageColor] = useState();

  const handleCreateFriendship = async () => {
    const body = { creatorId: creatorId, targetId: targetId };
    const res = await axios
      .post("http://localhost:8765/api/v1/friendships", body)
      .catch((error) => {
        setCreateResultMessage(error.response.data);
        setCreateMessageColor("red");
      });
    if (res) {
      setCreateResultMessage(res?.data);
      setCreateMessageColor("green");
    }
    await sleep(500);
    handleGetFriendships();
  };

  const handleApproveFriendship = async (friendshipId) => {
    const body = { userId: userId };
    await axios.put(
      `http://localhost:8765/api/v1/friendships/${friendshipId}/approve`,
      body
    );
    await sleep(500);
    handleGetFriendships();
  };

  const handleDeclineFriendship = async (friendshipId) => {
    const body = { userId: userId };
    await axios.put(
      `http://localhost:8765/api/v1/friendships/${friendshipId}/decline`,
      body
    );
    await sleep(500);
    handleGetFriendships();
  };

  const handleUnfriendFriendship = async (friendshipId) => {
    const body = { userId: userId };
    axios.put(
      `http://localhost:8765/api/v1/friendships/${friendshipId}/unfriend`,
      body
    );
    await sleep(500);
    handleGetFriendships();
  };

  const handleGetFriendships = async () => {
    const res = await axios.get(
      `http://localhost:8766/api/v1/friendships/1/20/${userId}`
    );
    setFriendships(res.data);
  };

  return (
    <div className="Friendship-Page">
      <p className="fs-1">Friendships</p>
      <div className="Create-Friendship px-3">
        <p className="fs-4">Create friendship:</p>
        <div className="create-users-info">
          <p>Creator user id:</p>
          <input
            className="mx-4"
            value={creatorId}
            onChange={(e) => setCreatorId(e.currentTarget.value)}
          />
          <p>Target user id:</p>
          <input
            className="mx-4"
            value={targetId}
            onChange={(e) => setTargetId(e.currentTarget.value)}
          />
          <Button onClick={handleCreateFriendship}>Create!</Button>
          <p className="mx-4" style={{ color: createMessageColor }}>{createResultMessage}</p>
        </div>
      </div>
      <div className="Create-Friendship p-3">
        <p className="fs-4">View friendships:</p>
        <div className="create-users-info">
          <p>User id:</p>
          <input
            className="mx-4"
            value={userId}
            onChange={(e) => setUserId(e.currentTarget.value)}
          />
          <Button onClick={handleGetFriendships}>Get!</Button>
        </div>
        <table className="friendships-table table my-2">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">User name</th>
              <th scope="col">Profile image</th>
              <th scope="col">Selling category</th>
              <th scope="col">Number of gigs</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {friendships?.map((friendship) => (
              <FriendshipInfo
                friendship={friendship}
                onDecline={handleDeclineFriendship}
                onApprove={handleApproveFriendship}
                onUnfriend={handleUnfriendFriendship}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default Friendship;
