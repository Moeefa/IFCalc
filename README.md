### O [IFCalc](https://ifcalc.vercel.app) foi feito com Next.js no intuito de auxiliar os alunos do Instituto Federal de Mato Grosso a visualizarem suas notas de uma maneira simplificada.

# Autenticação OAuth 🗝️

O Oauth do SUAP só funcionará em campi que está na lista de `providers` em `src/auth.ts`.
Pois cada IF possui SUAPs diferentes, utilizando OAuths diferentes.
Se deseja adicionar o SUAP do seu campi confira a seção abaixo, ou caso queira criar uma versão para os campi do seu estado, confira a seção de como fazer o deploy da aplicação.

Além disso, não possuímos informação de sua senha de login,
pois o seu login é verificado pelo SUAP, que então envia um JWT (Json Web Token),
cujo você não deve compartilhar com ninguém, pois contém acesso aos seus dados pessoais,
para obtermos seus dados e assim acessar suas notas a partir da API do próprio SUAP.

# Como adicionar o seu campus ao IFCalc 📚

- Você deve criar uma aplicação OAuth no seu SUAP (https://suap.ifmt.edu.br/admin/api/aplicacaooauth2/);

  - O nome da aplicação necessariamente deve ser somente "IFCalc";
  - A aplicação deve ser do tipo Authorization Code e Confidential;
  - O campo de Redirect URIs deve conter o seu callback de login utilizado nos ambientes de teste e produção do IFCalc. Substitua `[SIGLA_DO_ESTADO]` pela sigla do seu estado em minúsculo (exemplo: mt, sp, rj...), cada URL deve ser separado por um espaço.

    - ```
      https://ifcalc.vercel.app/api/auth/callback/suap_if[SIGLA_DO_ESTADO]

      http://localhost:3000/api/auth/callback/suap_if[SIGLA_DO_ESTADO]

      https://ifcalc-git-preview-moeefa.vercel.app/api/auth/callback/suap_if[SIGLA_DO_ESTADO]

      https://ifcalc-git-preview-moes-projects-45a4825b.vercel.app/api/auth/callback/suap_if[SIGLA_DO_ESTADO]
      ```

  - Não é necessário um algoritmo específico, pois não é usado OIDC (OpenID Connect) no projeto.

- Devido ao token do OAuth correr o risco de ser exposto ou caso de duvidas, você pode entrar em contato comigo atráves das redes sociais incluídas na página de autenticação do IFCalc ou no perfil do GitHub.

# Fazer deploy da aplicação 🚀

Para fazer o deploy da aplicação é bem simples:

- Você deve criar uma aplicação OAuth no seu SUAP (https://suap.ifmt.edu.br/admin/api/aplicacaooauth2/);
  - A aplicação deve ser do tipo Authorization Code e Confidential;
  - O campo de Redirect URIs deve conter o seu callback de login (exemplo: http://localhost:3000/api/auth/callback/[ID_DO_PROVIDER]);
  - Não é necessário um algoritmo específico, pois não é usado OIDC (OpenID Connect) no projeto.
- Configure as variáveis de ambiente com o seu client ID (AUTH\_`[ID_DO_PROVIDER]`\_ID) e client secret (AUTH\_`[ID_DO_PROVIDER]`\_SECRET);
- A variável AUTH_SECRET deve ser uma chave aleatória. (https://authjs.dev/reference/core#secret);
- Faça o deploy em uma host ([Vercel](https://vercel.com/) como exemplo).
