/**
 * 🌭 CACHORRO DO BIGODE — DESEMPENHO
 * Backend Google Apps Script para sincronizar com o app
 *
 * Como usar:
 * 1. Abra a planilha do Google Sheets
 * 2. Menu Extensões → Apps Script
 * 3. APAGUE todo o código que aparece e cole TODO ESTE arquivo
 * 4. Salve (ícone disquete ou Ctrl+S)
 * 5. Clique em "Implantar" → "Nova implantação"
 * 6. Tipo: "Aplicativo da Web"
 * 7. Quem tem acesso: "Qualquer pessoa"
 * 8. Implantar → Autorize quando solicitado
 * 9. Copie a URL que terminar em /exec
 * 10. Cole essa URL no app (Configurações → Sincronizar com Google Sheets)
 *
 * IMPORTANTE: ao mudar este script, SEMPRE clique em "Implantar"
 * → "Gerenciar implantações" → "Editar" → "Nova versão" → Implantar.
 * Senão a URL continua rodando o código antigo.
 */

const ABA_DADOS = 'dados_app';
const ABA_RESUMO = 'resumo_legivel';

/* ==========================================================================
   ENDPOINT GET — chamado pelo app pra LER dados
   ========================================================================== */
function doGet(e) {
  try {
    const action = e?.parameter?.action || 'read';
    if (action === 'read') {
      const dados = lerDados();
      return jsonResponse(dados);
    }
    return jsonResponse({ error: 'Ação desconhecida: ' + action });
  } catch (err) {
    return jsonResponse({ error: err.toString() });
  }
}

/* ==========================================================================
   ENDPOINT POST — chamado pelo app pra ESCREVER dados
   ========================================================================== */
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const action = body.action || 'write';

    if (action === 'write') {
      escreverDados(body.state);
      return jsonResponse({ ok: true, savedAt: new Date().toISOString() });
    }
    return jsonResponse({ error: 'Ação desconhecida: ' + action });
  } catch (err) {
    return jsonResponse({ error: err.toString() });
  }
}

/* ==========================================================================
   LEITURA — pega o JSON salvo na célula A1 da aba dados_app
   ========================================================================== */
function lerDados() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let aba = ss.getSheetByName(ABA_DADOS);
  if (!aba) {
    return { colaboradores: [] };
  }
  const json = aba.getRange('A1').getValue();
  if (!json) return { colaboradores: [] };
  try {
    return JSON.parse(json);
  } catch {
    return { colaboradores: [] };
  }
}

/* ==========================================================================
   ESCRITA — salva o JSON e atualiza a aba legível pra leitura humana
   ========================================================================== */
function escreverDados(state) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Aba 1: dados brutos (JSON na A1) — fonte da verdade
  let aba = ss.getSheetByName(ABA_DADOS);
  if (!aba) {
    aba = ss.insertSheet(ABA_DADOS);
    aba.getRange('A1').setNote('NÃO EDITE MANUALMENTE — esta célula é o backup do app. Para ver os dados de forma legível, vá na aba "resumo_legivel".');
  }
  aba.getRange('A1').setValue(JSON.stringify(state || { colaboradores: [] }));

  // Aba 2: resumo legível pra humanos
  atualizarResumoLegivel(state);
}

/* ==========================================================================
   RESUMO LEGÍVEL — popula a aba humana com 2 tabelas
   ========================================================================== */
