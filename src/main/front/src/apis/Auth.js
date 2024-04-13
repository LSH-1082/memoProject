import Api from "./Api";

export const login = (data) => Api.post(`http://localhost:8080/login`, data);
export const register = (data) => Api.post(`http://localhost:8080/user/register/`, data);
