export type DTORegister = {
  name: string;
  email: string;
  password: string;
};

export type DTOLogin = {
  email: string;
  password: string;
};

export type DTOAnswerToken = {
  success: string;
  accessToken: string;
  refreshToken: string;
};

export type DTOAnswerUser = {
  email: string;
  name: string;
};

export type DTOAnswerForogotPassword = {
  success: boolean;
  message: string;
};

export type DTOAnswerRegister = DTOAnswerToken & { user: DTOAnswerUser };
export type DTOAnswerLogin = DTOAnswerToken & { user: DTOAnswerUser };
export type DTOEditUser = Partial<DTORegister>;