function atualizarResumoLegivel(state) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let aba = ss.getSheetByName(ABA_RESUMO);
  if (!aba) {
    aba = ss.insertSheet(ABA_RESUMO);
  }
  aba.clear();

  const colabs = (state && state.colaboradores) || [];

  // === TABELA 1: COLABORADORES (resumo) ===
  aba.getRange('A1').setValue('COLABORADORES — RESUMO').setFontWeight('bold').setFontSize(14);
  aba.getRange('A1:K1').merge().setBackground('#680505').setFontColor('#FECF23').setHorizontalAlignment('center');

  const cabResumo = ['Nome','Cargo','Unidade','Início','Tempo casa','Total aval.','Última data','Última média','Recomendação','Status','Auto pendente'];
  aba.getRange(2, 1, 1, cabResumo.length).setValues([cabResumo])
     .setBackground('#FECF23').setFontWeight('bold').setFontColor('#680505');

  const linhasResumo = colabs.map(c => {
    const av = (c.avaliacoes || []).slice().sort((a,b) => new Date(b.data) - new Date(a.data));
    const u = av[0];
    const m = u ? mediaAval(u) : '';
    const r = u ? recomendacao(m) : '';
    return [
      c.nome || '',
      c.cargo || '',
      c.unidade || '',
      c.dataInicio || '',
      tempoCasa(c.dataInicio),
      (c.avaliacoes || []).length,
      u ? u.data : '',
      m !== '' ? Number(m.toFixed(2)) : '',
      r,
      c.ativo === false ? 'Inativo' : 'Ativo',
      c.autoAvaliacaoPendente ? 'SIM' : ''
    ];
  });
  if (linhasResumo.length) {
    aba.getRange(3, 1, linhasResumo.length, cabResumo.length).setValues(linhasResumo);
  }

  // === TABELA 2: AVALIAÇÕES (detalhado) ===
  const inicioAval = 3 + linhasResumo.length + 2;
  aba.getRange(inicioAval, 1).setValue('AVALIAÇÕES — DETALHADO').setFontWeight('bold').setFontSize(14);
  aba.getRange(inicioAval, 1, 1, 11).merge().setBackground('#680505').setFontColor('#FECF23').setHorizontalAlignment('center');

  const cabAval = ['Colaborador','Cargo','Data','Avaliador','Média geral','Recomendação','Média auto','Gap percepção','Pontos fortes','Pontos a melhorar','Plano de ação'];
  aba.getRange(inicioAval + 1, 1, 1, cabAval.length).setValues([cabAval])
     .setBackground('#FECF23').setFontWeight('bold').setFontColor('#680505');

  const linhasAval = [];
  colabs.forEach(c => {
    (c.avaliacoes || []).forEach(a => {
      const m = mediaAval(a);
      const cargoEpoca = a.cargoNaEpoca || c.cargo;
      let mediaAuto = '', gap = '';
      if (a.auto && a.auto.criterios) {
        const va = Object.values(a.auto.criterios).filter(n => typeof n === 'number');
        if (va.length) {
          const ma = va.reduce((s,b) => s+b, 0) / va.length;
          mediaAuto = Number(ma.toFixed(2));
          gap = Number((m - ma).toFixed(2));
        }
      }
      linhasAval.push([
        c.nome, cargoEpoca, a.data, a.avaliador || '',
        Number(m.toFixed(2)), recomendacao(m),
        mediaAuto, gap,
        (a.pontosFortes || ''),
        (a.pontosFracos || ''),
        (a.acoes || '')
      ]);
    });
  });
  if (linhasAval.length) {
    aba.getRange(inicioAval + 2, 1, linhasAval.length, cabAval.length).setValues(linhasAval);
  }

  // Auto-ajusta colunas pra ficar bonito
  for (let col = 1; col <= 11; col++) aba.autoResizeColumn(col);
}

/* ==========================================================================
   HELPERS
   ========================================================================== */
function mediaAval(av) {
  const vals = Object.values(av.criterios || {}).filter(n => typeof n === 'number');
  if (!vals.length) return 0;
  return vals.reduce((a,b) => a+b, 0) / vals.length;
}

function recomendacao(media) {
  if (media < 2.5) return 'PRD — Plano de Recuperação';
  if (media < 3.5) return 'DEV — Em desenvolvimento';
  if (media < 4.3) return 'OK — Cumpre o esperado';
  if (media < 4.8) return 'EXP — Pronto p/ novas responsabilidades';
  return 'PROMO — Pronto para promoção';
}

function tempoCasa(dataInicio) {
  if (!dataInicio) return '';
  const d = new Date(dataInicio);
  if (isNaN(d)) return '';
  const hoje = new Date();
  let anos = hoje.getFullYear() - d.getFullYear();
  let meses = hoje.getMonth() - d.getMonth();
  if (hoje.getDate() < d.getDate()) meses--;
  if (meses < 0) { anos--; meses += 12; }
  if (anos === 0 && meses === 0) return 'menos de 1 mês';
  if (anos === 0) return meses + (meses === 1 ? ' mês' : ' meses');
  if (meses === 0) return anos + (anos === 1 ? ' ano' : ' anos');
  return anos + 'a ' + meses + 'm';
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
