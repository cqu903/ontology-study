# Palantir Ontology 学习资源库

> 原则：只用一手与高信源。知识类条目必须标注"用于什么"。营销页多为 JS 渲染，抓取不到正文时以 docs 子域为准。

## Knowledge

- [Docs: Ontology Overview — Palantir Foundry 官方文档](https://www.palantir.com/docs/foundry/ontology/overview/)
  本体层的官方总纲："an operational layer for the organization"，语义元素（objects/properties/links）+ 动力学元素（actions/functions/动态安全）。用于：一切概念的原始定义出处。已验证可抓取。
- [Docs: Core Concepts — 核心概念定义表](https://palantir.com/docs/foundry/ontology/core-concepts)
  官方精确定义：object type / property / link type / action type / function / interface / roles，以及 dataset→ontology 映射类比表（dataset→object type, row→object, column→property, join→link）。用于：术语的权威对照。已验证可抓取。
- [Docs: Object Types Overview](https://palantir.com/docs/foundry/object-link-types/object-types-overview)
  对象与链接类型的设计细节。用于：自建对象模型时的字段/主键/绑定设计参考。（搜索验证存在，正文未抓取）
- [Docs: Action Types Overview](https://palantir.com/docs/foundry/action-types/overview)
  行动类型——writeback 机制的核心。用于：设计决策闭环与写回路径。（搜索验证存在，正文未抓取）
- [Docs: Ontology Architecture (Object Backend)](https://palantir.com/docs/foundry/object-backend/overview)
  本体后端架构：对象索引、多数据源绑定（MDO）。用于：论证"本体不绑定单一数据存储"。（搜索验证存在，正文未抓取）
- [Paper: "ForestGPT and Beyond: A Trustworthy Domain-Specific LLM" — MDPI Electronics 2025](https://www.mdpi.com/2079-9292/14/18/3583)
  学术侧对 Ontology-Augmented Generation (OAG) 的描述："an enterprise superset of RAG"，将实时运营数据与逻辑绑定进生成过程。用于：AI Agent 接入本体层的概念支撑与引用。

## Wisdom (Communities)

- [Palantir Community 论坛](https://community.palantir.com/)
  官方社区，Foundry/AIP 实践者答疑。用于：具体建模与落地疑问。
- [r/Palantir](https://www.reddit.com/r/palantir/)
  从业者密度较高的讨论区，常见"ontology 到底值不值"的一手争论。用于：买 vs 建的民间证据。

## Gaps（待补充，驱动后续搜索）

- 自建本体层的架构模式：headless ontology / semantic layer 开源方案（如Cube、dbt Semantic Layer、RDF/OWL 工具链）与 Palantir 式 operational layer 的差距分析
- writeback/决策闭环的自建模式：事件溯源（event sourcing）与 action type 的对应关系
- 金融/保险行业的本体建模公开案例（反欺诈、理赔、授信场景）
- AI Agent 工具化本体的模式：tool-hosted logic、function calling 与 ontology 的映射
