# Listar enquestes
⛔️✅

> ## Caso de uso
1. ⛔️ Recebe uma requisição do tipo **GET** na rota **/api/surveys**
2. ⛔️ Valida se a requiisção foi feita por uma usuário
3. ✅ Retorna 204 se não tiver nenhuma enquete
4. ✅ Retorna 200 com os dados das esquestes

> ## Exceções

1. ⛔️ Retorna erro 404 se a API não existir
2. ⛔️ Retorna erro se não for usuário
3. ✅ Retorna erro 500 se der erro ao tentar listar as enquetes