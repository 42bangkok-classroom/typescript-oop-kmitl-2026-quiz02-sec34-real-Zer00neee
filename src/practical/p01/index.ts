import axios from "axios";

type Geo = {
  lat: string;
  lng: string;
};

type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

type UserApi = {
  id: number;
  name: string;
  phone: string;
  address: Address;
};

type User = {
  id: number;
  name: string;
  phone: string;
  address: Address | null;
};

export async function getPostalAddress(): Promise<User[]> {
  const res = await axios.get<UserApi[]>(
    "https://jsonplaceholder.typicode.com/users"
  );

  return res.data.map((user) => ({
    id: user.id,
    name: user.name,
    phone: user.phone,
    address: user.address ?? null,
  }));
}
