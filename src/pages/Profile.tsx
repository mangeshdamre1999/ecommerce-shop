import { FC } from "react";
import { useAppSelector } from "../redux/hooks";

/**
 * Account details for the demo user. The catalog API ships its own unrelated
 * user fixtures, so the page used to render a stranger's profile after signing
 * in — this keeps the account consistent with whoever is actually logged in.
 */
const DEMO_PROFILE = {
  firstName: "Harsha",
  lastName: "Damre",
  email: "harsha@harshas.store",
  phone: "+91 98765 43210",
  memberSince: "2024",
  address: {
    line1: "Flat 402, Sai Residency, Baner Road",
    city: "Pune",
    state: "Maharashtra",
    postalCode: "411045",
  },
};

const Row: FC<{ label: string; value: string }> = ({ label, value }) => (
  <tr>
    <td className="font-bold w-40 py-1 align-top">{label}</td>
    <td className="py-1">{value}</td>
  </tr>
);

const Profile: FC = () => {
  const username = useAppSelector((state) => state.authReducer.username);
  const { address } = DEMO_PROFILE;

  return (
    <div className="container mx-auto min-h-[83vh] w-full max-w-5xl dark:text-white">
      <h1 className="text-4xl p-4 font-bold font-lora">Your Account</h1>
      <div className="font-karla grid md:grid-cols-2 grid-cols-1 gap-6 p-4">
        <div>
          <h2 className="font-bold text-xl mb-2">Profile</h2>
          <table>
            <tbody>
              <Row label="Username" value={username || DEMO_PROFILE.firstName} />
              <Row label="First Name" value={DEMO_PROFILE.firstName} />
              <Row label="Last Name" value={DEMO_PROFILE.lastName} />
              <Row label="Email" value={DEMO_PROFILE.email} />
              <Row label="Phone" value={DEMO_PROFILE.phone} />
              <Row label="Member Since" value={DEMO_PROFILE.memberSince} />
            </tbody>
          </table>
        </div>
        <div>
          <h2 className="font-bold text-xl mb-2">Default Delivery Address</h2>
          <p>
            {DEMO_PROFILE.firstName} {DEMO_PROFILE.lastName}
          </p>
          <p>{address.line1}</p>
          <p>
            {address.city}, {address.state} {address.postalCode}
          </p>
          <p>{DEMO_PROFILE.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
