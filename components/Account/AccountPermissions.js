import React, { useState, useEffect, useRef } from "react";
import { Header, Accordion, Icon, Checkbox, Table } from "semantic-ui-react";
import axios from "axios";
import cookie from "js-cookie";
import baseUrl from "../../utils/baseUrl";

function AccountPermissions() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const endpoint = `${baseUrl}/api/users`;
    const authToken = cookie.get("authToken");
    const headers = { headers: { Authorization: authToken } };

    const response = await axios.get(endpoint, headers);

    setUsers(response.data);
  };

  return (
    <div style={{ margin: "2em 0" }}>
      <Header as="h2">
        <Icon name="settings" />
        User Permissions
      </Header>
      <Table compact celled definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Joined</Table.HeaderCell>
            <Table.HeaderCell>Updated</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users.map(user => (
            <UserPermission key={user._id} user={user} />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

function UserPermission({ user }) {
  const [isAdminRole, setIsAdminRole] = useState(user.role === "admin");
  const isFirstRun = useRef(true);

  useEffect(() => {
    // Trick to prevent initial rerender
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    // Send new role to DB
    updatePermission();
  }, [isAdminRole]);

  const handleChangePermission = () => {
    setIsAdminRole(prevState => !prevState);
  };

  const updatePermission = async () => {
    // Send update to DB
    const endpoint = `${baseUrl}/api/account`;
    const payload = { _id: user._id, role: isAdminRole ? "admin" : "user" };

    const response = await axios.put(endpoint, payload);
  };

  return (
    <Table.Row>
      <Table.Cell collapsing>
        <Checkbox
          toggle
          checked={isAdminRole}
          onChange={handleChangePermission}
        />
      </Table.Cell>
      <Table.Cell>{user.name}</Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>{user.createdAt}</Table.Cell>
      <Table.Cell>{user.updatedAt}</Table.Cell>
      <Table.Cell>{isAdminRole ? "admin" : "user"}</Table.Cell>
    </Table.Row>
  );
}

export default AccountPermissions;
