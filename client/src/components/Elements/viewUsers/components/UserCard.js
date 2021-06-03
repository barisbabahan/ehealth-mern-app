import React, { useContext } from "react";
import { UserRoleContext } from "../../../../context/UserContext";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import PhoneIcon from "@material-ui/icons/Phone";
import "./UserCard.css";
const UserCard = ({
  name,
  email,
  expertise,
  id,
  handleDelete,
  callDoctor,
  requestChat,
  doctorId,
}) => {
  const { userRole } = useContext(UserRoleContext);
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <p>{name}</p>
      </TableCell>
      <TableCell align="right">
        <p>{email}</p>
      </TableCell>
      {expertise && (
        <TableCell align="right">
          <p>{expertise}</p>
        </TableCell>
      )}
      {userRole === "admin" && (
        <TableCell
          onClick={() => handleDelete(id)}
          style={{ cursor: "pointer" }}
          align="right"
        >
          <DeleteIcon />
        </TableCell>
      )}
      {userRole === "patient" &&
        requestChat &&
        (doctorId ? (
          <TableCell style={{ cursor: "pointer" }} align="right">
            <PhoneIcon onClick={() => callDoctor(doctorId)} />
          </TableCell>
        ) : (
          "not active"
        ))}
    </TableRow>
  );
};

export default UserCard;
