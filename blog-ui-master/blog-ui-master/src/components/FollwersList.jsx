/* eslint-disable react/prop-types */
import ListUsers from './ListUsers'; // Ensure this path is correct

const FollowersList = ({ followers }) => {
  return (
    <div>
      <ListUsers users={followers} />
    </div>
  );
};

export default FollowersList;
