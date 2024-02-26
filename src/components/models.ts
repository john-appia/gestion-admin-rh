export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export type Staff = {
  photo: string;
  name: string;
  job: string;
  contrat: Contrat;
  status: boolean;
  gender: Gender;
};

export type Contrat = 'STAGE' | 'CDD' | 'CDI' | 'CONSULTANCE' | 'INTERIM';

export type Gender = 'M' | 'F';

export type LoginData = {
  email: string;
  password: string;
};

export type User = {
  email: string;
  name: string;
  username: string;
  password: string;
  role: string;
  photo: string;
};

export type AdministrativeRequest = {
  id: number;
  user: User;
  type: AdministrativeRequestType;
  period?: { from: string; to: string } | null;
  status: AdministrativeRequestStatus;
};

export type AdministrativeRequestStatus = 'EN COURS' | 'VALIDÉ' | 'REJETÉ';

export type AdministrativeRequestType =
  | 'CERTIFICAT DE TRAIVAIL'
  | 'CONGÉ'
  | 'BULLETIN DE SALAIRE';
