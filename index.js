const express = require("express")
// EXPORTANDO BIBLIOTECA "EXPRESS"( responsavel pela criação de rotas ).
const cors = require("cors")
// EXPORTANDO BIBLIOTECA "CORS"( responsavel pela licença de utilização da API ).
const uuid = require("uuid")
// EXPORTANDO BIBLIOTECA "UUID"( responsavel pela criação de padrões de ID's ).
const {req, res, json} = require("express")
// EXPORTANDO 3 OBJETOS ESPECÍFICOS DO "EXPRESS"( "req" e "res" são abreviações para "request" e "response", "json" transforma objetos JS em strings .json  ).

app.use(express.json())
// "APP" PERMITE O USO DE "EXPRESS".
app.use(cors())
// "APP" PERMITE O USO DO "CORS".

const app = express()
// CRIA UMA INSTÂNCIA DO APLICATIVO "EXPRESS".

const port = 3001
const users = []
// ARREY. GUARDAR USERS.

const idMiddleware = (req, res, next) => {
    const {id} = req.params
    // OBTEM A INFORMAÇÃO "id" A PARTIR DE "req.params( BARRA DE PESQUISA / URL )".
    
    const index = users.findIndex(user => user.id === id)
    // VERIFICA SE O "id" PERTENCENTE AO ATUAL "user" CORRESPONDE AO "id" FORNECIDO COMO PARÂMETRO.

    if (index < 0){
        // SE INDEX RETORNAR INFORMAÇÃO "false" = "-1" RETORNAR... ( proxima linha )
        return res.status(404).json({error: "user not found"})
        // RETORNA ".status" E EM FORMA DE .json UMA MENSGEM DE ERRO: "error"
    }

    req.id = id
    // PROPRIEDADE "id" ADICIOPNADA AO "req" PARA USO NAS ROTAS.
    req.index = index
    // PROPRIEDADE "index" ADICIOPNADA AO "req" PARA USO NAS ROTAS.

    next()
    // PERMITE PROSSEGUIMENTO DA APLICAÇÃO NODE.
}

app.get("/users", (req, res) => {
    // ROTA "get" PARA OBTER TODOS OS USUÁRIOS.
  return res.status(200).json({ users });
  // RETORNA ".status" E EM FORMA DE .json TODOS MEUS USUÁRIOS: "users".
});

app.post("/users", (req, res) => {
    // ROTA "post" PARA CRIAÇÃO DE USUÁRIOS.
  const { name, age } = req.body;
  // OBTEM INFORMAÇÕES DE "name" E "age" A PARTIR DE "req.body( 'body' = CORPO DA APLICAÇÃO )".

  const newUser = { id: uuid.v4(), name, age };
  // CRIA "newUser" EM FORMA DE OBJETO COM PARÂMETROS "id", "name" E "age".
  users.push(newUser);
  // ADICIONA "newUser" AO ARREY DE USUÁRIOS "users".

  return res.status(200).json({ message: "Create user successfully" });
  // RETORNA ".status" E EM FORMA DE .json: 'message: "Create user successfully"'.
});

app.get("/users/:id", idMiddleware, (req, res) => {
    // ROTA "get" PARA OBTER "user" ESPECÍFICO.
  const index = res.index;
  // OBTEM INFORMAÇÃO "index" A PARTIR DO MEU MIDDLEWARE "idMiddleware".
  const userIndex = users[index];
  // OBTEM "index" REFERENTE AO "id" DO "user" REQUERIDO.

  return res.status(200).json({ userIndex });
   // RETORNA ".status" E EM FORMA DE .json O OBJETO "user" DO "id" FORNECIDO: "userIndex".
});

app.put("/users/:id", idMiddleware, (req, res) => {
     // ROTA "put" PARA ATUALIZAÇÃO DE USUÁRIOS: "user".
  const index = req.index;
  // OBTEM INFORMAÇÃO "index" A PARTIR DO MEU MIDDLEWARE "idMiddleware".
  const id = req.id;
  // OBTEM INFORMAÇÃO "id" A PARTIR DO MEU MIDDLEWARE "idMiddleware".

  const { name, age } = req.body;
  // OBTEM INFORMAÇÕES DE "name" E "age" A PARTIR DE "req.body( 'body' = CORPO DA APLICAÇÃO )".

  const updateUser = { id, name, age };
  // CRIA NOVO OBJETO COM AS NOVAS INFORMAÇÕES FORNECIDAS: "name" E "age".
  users.push(updateUser);
  // ADICIONA "updateUser" AO ARREY DE USUÁRIOS "users".

  return res.status(200).json({ message: "Update user successfully" });
  // RETORNA ".status" E EM FORMA DE .json: 'message: "Update user successfully"'.
});

app.delete("/users/:id", idMiddleware, (req, res) => {
     // ROTA "delete" PARA EXCLUSÃO DE USUÁRIOS: "user".
  const index = req.index;
  // OBTEM INFORMAÇÃO "index" A PARTIR DO MEU MIDDLEWARE "idMiddleware".

  users.splice(index, 1);
  // EXCLUI OBJETOS A PARTIR DA INFROMAÇÃO "index" FORNECIDA.

  return res.status(200).json({ message: "Delete user successfully" });
  // RETORNA ".status" E EM FORMA DE .json: 'message: "Delete user successfully"'.
});

app.listen(port, () => {
    // INICIA O SERVIDOR NA PORTA ESPECÍFICADA.
  console.log(`Server started on port ${port}🔥`);
  // RETORNA NO "PROMPT DE COMANDO" message: "`Server started on port ${port}🔥`"
});