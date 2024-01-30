O IFCalc foi feito em Next.js no intuito de auxiliar os alunos do Instituto Federal de Mato Grosso a visualizarem suas notas de uma maneira simplificada.

## Autenticação OAuth 🗝️
O Oauth do SUAP só funcionará em campi de MT.  
Pois cada IF possui SUAPs diferentes, utilizando OAuths diferentes.
Se deseja criar uma versão pro seu estado, [confira esta seção](#fazer-o-próprio-deploy-da-aplicação-🚀).

Além disso, não possuímos informação de sua senha de login,
pois o seu login é verificado pelo SUAP, que então envia um JWT (Json Web Token), 
cujo você não deve compartilhar com ninguém, pois contém acesso aos seus dados pessoais,
para obtermos seus dados e assim acessar suas notas a partir da API do próprio SUAP.

## Fazer o próprio deploy da aplicação 🚀
Para fazer o deploy da aplicação é bem simples:
- Você deve criar uma aplicação OAuth (https://suap.ifmt.edu.br/admin/api/aplicacaooauth2/);
  - A aplicação deve ser do tipo Authorization Code e Confidential;
  - O campo de Redirect URIs deve conter o seu callback de login (exemplo: http://localhost:3000/api/auth/callback/suap);
  - Não é necessário um algoritmo específico, pois não é usado OIDC (OpenID Connect) no projeto.
- Configure as variáveis de ambiente com o seu client ID (CLIENT_ID) e client secret (CLIENT_SECRET);
- A variável AUTH_SECRET deve ser uma chave aleatória. (https://authjs.dev/reference/core#secret);
- Faça o deploy em uma host ([Vercel](https://vercel.com/) como exemplo).