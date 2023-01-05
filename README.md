O IFCalc foi feito em React (Next.js) no intuito de auxiliar os alunos a visualizarem suas notas.  
Os alunos podem salvar, editar e excluir suas notas no banco de dados.

## Autenticação/OAuth
O Oauth do SUAP só funciona em campus de MT.  
Pois cada IF possui SUAPs diferentes, utilizando OAuths diferentes.  

Além disso, não possuímos informação de sua senha de login,
pois o seu login é verificado pelo SUAP, que então envia um token 
(cujo você não deve compartilhar com ninguém, pois contém seus dados pessoais)
para obtermos sua matrícula e assim acessar suas notas a partir do nosso banco de dados.
