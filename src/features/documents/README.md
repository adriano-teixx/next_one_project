# Documents Feature

Padrao de organizacao para telas de documentos fiscais.

## Responsabilidades

- `screens/`: telas roteaveis do produto, como `NfeScreen`, `NfseScreen` e `CteScreen`.
- `adapters/`: configuracoes com renderers/JSX que conectam dados da feature com componentes reutilizaveis.
- `components/table/`: composicao do datatable, cabecalho, linhas, celulas e camada de acoes por hover.
- `components/toolbar/`: busca, filtros, periodo, tabs e acoes em massa.
- `components/company/`: selecao de empresas e chamadas do contexto da tela.
- `components/columns/` e `components/filters/`: overlays especificos da experiencia de documentos.
- `components/feedback/`: footer, empty states e mensagens de apoio.
- `config/`: copy visual e configuracoes puras da tela.
- `types/`: contratos de dados da feature.
- `api/`: fonte de dados. Hoje usa mock com formato de API, depois troca pela API real.
- `hooks/`: adaptadores de estado/dados para as screens.

## Regra

Componente nao deve possuir mock interno nem regra de tela. Dados entram por props tipadas. A screen decide o fluxo, configura dados e conecta hooks/API.
