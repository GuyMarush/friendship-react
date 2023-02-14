import { Button } from "react-bootstrap";

const FriendshipInfo = (props) => {
  return (
    <tr>
      <th scope="row">{props.friendship.user_id}</th>
      <td>{props.friendship.user_name}</td>
      <td>{props.friendship.profile_image}</td>
      <td>{props.friendship.selling_category}</td>
      <td>{props.friendship.number_of_gigs}</td>
      <td>{props.friendship.friendship_status}</td>
      {props.friendship.is_creator &&
        props.friendship.friendship_status === "PENDING" && (
          <>
            <td>
              <Button className="mx-2" variant="success" onClick={() => props.onApprove(props.friendship.id)}>
                Approve
              </Button>
              <Button variant="danger" onClick={() => props.onDecline(props.friendship.id)}>
                Decline
              </Button>
            </td>
          </>
        )}
      {props.friendship.friendship_status === "APPROVED" && (
        <td>
          <Button variant="danger" onClick={() => props.onUnfriend(props.friendship.id)}>
            Unfriend
          </Button>
        </td>
      )}
      {props.friendship.friendship_status !== "APPROVED" &&
        !(
          props.friendship.is_creator &&
          props.friendship.friendship_status === "PENDING"
        ) && <td>-</td>}
    </tr>
  );
};

export default FriendshipInfo;
