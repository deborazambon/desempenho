# 🌭 Cachorro do Bigode — Desempenho

Sistema interno de **avaliação de desempenho de colaboradores** da rede Cachorro do Bigode, gerido pela **Mitawa Licenciadora Ltda.**

App roda 100% no navegador (sem servidor, sem custo, sem vazamento). Os dados ficam salvos **localmente no navegador** de quem usa.

---

## ✨ O que ele faz

- **Cadastro de colaboradores** com nome, cargo, data de início, unidade e CPF.
- **9 cargos** mapeados (Atendente, Auxiliar de cozinha, Monitor, Líder de equipe, Supervisor, Gerente, Auxiliar/Supervisor/Gerente administrativo) — cada um com critérios específicos.
- **10 critérios universais** aplicados a todos os cargos (pontualidade, postura ética, comprometimento com a marca, etc.).
- **Avaliação por escala 1–5** (Insatisfatório → Excelência).
- **Recomendação automática** com base na média:
  - `< 2,5` → **PRD** — Plano de Recuperação de Desempenho
  - `2,5–3,4` → **DEV** — Em desenvolvimento
  - `3,5–4,2` → **OK** — Cumpre o esperado
  - `4,3–4,7` → **EXP** — Pronto para novas responsabilidades
  - `≥ 4,8` → **PROMO** — Pronto para promoção
- **Auto-avaliação para liderança** (Líder de equipe, Supervisor, Gerente, Supervisor adm., Gerente adm.): o colaborador preenche como se vê *antes* da reunião com o gestor. Na hora da avaliação oficial, o app mostra a nota do colaborador ao lado da do gestor e calcula automaticamente o **gap de percepção** — gap baixo (<0,5) = alinhamento; gap médio (0,5 a 1) = atenção; gap alto (>1) = conversa profunda na reunião.
- **Trilha de carreira** sugerida automaticamente (Atendente → Monitor → Líder → Supervisor → Gerente).
- **Histórico completo** por colaborador, com gráfico de evolução das avaliações.
- **Pontos fortes e a melhorar** destacados automaticamente + campos livres para o gestor anotar plano de ação.
- **Dashboard** com top performers, atenção, total de avaliações no mês, prontos pra promoção e atrasados (>90 dias sem avaliação).
- **Backup** em JSON e exportação em CSV.
- **Identidade visual** alinhada ao MIV 2024 (bordô, vermelho, amarelo, Anton/Mulish como aproximação web de Thunderhouse Pro/Owners).

---

## 🚀 Como publicar no GitHub Pages (5 minutos)

1. **Crie uma conta no GitHub** em [github.com](https://github.com) (gratuita).
2. **Crie um novo repositório** chamado `cachorro-do-bigode-desempenho` (público).
3. **Faça upload dos arquivos** deste projeto (botão *Add file* → *Upload files* → arrasta tudo).
4. Vá em **Settings → Pages**.
5. Em *Source*, selecione **Deploy from a branch** → branch `main` → folder `/ (root)` → **Save**.
6. Aguarde 1–2 minutos. O link aparecerá no topo da página de Pages, no formato:
   `https://SEUUSUARIO.github.io/cachorro-do-bigode-desempenho/`
7. **Abra esse link no celular** (Safari/Chrome). No iPhone, toque em compartilhar → *Adicionar à Tela de Início*. Vira ícone igual app.

> 🔒 Os dados ficam **somente no navegador de quem usar**. Cada gestor terá seus próprios dados se acessar de dispositivos diferentes. Se quiser dados compartilhados na rede toda, precisa evoluir pra backend (próxima fase).

---

## 💾 Backup recomendado

Toda última sexta-feira do mês:

1. Abre o app → aba **Configurações**.
2. Clica **Exportar JSON** → salva o arquivo em pasta segura (Drive / OneDrive da Mitawa).
3. Se trocar de celular ou navegador: **Importar JSON** restaura tudo.

---

## 🛠️ Stack técnica

- **HTML + React 18 (CDN)** — sem build, sem dependências locais.
- **Tailwind CSS (CDN)** — estilos rápidos e consistentes.
- **localStorage** — persistência client-side.
- **Google Fonts**: Anton (display) + Mulish (corpo) — substituição web livre de Thunderhouse Pro / Owners.

Tudo em um único `index.html` (~55 KB). Funciona offline depois da primeira abertura.

---

## 📋 Critérios de avaliação (resumo)

### Universais (todos os cargos)

Pontualidade, apresentação pessoal/uniforme, comprometimento com a marca, trabalho em equipe, comunicação, postura ética, cumprimento de normas, atitude proativa, resiliência sob pressão, higiene.

### Específicos por cargo

| Cargo | Foco da análise |
|---|---|
| **Atendente** | Cordialidade, conhecimento de cardápio, velocidade, upsell, PDV |
| **Auxiliar de cozinha** | Padronização, segurança alimentar, mise en place, desperdício |
| **Monitor** | Apoio operacional, conferência de procedimentos, suporte a novatos |
| **Líder de equipe** | Liderança, gestão de conflitos, treinamento, metas de turno |
| **Supervisor** | Indicadores (NPS, ticket, vendas), estoque, escalas, auditoria |
| **Gerente** | DRE, gestão de pessoas, relacionamento com franqueador, padrões |
| **Auxiliar administrativo** | Documentação, atenção a detalhes, ERP, sigilo |
| **Supervisor administrativo** | Processos, análise de dados, conformidade, fornecedores |
| **Gerente administrativo** | Estratégia, financeiro, compliance, governança, automação |

---

## 🔄 Roadmap (próximas fases)

- [ ] **Backend compartilhado** (Firebase/Supabase) pra todos os gestores verem os mesmos dados em tempo real.
- [ ] **Login por gestor** com permissões diferentes.
- [ ] **Avaliação 360°** (pares e subordinados).
- [ ] **Notificações automáticas** quando alguém estiver há 90+ dias sem avaliação.
- [ ] **PDF de feedback** assinado pelo gestor e colaborador.
- [ ] **Integração com folha** pra gatilho de aumento/promoção.
- [x] ~~Auto-avaliação do colaborador antes da reunião~~ (v1.1)

---

## 📝 Licença

Uso interno Mitawa Licenciadora Ltda. — Cachorro do Bigode®.
