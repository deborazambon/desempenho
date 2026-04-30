# 🔗 Como conectar o app ao Google Sheets

**Tempo:** ~15 minutos. **Faz uma vez só.** West e Michael depois é só colar a URL final.

---

## 📋 Resultado final

Quando terminar:

- ✅ App roda no celular salvando tudo numa planilha do Sheets em tempo real
- ✅ West e Michael colam a mesma URL e veem os mesmos dados
- ✅ Tu abre o Sheets pelo computador e vê tudo numa aba legível
- ✅ Funciona offline também — quando voltar online, sincroniza sozinho

---

## PASSO 1 — Criar a planilha (2 min)

1. Acessa **sheets.google.com**
2. Clica em **+ Em branco**
3. Renomeia para: **CDB - Desempenho Database**
4. Pronto, deixa aberta

---

## PASSO 2 — Abrir o Apps Script (1 min)

1. Na planilha aberta, menu superior: **Extensões** → **Apps Script**
2. Vai abrir uma nova aba/janela com um editor de código
3. Vai aparecer um arquivo `Code.gs` com algo tipo:
   ```js
   function myFunction() {
   }
   ```

---

## PASSO 3 — Colar o código (2 min)

1. **APAGA tudo** que está dentro do `Code.gs` (Ctrl+A, Delete)
2. Abre o arquivo `apps_script.gs` que eu te enviei
3. **Copia TODO o conteúdo** dele
4. **Cola** dentro do `Code.gs` no editor do Apps Script
5. Renomeia o arquivo: clica no nome `Code.gs` na esquerda → renomeia para `desempenho_cdb`
6. **Salva:** ícone de disquete 💾 no topo (ou Ctrl+S)
7. Vai pedir um **nome do projeto** → coloca: `CDB Desempenho Backend`

---

## PASSO 4 — Publicar como Web App (3 min)

⚠️ **Esse passo é o mais importante. Sem ele, não funciona.**

1. Botão azul **Implantar** (canto superior direito) → **Nova implantação**
2. Em **Selecionar tipo** (engrenagem ⚙️ ao lado de "Selecionar tipo"), escolhe **Aplicativo da Web**
3. Preenche:
   - **Descrição:** `v1` (qualquer texto)
   - **Executar como:** **Eu (seu email)**
   - **Quem tem acesso:** **Qualquer pessoa** (importante! mesmo soando perigoso, é o único jeito do app no GitHub Pages chamar o script — a URL é secreta, só quem tem ela acessa)
4. Clica **Implantar**
5. Vai pedir **autorização** — clica **Autorizar acesso** → escolhe sua conta Google → vai aparecer um aviso "Google não verificou este app". É normal. Clica em **Avançado** → **Acessar CDB Desempenho Backend (não seguro)** → **Permitir**
6. Vai aparecer uma tela com **URL do aplicativo da Web** terminando em **/exec**
7. **COPIA essa URL inteira** e guarda no app Notas com Face ID

> 💡 A URL será algo tipo: `https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/exec`

8. Clica **Concluído**

---

## PASSO 5 — Conectar o app à URL (2 min)

Agora vai pra teu app (no celular ou computador):

1. Abre o app Cachorro do Bigode Desempenho
2. Vai na aba **Configurações**
3. Procura a seção **🔗 SINCRONIZAR COM GOOGLE SHEETS**
4. Cola a URL que tu copiou no campo
5. Clica **🔌 CONECTAR**
6. Aguarda. Deve aparecer **✅ SHEETS SYNC ATIVO**

---

## PASSO 6 — Primeiro envio (1 min)

Se tu já tinha colaboradores cadastrados localmente:

1. Na seção do Sheets, clica em **⬆️ ENVIAR LOCAL → SHEETS**
2. Vai mostrar "✅ Sincronizado!"
3. Volta pra planilha do Sheets — vai ter aparecido **2 abas novas**: `dados_app` (não mexer) e `resumo_legivel` (a que tu lê)

---

## PASSO 7 — Compartilhar com West e Michael (2 min)

### Opção A — Cada um cola a URL no app dele

1. Tu manda a URL que copiaste por **WhatsApp privado** ou **email**
2. Eles colam no app deles (Configurações → Sincronizar com Sheets)
3. Pronto, todos sincronizados

### Opção B — Tu também compartilha a planilha pra eles verem direto

1. Na planilha do Sheets, botão azul **Compartilhar** (canto superior direito)
2. Adiciona email do West e do Michael
3. Permissão: **Editor** (se quer que possam editar manualmente em emergência) ou **Leitor** (se só veem)
4. Envia

---

## ⚠️ Cuidados importantes

### Quando tu MUDAR algo no `apps_script.gs`

Tem que **republicar uma nova versão** pra surtir efeito. Caso contrário, a URL continua rodando o código antigo.

1. No editor do Apps Script, **Implantar** → **Gerenciar implantações**
2. Clica no ícone de **lápis** (editar) na implantação ativa
3. Em **Versão**, escolhe **Nova versão**
4. Clica **Implantar**
5. **A URL continua a mesma** ✅ (não precisa atualizar no app)

### Conflitos de edição simultânea

Se Tu, West e Michael editarem **AO MESMO TEMPO**, o último a salvar sobrescreve os outros. **Probabilidade real de acontecer:** muito baixa, vocês não trabalham todos na mesma avaliação ao mesmo tempo. Mas se virar problema real, me avisa que evoluímos para uma estratégia de merge.

### A célula A1 da aba `dados_app`

NÃO MEXE NELA MANUALMENTE NUNCA. É onde fica o JSON com tudo. Se editar errado, perde os dados (mas tu tem o `resumo_legivel` como histórico, dá pra reconstruir).

### Cota do Apps Script

Google permite **20.000 execuções por dia** no plano grátis. Com 3 gestores e uso normal, vocês usam ~50/dia. Não chega nem perto.

### Backup de segurança

Mesmo com Sheets sync, **uma vez por mês exporta JSON** (Configurações → Avançado → Backup completo). Salva no Drive numa pasta "Backup CDB". É a tua rede de segurança caso algo dê muito errado.

---

## 🆘 Problemas comuns

| Problema | Causa | Solução |
|---|---|---|
| App diz "Falha ao escrever" | Apps Script desatualizado | Republica nova versão (ver acima) |
| URL não funciona | Esqueceu de marcar "Qualquer pessoa" no acesso | Edita a implantação e troca |
| Aba `resumo_legivel` vazia | Ainda não enviou dados pelo app | Toca em "Enviar Local → Sheets" |
| West vê dados diferentes | Cada um conectado a uma URL diferente | Verifica se URL é idêntica nos 3 celulares |
| Erro CORS no console | Apps Script não publicado como Web App | Refaz o passo 4 |

---

## ✅ Como saber que está funcionando

1. Cadastra um colaborador fictício no app (ex: "Teste 1234")
2. Aguarda 3 segundos
3. Abre a planilha no computador
4. Aba `resumo_legivel` → deve aparecer "Teste 1234" na lista
5. Apaga o teste, aguarda mais 3 segundos
6. Confere que sumiu da planilha

🌭 **Funcionou? Bora trabalhar.**
