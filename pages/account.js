import axios from "axios";
import { parseCookies } from "nookies";

import AccountHeader from "./../components/Account/AccountHeader";
import AccountOrders from "./../components/Account/AccountOrders";
import AccountPermissions from "./../components/Account/AccountPermissions";

import baseUrl from "./../utils/baseUrl";

function Account({ user, orders }) {
  console.log("orders", orders);
  return (
    <>
      <AccountHeader user={user} />
      <AccountOrders />
    </>
  );
}

Account.getInitialProps = async ctx => {
  const { authToken } = parseCookies(ctx);
  // If no user auth then no orders
  if (!authToken) {
    return { orders: [] };
  }
  const headers = { headers: { Authorization: authToken } };
  const endpoint = `${baseUrl}/api/orders`;
  const response = await axios.get(endpoint, headers);
  const { data } = response;
  return data;
};

export default Account;
