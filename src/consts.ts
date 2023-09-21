export const initialUser = {
  username: "",
  password: "",
  serverPath: "",
  serverAddress: "",
  port: "",
};
export const errObj = { message: "error!" };

export const regexMap = {
  username: /\S+@\S+\.\S+/,
  passowrd: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/,
  port: /^(1d{4}|[1-9]d{0,3}|[1-5]d{4}|6[0-5]d{3}|6553[0-5]|65535)$/,
  serverPath: /^[a-zA-Z0-9\/]+$/,
  serverAddress: /^(?!-)[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*$/,
};
