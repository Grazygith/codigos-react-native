import axios from "axios";

const api = axios.create({
   //Bloqueio https Senac
   //baseURL:'https://viacep.com.br/ws'
   baseURL:'https://viacep.com.br/ws'
});

export default api;