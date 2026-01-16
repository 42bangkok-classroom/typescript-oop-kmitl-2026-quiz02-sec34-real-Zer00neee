import axios from "axios";

type Geo = {
  lat: string | null;
  lng: string | null;
};

type Address = {
  street: string | null;
  suite: string | null;
  city: string | null;
  zipcode: string | null;
  geo: Geo | null;
};

type ApiUser = {
  id: number;
  name: string;
  phone: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
};

type NewUser = {
  name?: string;
  phone?: string;
  address?: {
    street?: string;
    suite?: string;
    city?: string;
    zipcode?: string;
    geo?: {
      lat?: string;
      lng?: string;
    };
  };
} | null;

type UserResult = {
  id: number;
  name: string | null;
  phone: string | null;
  address: Address | null;
};


export async function addUser(newUserData: NewUser): Promise<UserResult[]> {
  try {
    const res = await axios.get<ApiUser[]>(
      "https://jsonplaceholder.typicode.com/users"
    );

    const users: UserResult[] = res.data.map((user) => ({
      id: user.id,
      name: user.name,
      phone: user.phone,
      address: {
        street: user.address.street,
        suite: user.address.suite,
        city: user.address.city,
        zipcode: user.address.zipcode,
        geo: {
          lat: user.address.geo.lat,
          lng: user.address.geo.lng,
        },
      },
    }));

    if (newUserData === null) {
      return users;
    }

    const lastId = users[users.length - 1]?.id ?? 0;

    const newUser: UserResult = {
      id: lastId + 1,
      name: newUserData.name ?? null,
      phone: newUserData.phone ?? null,
      address: newUserData.address
        ? {
            street: newUserData.address.street ?? null,
            suite: newUserData.address.suite ?? null,
            city: newUserData.address.city ?? null,
            zipcode: newUserData.address.zipcode ?? null,
            geo: newUserData.address.geo
              ? {
                  lat: newUserData.address.geo.lat ?? null,
                  lng: newUserData.address.geo.lng ?? null,
                }
              : null,
          }
        : null,
    };

    users.push(newUser);

    return users;
  } catch {
    return [];
  }
}
