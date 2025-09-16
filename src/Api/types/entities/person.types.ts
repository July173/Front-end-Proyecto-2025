export interface RegisterPayload {
  email: string;
  first_name: string;
  second_name?: string;
  first_last_name: string;
  second_last_name?: string;
  type_identification: string;
  number_identification: string;
  phone_number: string;
  password: string;
  image?: string;
}

export interface Person {
  id: string;
  first_name: string;
  second_name?: string;
  first_last_name: string;
  second_last_name?: string;
  phone_number: string;
  type_identification: string;
  number_identification: string;
  active: boolean;
  image?: string;
}
