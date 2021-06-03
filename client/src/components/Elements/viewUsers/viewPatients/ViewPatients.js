import React, { useState, useEffect } from "react";
import { getPatients } from "../../../../api/viewUsers";
import { deleteuser } from "../../../../api/doctor";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import UserCard from "../components/UserCard";
import "./ViewPatients.css";
const ViewPatients = () => {
  const [patients, setPatients] = useState();

  const fetchAllpatients = async () => {
    const { data } = await getPatients();
    setPatients(data);
  };

  useEffect(() => {
    fetchAllpatients();
  }, []);

  const handleDelete = async (id) => {
    await deleteuser(id);
    fetchAllpatients();
  };
  return (
    <div className="view-patients-table-container">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients &&
              patients.map((patient) => {
                return (
                  <UserCard
                    key={patient._id}
                    name={patient.username}
                    email={patient.email}
                    id={patient._id}
                    handleDelete={(id) => handleDelete(id)}
                  />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ViewPatients;
