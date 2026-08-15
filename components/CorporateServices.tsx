import React, { useState, useEffect } from 'react';
import { X, FileCheck, ShieldCheck, Scale, Package, PieChart, Target, Lock, TrendingDown, Factory, Globe } from 'lucide-react';

const iconsData: any = {
  FileCheck: <FileCheck size={28} strokeWidth={1.5} />,
  ShieldCheck: <ShieldCheck size={28} strokeWidth={1.5} />,
  Scale: <Scale size={28} strokeWidth={1.5} />,
  Package: <Package size={28} strokeWidth={1.5} />,
  PieChart: <PieChart size={28} strokeWidth={1.5} />,
  Target: <Target size={28} strokeWidth={1.5} />,
  Lock: <Lock size={28} strokeWidth={1.5} />,
  TrendingDown: <TrendingDown size={28} strokeWidth={1.5} />,
  Factory: <Factory size={28} strokeWidth={1.5} />,
  Globe: <Globe size={28} strokeWidth={1.5} />
};

export const CorporateServices: React.FC<{ lang: string }> = ({ lang }) => {
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openModalIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [openModalIndex]);

  const data = {
  header: {
    title: {
      es: "Facilitación de Exportaciones y Sourcing B2B en Paraguay",
      en: "Export Facilitation and B2B Sourcing in Paraguay",
      pt: "Facilitação de Exportações e Sourcing B2B no Paraguai",
      jp: "パラグアイにおける輸出促進とB2Bソーシング",
      de: "Exportförderung und B2B-Sourcing in Paraguay",
      zh: "巴拉圭的出口便利化与B2B采购",
      ar: "تسهيل الصادرات وتوريد B2B في باراغواي"
    },
    desc: {
      es: "Su brazo operativo y legal en territorio paraguayo. Identificamos proveedores verificados, garantizamos el cumplimiento normativo internacional y blindamos la exportación de sus productos desde el origen hasta su destino final.",
      en: "Your operational and legal arm in Paraguayan territory. We identify verified suppliers, ensure international regulatory compliance, and safeguard the export of your products from origin to final destination.",
      pt: "Seu braço operacional e legal no território paraguaio. Identificamos fornecedores verificados, garantimos a conformidade regulatória internacional e blindamos a exportação de seus produtos desde a origem até o destino final.",
      jp: "パラグアイでの運用および法務部門。検証済みのサプライヤーを特定し、国際的な規制コンプライアンスを保証し、原産地から最終目的地まで製品の輸出を保護します。",
      de: "Ihr operativer und rechtlicher Arm in Paraguay. Wir identifizieren verifizierte Lieferanten, stellen die Einhaltung internationaler Vorschriften sicher und schützen den Export Ihrer Produkte vom Ursprung bis zum endgültigen Bestimmungsort.",
      zh: "您在巴拉圭领土内的运营和法律分支。我们确认经过验证的供应商，确保符合国际监管规定，并保障您的产品从原产地到最终目的地的出口。",
      ar: "ذراعك التشغيلي والقانوني في الأراضي الباراغوايانية. نقوم بتحديد الموردين المعتمدين، وضمان الامتثال التنظيمي الدولي، وحماية تصدير منتجاتك من المصدر إلى وجهتها النهائية."
    }
  },
  blocks: [
    {
      label: { es: "01 // Sourcing Estratégico", en: "01 // Strategic Sourcing", pt: "01 // Sourcing Estratégico", jp: "01 // 戦略的ソーシング", de: "01 // Strategisches Sourcing", zh: "01 // 战略采购", ar: "01 // التوريد الاستراتيجي" },
      title: { es: "Agronegocios y Commodities de Alto Rendimiento", en: "High-Yield Agribusiness and Commodities", pt: "Agronegócios e Commodities de Alto Rendimento", jp: "高利回りアグリビジネスと商品", de: "Hochrentable Agrarwirtschaft und Rohstoffe", zh: "高产农业与大宗商品", ar: "الأعمال الزراعية والسلع ذات العائد المرتفع" },
      desc: { es: "Potenciamos la cadena de valor mediante estrategias de inversión de alto impacto. Proveemos asesoramiento experto en gestión de commodities a escala global, maximizando el rendimiento sobre los activos agrícolas con estándares de calidad superior.", en: "We boost the value chain through high-impact investment strategies. We provide expert advice on global commodity management, maximizing returns on agricultural assets with superior quality standards.", pt: "Potencializamos a cadeia de valor por meio de estratégias de investimento de alto impacto. Fornecemos aconselhamento especializado na gestão global de commodities, maximizando o retorno sobre ativos agrícolas com padrões de qualidade superiores.", jp: "影響力の大きい投資戦略を通じてバリューチェーンを強化します。グローバルな商品管理に関する専門的なアドバイスを提供し、優れた品質基準で農業資産の収益を最大化します。", de: "Wir stärken die Wertschöpfungskette durch hochwirksame Anlagestrategien. Wir bieten fachkundige Beratung beim globalen Rohstoffmanagement und maximieren die Rendite von Agrarwerten bei höchsten Qualitätsstandards.", zh: "我们通过高影响力的投资策略提升价值链。我们提供全球大宗商品管理的专家建议，以卓越的质量标准最大化农业资产的回报。", ar: "نعزز سلسلة القيمة من خلال استراتيجيات استثمار عالية التأثير. نقدم مشورة خبراء في إدارة السلع العالمية، مما يزيد من العائد على الأصول الزراعية بمعايير جودة فائقة." },
      readMore: { es: "Leer más...", en: "Read more...", pt: "Leia mais...", jp: "続きを読む...", de: "Weiterlesen...", zh: "阅读更多...", ar: "اقرأ المزيد..." },
      cta: { es: "Agendar Consultoría", en: "Schedule Consultation", pt: "Agendar Consultoria", jp: "コンサルティングを予約する", de: "Beratungstermin vereinbaren", zh: "安排咨询", ar: "جدولة استشارة" },
      ctaLink: { es: "https://wa.me/595993282213?text=Hola%20Lic.%20Olga%20Ihara.%20Me%20contacto%20desde%20la%20secci%C3%B3n%20de%20Servicios%20Corporativos.%20Me%20gustar%C3%ADa%20agendar%20una%20consultor%C3%ADa%20sobre%20Agronegocios%20y%20Commodities%20de%20Alto%20Rendimiento.", en: "https://wa.me/595993282213?text=Hello%20Olga%20Ihara.%20I%20am%20contacting%20you%20from%20the%20Corporate%20Services%20section.", pt: "https://wa.me/595993282213", jp: "https://wa.me/595993282213", de: "https://wa.me/595993282213", zh: "https://wa.me/595993282213", ar: "https://wa.me/595993282213" },
      modalTitle: { es: "Sourcing Estratégico de Agronegocios y Commodities", en: "Strategic Sourcing of Agribusiness and Commodities", pt: "Sourcing Estratégico de Agronegócios e Commodities", jp: "アグリビジネスと商品の戦略的ソーシング", de: "Strategisches Sourcing von Agrarwirtschaft und Rohstoffen", zh: "农业与大宗商品的战略采购", ar: "التوريد الاستراتيجي للأعمال الزراعية والسلع" },
      modalDesc: { es: "Paraguay se consolida hoy como uno de los hubs agroexportadores más rentables y eficientes a nivel global. A través de nuestra firma, proveemos a su corporación acceso directo y sin intermediarios especulativos a productores y acopiadores de gran escala.", en: "Today, Paraguay stands out as one of the most profitable and efficient global agro-export hubs. Through our firm, we provide your corporation direct access, free from speculative intermediaries, to large-scale producers and aggregators.", pt: "Hoje, o Paraguai se consolida como um dos hubs agroexportadores mais rentáveis e eficientes a nível global. Através de nossa firma, oferecemos à sua corporação acesso direto, sem intermediários especulativos, a produtores e armazenadores de grande escala.", jp: "今日、パラグアイは世界で最も収益性が高く効率的な農業輸出ハブの1つとして確固たる地位を築いています。当ファームを通じて、投機的な仲介者を介さずに、大規模生産者や集荷業者への直接アクセスを貴社に提供します。", de: "Paraguay festigt heute seine Position als eines der rentabelsten und effizientesten Agrarexport-Zentren weltweit. Über unsere Kanzlei verschaffen wir Ihrem Unternehmen direkten Zugang – ohne spekulative Zwischenhändler – zu großen Produzenten und Aufkäufern.", zh: "如今，巴拉圭已巩固其作为全球最盈利、最高效的农产品出口枢纽之一的地位。通过我们的公司，我们为您的企业提供直接进入大型生产商和集货商的渠道，无需任何投机性中介。", ar: "تبرز باراغواي اليوم كواحدة من أكثر مراكز التصدير الزراعي ربحية وكفاءة على مستوى العالم. من خلال شركتنا، نوفر لشركتك وصولاً مباشراً، دون وسطاء مضاربين، إلى كبار المنتجين والمجمعين." },
      img: "https://storage.googleapis.com/www.iharaoutsourcing.com/imagenes/Agronegocios%20y%20Commodities%20de%20Alto%20Rendimiento.webp",
      subItems: [
        {
          title: { es: "Nuestra Cartera Auditada", en: "Our Audited Portfolio", pt: "Nosso Portfólio Auditado", jp: "監査済みポートフォリオ", de: "Unser geprüftes Portfolio", zh: "我们审计后的产品组合", ar: "محفظتنا المدققة" },
          desc: { es: "Gestionamos el enlace comercial para la adquisición de grandes volúmenes de soja (incluyendo derivados de alta demanda como pellets y aceite crudo), maíz zafriña, trigo, arroz irrigado, y superalimentos de exportación premium como sésamo, lino y chía.", en: "We manage the commercial link for the acquisition of large volumes of soy (including high-demand derivatives such as pellets and crude oil), safrinha corn, wheat, irrigated rice, and premium export superfoods such as sesame, flax, and chia.", pt: "Gerenciamos a ligação comercial para a aquisição de grandes volumes de soja (incluindo derivados de alta demanda como pellets e óleo bruto), milho safrinha, trigo, arroz irrigado e superalimentos premium de exportação como gergelim, linhaça e chia.", jp: "大豆（ペレットや原油などの需要の高い派生物を含む）、サフリーニャ（二期作）トウモロコシ、小麦、灌漑米、およびゴマ、亜麻、チアなどのプレミアム輸出スーパーフードの大量調達のための商業的連携を管理します。", de: "Wir verwalten die kommerzielle Verbindung für den Erwerb großer Mengen Soja (einschließlich stark gefragter Derivate wie Pellets und Rohöl), Safrinha-Mais, Weizen, Bewässerungsreis sowie Premium-Export-Superfoods wie Sesam, Flachs und Chia.", zh: "我们管理大宗采购的商业链接，包括大豆（及其高需求衍生品，如颗粒和原油）、二季玉米、小麦、灌溉水稻，以及芝麻、亚麻和奇亚等优质出口超级食品。", ar: "ندير الرابط التجاري للحصول على كميات كبيرة من فول الصويا (بما في ذلك المشتقات عالية الطلب مثل الكريات والزيت الخام) وذرة السفرينيا والقمح والأرز المروي والأطعمة الفائقة الممتازة المعدة للتصدير مثل السمسم والكتان والشيا." },
          icon: "FileCheck"
        },
        {
          title: { es: "Garantía de Suministro", en: "Supply Guarantee", pt: "Garantia de Fornecimento", jp: "供給保証", de: "Liefergarantie", zh: "供应保证", ar: "ضمان الإمداد" },
          desc: { es: "Nuestra auditoría técnica y legal garantiza la trazabilidad total del producto desde el campo hasta la logística portuaria. Verificamos el cumplimiento estricto de las certificaciones fitosanitarias (SENAVE), normativas de sustentabilidad internacional y la solvencia financiera del proveedor para soportar contratos Forward y operaciones Spot de alto tonelaje.", en: "Our technical and legal audit guarantees full product traceability from the field to port logistics. We verify strict compliance with phytosanitary certifications (SENAVE), international sustainability regulations, and the financial solvency of the supplier to support high-tonnage Forward contracts and Spot operations.", pt: "Nossa auditoria técnica e legal garante total rastreabilidade do produto desde o campo até a logística portuária. Verificamos o cumprimento estrito das certificações fitossanitárias (SENAVE), regulamentações internacionais de sustentabilidade e a solvência financeira do fornecedor para apoiar contratos Forward e operações Spot de alta tonelagem.", jp: "当社の技術的および法的監査により、農場から港湾物流に至るまでの完全な製品トレーサビリティが保証されます。植物検疫認証（SENAVE）、国際的な持続可能性規制、および大量のフォワード契約やスポット取引をサポートするサプライヤーの財務的支払い能力の厳密な順守を検証します。", de: "Unsere technische und rechtliche Prüfung garantiert die lückenlose Rückverfolgbarkeit der Produkte vom Feld bis zur Hafenlogistik. Wir überprüfen die strikte Einhaltung pflanzengesundheitlicher Zertifizierungen (SENAVE), internationaler Nachhaltigkeitsvorschriften sowie die finanzielle Solvenz des Lieferanten zur Absicherung von Forward-Verträgen und Spot-Transaktionen mit hoher Tonnage.", zh: "我们的技术和法律审计保证产品从田间到港口物流的完全可追溯性。我们核实并确保严格遵守植物检疫认证（SENAVE）、国际可持续发展规范，以及供应商的财务偿付能力，以支持大吨位的远期合约和现货业务。", ar: "تضمن مراجعتنا الفنية والقانونية إمكانية التتبع الكامل للمنتج من الحقل إلى اللوجستيات في الميناء. نحن نتحقق من الامتثال الصارم لشهادات الصحة النباتية (SENAVE)، ولوائح الاستدامة الدولية، والملاءة المالية للمورد لدعم العقود الآجلة وعمليات التسليم الفوري ذات الحمولات العالية." },
          icon: "ShieldCheck"
        },
        {
          title: { es: "Estructuración Legal", en: "Legal Structuring", pt: "Estruturação Legal", jp: "法的構造化", de: "Rechtliche Strukturierung", zh: "法律架构", ar: "الهيكلة القانونية" },
          desc: { es: "Nos encargamos de la arquitectura de los contratos de compraventa internacional y los términos INCOTERMS, blindando su inversión contra fluctuaciones irregulares o incumplimientos de entrega.", en: "We handle the architecture of international sales contracts and INCOTERMS, safeguarding your investment against irregular fluctuations or delivery defaults.", pt: "Cuidamos da arquitetura dos contratos de compra e venda internacionais e dos INCOTERMS, protegendo seu investimento contra flutuações irregulares ou inadimplências de entrega.", jp: "国際売買契約の構造とインコタームズ条件を担当し、不規則な価格変動や納入不履行から投資を保護します。", de: "Wir übernehmen die Architektur der internationalen Kaufverträge und der INCOTERMS, um Ihre Investitionen gegen unregelmäßige Preisschwankungen oder Lieferausfälle abzusichern.", zh: "我们负责国际购销合同的架构和INCOTERMS（国际贸易术语），保护您的投资免受不规则波动或违约交货的影响。", ar: "نتولى تصميم عقود البيع الدولية وشروط 'إنكوترمز'، لحماية استثمارك من التقلبات غير المنتظمة أو الفشل في التسليم." },
          icon: "Scale"
        }
      ]
    },
    {
      label: { es: "02 // Mercado Global", en: "02 // Global Market", pt: "02 // Mercado Global", jp: "02 // グローバル市場", de: "02 // Globaler Markt", zh: "02 // 全球市场", ar: "02 // السوق العالمية" },
      title: { es: "Industria Cárnica: Proteína Premium de Exportación", en: "Meat Industry: Premium Export Protein", pt: "Indústria Cárnea: Proteína Premium de Exportação", jp: "食肉産業：プレミアム輸出プロテイン", de: "Fleischindustrie: Premium-Exportproteine", zh: "肉类行业：优质出口蛋白", ar: "صناعة اللحوم: بروتين التصدير الممتاز" },
      desc: { es: "Facilitamos la apertura y consolidación operativa en mercados internacionales exigentes. Aseguramos trazabilidad estricta y cumplimiento total con normativas FDA, OIE y directivas sanitarias de la Unión Europea y Asia.", en: "We facilitate operational opening and consolidation in demanding international markets. We ensure strict traceability and full compliance with FDA, OIE regulations, and sanitary directives of the European Union and Asia.", pt: "Facilitamos a abertura e consolidação operacional em mercados internacionais exigentes. Asseguramos rastreabilidade estrita e cumprimento total com as normativas da FDA, OIE e diretrizes sanitárias da União Europeia e da Ásia.", jp: "厳しい国際市場における事業の立ち上げと統合を促進します。強力なトレーサビリティと、FDA、OIE規制、および欧州連合とアジアの衛生指令の完全な順守を確保します。", de: "Wir erleichtern die operative Eröffnung und Konsolidierung auf anspruchsvollen internationalen Märkten. Wir garantieren strenge Rückverfolgbarkeit und vollständige Einhaltung von FDA-, OIE-Vorschriften sowie der Gesundheitsrichtlinien der Europäischen Union und Asiens.", zh: "我们促进在要求严格的国际市场的业务开拓和巩固。我们确保严格的可追溯性，并完全遵守FDA、OIE法规以及欧盟和亚洲的卫生指令。", ar: "نسهل الافتتاح والتوحيد التشغيلي في الأسواق الدولية المتطلبة. نضمن التتبع الدقيق والامتثال الكامل للوائح إدارة الغذاء والدواء (FDA) والمنظمة العالمية لصحة الحيوان (OIE) والتوجيهات الصحية للاتحاد الأوروبي وآسيا." },
      readMore: { es: "Leer más...", en: "Read more...", pt: "Leia mais...", jp: "続きを読む...", de: "Weiterlesen...", zh: "阅读更多...", ar: "اقرأ المزيد..." },
      cta: { es: "Solicitar Portafolio", en: "Request Portfolio", pt: "Solicitar Portfólio", jp: "ポートフォリオをリクエストする", de: "Portfolio anfordern", zh: "申请作品集", ar: "طلب الحافظة" },
      ctaLink: { es: "https://wa.me/595993282213?text=Hola%20Lic.%20Olga%20Ihara.%20Me%20contacto%20desde%20la%20secci%C3%B3n%20de%20Servicios%20Corporativos.%20Me%20gustar%C3%ADa%20solicitar%20el%20portafolio%20sobre%20Brokerage%20C%C3%A1rnico%20y%20Cumplimiento%20Sanitario%20Internacional.", en: "https://wa.me/595993282213?text=Hello%20Olga.", pt: "https://wa.me/595993282213", jp: "https://wa.me/595993282213", de: "https://wa.me/595993282213", zh: "https://wa.me/595993282213", ar: "https://wa.me/595993282213" },
      modalTitle: { es: "Brokerage Cárnico y Cumplimiento Sanitario Internacional", en: "Meat Brokerage and International Sanitary Compliance", pt: "Corretagem Cárnea e Cumprimento Sanitário Internacional", jp: "食肉仲介業務と国際的衛生コンプライアンス", de: "Fleisch-Brokerage und internationale Hygienekonformität", zh: "肉类中介与国际卫生规范合规", ar: "وساطة اللحوم والامتثال الصحي الدولي" },
      modalDesc: { es: "La proteína roja paraguaya compite en los mercados globales más exigentes por su inigualable relación calidad-precio y su producción basada en pasturas naturales. Conectamos su cadena de suministro exclusivamente con las plantas frigoríficas de máxima calificación y capacidad de faena del país.", en: "Paraguayan red protein competes in the most demanding global markets due to its unmatched quality-price ratio and pasture-based production. We connect your supply chain exclusively with top-rated meatpacking plants possessing the highest slaughter capacity in the country.", pt: "A proteína vermelha paraguaia compete nos mercados globais mais exigentes devido à sua inigualável relação qualidade-preço e sua produção baseada em pastagens naturais. Conectamos sua cadeia de suprimentos exclusivamente com as plantas frigoríficas de classificação máxima e capacidade de abate do país.", jp: "パラグアイの赤身タンパク質は、比類のない費用対効果と自然放牧による生産により、世界で最も厳しい市場で競争力を持っています。当社は、国内最高評価と最大処理能力を持つ食肉加工工場と貴社のサプライチェーンを独占的に結びつけます。", de: "Paraguayisches rotes Protein ist aufgrund seines unschlagbaren Preis-Leistungs-Verhältnisses und seiner Weidehaltungsproduktion auf den anspruchsvollsten globalen Märkten wettbewerbsfähig. Wir verbinden Ihre Lieferkette exklusiv mit den erstklassigen Fleischverarbeitungsbetrieben des Landes, die über die höchsten Schlachtkapazitäten verfügen.", zh: "由于无与伦比的性价比和以自然牧场为基础的生产系统，巴拉圭红肉蛋白在最严格的全球市场中具有很强的竞争力。我们将您的供应链专门与国内评级最高、屠宰能力最强的肉联厂连接起来。", ar: "تتنافس البروتينات الحمراء من باراغواي في الأسواق العالمية الأكثر تطلباً بسبب نسبة الجودة إلى السعر التي لا تضاهى وإنتاجها القائم على المراعي الطبيعية. نربط سلسلة التوريد الخاصة بك حصريًا بمصانع تعبئة اللحوم ذات التصنيف الأعلى والقدرة الأكبر على الذبح في البلاد." },
      img: "https://storage.googleapis.com/www.iharaoutsourcing.com/imagenes/Industria%20C%C3%A1rnica%3A%20Prote%C3%ADna%20Premium%20de%20Exportaci%C3%B3n.webp",
      subItems: [
        {
          title: { es: "Cortes y Especificaciones", en: "Cuts and Specifications", pt: "Cortes e Especificações", jp: "部位と仕様", de: "Schnitte und Spezifikationen", zh: "切割与规格", ar: "القطع والمواصفات" },
          desc: { es: "Facilitamos el acceso asegurado a cortes bovinos premium (Ojo de Bife, Lomito, Cuadril), carne industrial para procesamiento (Trimming), y menudencias, adaptándonos a los requerimientos de empaquetado y maduración de su mercado.", en: "We facilitate secured access to premium beef cuts (Ribeye, Tenderloin, Rump), industrial meat for processing (Trimming), and offal, adapting to the packaging and maturation requirements of your market.", pt: "Facilitamos o acesso garantido a cortes bovinos premium (Ojo de Bife, Mignon, Alcatra), carne industrial para processamento (Trimming) e miudezas, adaptando-nos aos requisitos de embalagem e maturação do seu mercado.", jp: "プレミアム牛肉カット（リブアイ、テンダーロイン、ランプ）、加工用工業肉（トリミング）、および内臓への安全なアクセスを促進し、貴社市場の包装および熟成要件に適応します。", de: "Wir ermöglichen den gesicherten Zugang zu Premium-Rindfleischstücken (Ribeye, Filet, Hüfte), Industriefleisch für die Verarbeitung (Trimming) und Innereien und passen uns den Verpackungs- und Reifekanforderungen Ihres Marktes an.", zh: "我们为您提供优质牛肉块（肉眼、里脊肉、臀肉）、加工用工业肉（修边肉）以及内脏等的受保障渠道，且能适应您市场的包装和熟化要求。", ar: "نحن نسهل الوصول المضمون إلى قطع اللحم البقري الممتازة (ريب آي، تندرلوين، رامب)، واللحوم الصناعية للمعالجة (تريمنغ)، ومخلفاتها، مع التكيف مع متطلبات التعبئة والتغليف والنضج لسوقك." },
          icon: "Package"
        },
        {
          title: { es: "Certificaciones y Trazabilidad", en: "Certifications and Traceability", pt: "Certificações e Rastreabilidade", jp: "認証とトレーサビリティ", de: "Zertifizierungen und Rückverfolgbarkeit", zh: "认证与可追溯性", ar: "الشهادات والتتبع" },
          desc: { es: "Filtramos a los proveedores que cumplen rigurosamente con el Sistema de Trazabilidad del Paraguay (SITRAP), normativas del SENACSA, certificaciones de bienestar animal, y requerimientos específicos como el Rito Halal o normativas de la Unión Europea.", en: "We filter suppliers who strictly comply with the Traceability System of Paraguay (SITRAP), SENACSA regulations, animal welfare certifications, and specific requirements such as Halal Rite or European Union regulations.", pt: "Filtramos fornecedores que cumprem rigorosamente com o Sistema de Rastreabilidade do Paraguai (SITRAP), normativas do SENACSA, certificações de bem-estar animal e exigências específicas como o Rito Halal ou normas da União Europeia.", jp: "パラグアイ・トレーサビリティ・システム（SITRAP）、SENACSA規制、動物福祉認証、およびハラール儀式や欧州連合規制などの特定の要件を厳密に順守するサプライヤーを選別します。", de: "Wir filtern Lieferanten heraus, die das Rückverfolgbarkeitssystem von Paraguay (SITRAP), die SENACSA-Vorschriften, Tierschutzzertifikate sowie spezifische Anforderungen wie den Halal-Ritus oder Vorschriften der Europäischen Union strikt einhalten.", zh: "我们筛选严格遵守巴拉圭追溯系统（SITRAP）、国家动物健康和质量服务机构（SENACSA）规定、动物福利认证以及诸如清真寺仪式或欧盟法规等特定要求的供应商。", ar: "نقوم بتصفية الموردين الذين يمتثلون بدقة لنظام التتبع في باراغواي (SITRAP)، ولوائح SENACSA، وشهادات رعاية الحيوان، والمتطلبات الخاصة مثل الطقوس الحلال أو لوائح الاتحاد الأوروبي." },
          icon: "ShieldCheck"
        },
        {
          title: { es: "Gestión de Cuotas", en: "Quota Management", pt: "Gestão de Cotas", jp: "クオータ（割当）管理", de: "Quotenmanagement", zh: "配额管理", ar: "إدارة الحصص" },
          desc: { es: "Asesoramos en la consolidación de cuotas de exportación y supervisamos el cumplimiento de los protocolos de cadena de frío y logística terrestre/fluvial para asegurar que el producto mantenga su grado premium al llegar a destino.", en: "We advise on the consolidation of export quotas and oversee compliance with cold chain protocols and land/river logistics to ensure that the product maintains its premium grade upon arrival at the destination.", pt: "Aconselhamos na consolidação de cotas de exportação e supervisionamos o cumprimento dos protocolos de cadeia de frio e logística terrestre/fluvial para assegurar que o produto mantenha seu grau premium ao chegar no destino.", jp: "輸出割当の統合に関するアドバイスを行い、コールドチェーンプロトコルおよび陸船物流の順守を監督して、製品が目的地到着時にプレミアムグレードを維持できるようにします。", de: "Wir beraten bei der Konsolidierung von Exportquoten und überwachen die Einhaltung von Kühlkettenprotokollen sowie Land- und Flusslogistik, um sicherzustellen, dass das Produkt bei der Ankunft am Bestimmungsort seine Premium-Qualität beibehält.", zh: "我们就出口配额整合提供咨询，并监督冷链协议和陆运/河流物流的执行情况，以确保产品到达目的地时保持优质等级。", ar: "نقدم المشورة بشأن توطيد حصص التصدير ونشرف على الامتثال لبروتوكولات سلسلة التبريد والخدمات اللوجستية البرية / النهرية لضمان احتفاظ المنتج بدرجته الاستثنائية عند وصوله إلى الوجهة." },
          icon: "PieChart"
        }
      ]
    },
    {
      label: { es: "03 // Innovación y Desarrollo", en: "03 // Innovation and Development", pt: "03 // Inovação e Desenvolvimento", jp: "03 // イノベーションと開発", de: "03 // Innovation und Entwicklung", zh: "03 // 创新与发展", ar: "03 // الابتكار والتطوير" },
      title: { es: "Transferencia Tecnológica e Ingeniería Aplicada", en: "Technology Transfer and Applied Engineering", pt: "Transferência Tecnológica e Engenharia Aplicada", jp: "技術移転と応用エンジニアリング", de: "Technologietransfer und angewandte Ingenieurwissenschaften", zh: "技术转让与应用工程", ar: "نقل التكنولوجيا والهندسة التطبيقية" },
      desc: { es: "Aceleramos la modernización industrial a través de la integración de tecnología de punta. Optimizamos procesos productivos con metodologías orientadas a la eficiencia operativa, automatización y competitividad estructural.", en: "We accelerate industrial modernization through the integration of cutting-edge technology. We optimize production processes with methodologies aimed at operational efficiency, automation, and structural competitiveness.", pt: "Aceleramos a modernização industrial através da integração de tecnologias de ponta. Otimizamos processos de produção com metodologias voltadas para eficiência operacional, automação e competitividade estrutural.", jp: "最先端技術の統合を通じて産業近代化を加速させます。運用効率、自動化、構造的競争力に向けた方法論で生産プロセスを最適化します。", de: "Wir beschleunigen die industrielle Modernisierung durch die Integration modernster Technologie. Wir optimieren Produktionsprozesse mit Methoden, die auf betriebliche Effizienz, Automatisierung und strukturelle Wettbewerbsfähigkeit abzielen.", zh: "我们通过整合尖端技术加速工业的现代化。我们以旨在提高运营效率、自动化和结构竞争力的系统方法来优化生产流程。", ar: "نقوم بتسريع التحديث الصناعي من خلال دمج التكنولوجيا المتطورة. ونعمل على تحسين عمليات الإنتاج باستخدام منهجيات تهدف إلى الكفاءة التشغيلية والأتمتة والقدرة التنافسية الهيكلية." },
      readMore: { es: "Leer más...", en: "Read more...", pt: "Leia mais...", jp: "続きを読む...", de: "Weiterlesen...", zh: "阅读更多...", ar: "اقرأ المزيد..." },
      cta: { es: "Contactar Especialista", en: "Contact Specialist", pt: "Contatar Especialista", jp: "専門家に連絡する", de: "Spezialist kontaktieren", zh: "联系专家", ar: "اتصل بأخصائي" },
      ctaLink: { es: "https://wa.me/595993282213?text=Hola%20Lic.%20Olga%20Ihara.%20Me%20contacto%20desde%20la%20secci%C3%B3n%20de%20Servicios%20Corporativos.%20Me%20gustar%C3%ADa%20contactar%20a%20un%20especialista%20en%20Transferencia%20Tecnol%C3%B3gica%20e%20Ingenier%C3%ADa%20Aplicada.", en: "https://wa.me/595993282213", pt: "https://wa.me/595993282213", jp: "https://wa.me/595993282213", de: "https://wa.me/595993282213", zh: "https://wa.me/595993282213", ar: "https://wa.me/595993282213" },
      modalTitle: { es: "Captación de Propiedad Intelectual y Desarrollos de Vanguardia", en: "Acquisition of Intellectual Property and Cutting-edge Developments", pt: "Captação de Propriedade Intelectual e Desenvolvimentos de Vanguarda", jp: "知的財産と最先端開発の取得", de: "Erwerb von geistigem Eigentum und bahnbrechende Entwicklungen", zh: "知识产权获取与前沿发展", ar: "الاستحواذ على الملكية الفكرية والتطورات المتطورة" },
      modalDesc: { es: "El ecosistema de innovación en Paraguay está generando soluciones de ingeniería altamente rentables listas para ser escaladas. Actuamos como su puente corporativo hacia desarrolladores de vanguardia, startups de base científico-tecnológica y laboratorios independientes.", en: "Paraguay's innovation ecosystem is generating highly profitable engineering solutions ready to be scaled. We act as your corporate bridge to cutting-edge developers, science-and-technology startups, and independent laboratories.", pt: "O ecossistema de inovação no Paraguai está gerando soluções de engenharia altamente rentáveis, prontas para serem escaladas. Atuamos como sua ponte corporativa para desenvolvedores de ponta, startups de base científico-tecnológica e laboratórios independentes.", jp: "パラグアイのイノベーション・エコシステムは、拡張の準備が整った非常に収益性の高いエンジニアリングソリューションを生み出しています。当社は、最先端の開発者、科学技術の新興企業、独立した研究所への貴社の企業間架け橋として機能します。", de: "Das Innovationsökosystem in Paraguay bringt hochprofitable Ingenieurlösungen hervor, die zur Skalierung bereit sind. Wir fungieren als Ihre Unternehmensbrücke zu Spitzenentwicklern, technologisch-wissenschaftlichen Start-ups und unabhängigen Labors.", zh: "巴拉圭的创新生态系统正在产生能够规模化的高利润工程解决方案。我们作为您的企业桥梁，连接前沿开发者、基于科技的创业公司和独立实验室。", ar: "يولد بيئة الابتكار في باراغواي حلولاً هندسية عالية الربحية جاهزة للتوسيع. نحن نعمل كجسر للشركات الخاصة بك للوصول إلى المطورين المتطورين والشركات الناشئة القائمة على العلم والتكنولوجيا، والمختبرات المستقلة." },
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
      subItems: [
        {
          title: { es: "Sectores de Enfoque", en: "Focus Sectors", pt: "Setores de Foco", jp: "重点セクター", de: "Fokus-Sektoren", zh: "重点领域", ar: "القطاعات الرئيسية" },
          desc: { es: "Identificamos y evaluamos oportunidades de adquisición, licenciamiento o co-desarrollo de tecnologías en nichos industriales críticos: software de control automotriz, componentes innovadores para movilidad eléctrica (EVs), sistemas embebidos, automatización industrial y electrónica de potencia.", en: "We identify and evaluate opportunities for acquiring, licensing, or co-developing technologies in critical industrial niches: automotive control software, innovative components for electric mobility (EVs), embedded systems, industrial automation, and power electronics.", pt: "Identificamos e avaliamos oportunidades para a aquisição, licenciamento ou co-desenvolvimento de tecnologias em nichos industriais críticos: software de controle automotivo, componentes inovadores para mobilidade elétrica (EVs), sistemas embarcados, automação industrial e eletrônica de potência.", jp: "重要な産業分野における技術の取得、ライセンス供与、または共同開発の機会を特定および評価します。具体的には、自動車制御ソフトウェア、電気モビリティ（EV）向けの革新的な特許、組み込みシステム、産業オートメーションなどです。", de: "Wir identifizieren und bewerten Möglichkeiten für den Erwerb, die Lizenzierung oder die gemeinsame Entwicklung von Technologien in kritischen industriellen Nischen: KFZ-Steuerungssoftware, innovative Komponenten für Elektromobilität (EVs), Embedded-Systeme, industrielle Automatisierung und Leistungselektronik.", zh: "我们识别并评估在关键工业细分领域获取、许可或共同开发技术的机会：如汽车控制软件、用于电动交通（EV）的创新组件、嵌入式系统、工业自动化以及电力电子。", ar: "نحدد ونقيّم فرص الاستحواذ على التقنيات أو ترخيصها أو التطوير المشترك فيها ضمن مجالات صناعية مهمة: برامج التحكم في السيارات، ومكونات مبتكرة للتنقل الكهربائي، والأنظمة المدمجة، والأتمتة الصناعية." },
          icon: "Target"
        },
        {
          title: { es: "Seguridad Legal-Tech", en: "Legal-Tech Security", pt: "Segurança Legal-Tech", jp: "リーガルテック・セキュリティ", de: "Legal-Tech Sicherheit", zh: "法务科技安全", ar: "أمن التكنولوجيا القانونية" },
          desc: { es: "Nuestro profundo expertise en estructuración corporativa nos permite ejecutar auditorías de código, gestionar Acuerdos de Confidencialidad (NDA) blindados, tramitar registros de Propiedad Intelectual y Patentes, y diseñar la arquitectura legal para Joint Ventures o rondas de inversión, garantizando que su capital y los activos intangibles estén jurídicamente protegidos.", en: "Our deep expertise in corporate structuring allows us to execute code audits, manage bullet-proof Non-Disclosure Agreements (NDAs), handle Intellectual Property and Patent registrations, and design the legal architecture for Joint Ventures or investment rounds, ensuring your capital and intangible assets are legally protected.", pt: "Nossa profunda especialização em estruturação corporativa nos permite executar auditorias de código, gerenciar Acordos de Não Divulgação (NDAs) blindados, lidar com registros de Propriedade Intelectual e Patentes, e desenhar a arquitetura legal de Joint Ventures ou rodadas de investimentos, assegurando que seu capital e ativos intangíveis estejam juridicamente protegidos.", jp: "当社のコーポレートストラクチャリングに関する深い専門知識により、コード監査の実行、強固な秘密保持契約（NDA）の管理、知的財産および特許登録の処理が可能になり、資金と無形資産が法的に保護されることを保証します。", de: "Kombiniert mit unserer tiefgreifenden Expertise in der Unternehmensstrukturierung führen wir Code-Audits durch, verwalten sichere Vertraulichkeitsvereinbarungen (NDAs), bearbeiten Anmeldungen für geistiges Eigentum und Patente und konzipieren die rechtliche Architektur für Joint Ventures.", zh: "我们在企业架构方面的深厚专业知识使我们能够执行代码审计、管理严密的保密协议（NDA）、处理知识产权和专利注册，并为合资企业或投资轮次设计法律架构，确保您的资本和无形资产受到法律的保护。", ar: "تتيح لنا خبرتنا العميقة في الهيكلة الشركاتية إجراء مراجعات الأكواد، وإدارة اتفاقيات عدم الإفصاح (NDA) المحكمة، والتعامل مع تسجيلات الملكية الفكرية وبراءات الاختراع، وتصميم البنية القانونية للمشاريع المشتركة أو جولات الاستثمار." },
          icon: "Lock"
        }
      ]
    },
    {
      label: { es: "04 // Expansión y OPEX", en: "04 // Expansion and OPEX", pt: "04 // Expansão e OPEX", jp: "04 // 拡張とOPEX", de: "04 // Expansion und OPEX", zh: "04 // 扩张与OPEX", ar: "04 // التوسع والمصروفات التشغيلية (OPEX)" },
      title: { es: "Hub de Manufactura y Régimen de Maquila", en: "Manufacturing Hub and Maquila Regime", pt: "Hub de Manufatura e Regime de Maquila", jp: "製造ハブとマキラ体制", de: "Produktionsstandort und Maquila-Regime", zh: "制造枢纽与加工出口区制度 (Maquila)", ar: "مركز التصنيع ونظام 'ماكيلا'" },
      desc: { es: "Reduzca drásticamente los costos operativos (OPEX) de su corporación trasladando o subcontratando sus procesos industriales en Paraguay. Facilitamos el matchmaking corporativo con plantas industriales preparadas para operar bajo el exitoso Régimen de Maquila.", en: "Drastically reduce your corporation's operational costs (OPEX) by relocating or subcontracting your industrial processes in Paraguay. We facilitate corporate matchmaking with industrial plants prepared to operate under the successful Maquila Regime.", pt: "Reduza drasticamente os custos operacionais (OPEX) de sua corporação transferindo ou subcontratando seus processos industriais no Paraguai. Facilitamos o matchmaking corporativo com fábricas industriais preparadas para operar sob o bem sucedido Regime de Maquila.", jp: "産業プロセスをパラグアイに移転するか下請けに出すことで、企業運営コスト（OPEX）を大幅に削減します。当ファームは、成功しているマキラ（Maquila）体制のもとで運営準備が整った産業プラントとの企業間マッチングを促進します。", de: "Reduzieren Sie die Betriebskosten (OPEX) Ihres Unternehmens drastisch, indem Sie Ihre industriellen Prozesse nach Paraguay verlagern oder als Subunternehmer vergeben. Wir erleichtern die unternehmensübergreifende Partnervermittlung mit Industrieanlagen, die auf das Maquila-Regime vorbereitet sind.", zh: "通过将您的工业流程转移或外包到巴拉圭，大幅降低您公司的运营成本（OPEX）。我们将促进企业与准备在成功的Maquila体制下运营的工业厂房进行对接。", ar: "قلل بشكل جذري التكاليف التشغيلية (OPEX) لمؤسستك عن طريق نقل أو تعهيد عملياتك الصناعية في باراغواي. نسهل مطابقة الشركات مع المصانع الصناعية المعدة للعمل في ظل نظام 'ماكيلا' الناجح." },
      readMore: { es: "Leer más...", en: "Read more...", pt: "Leia mais...", jp: "続きを読む...", de: "Weiterlesen...", zh: "阅读更多...", ar: "اقرأ المزيد..." },
      cta: { es: "Iniciar Radicación", en: "Start Settlement", pt: "Iniciar Radicação", jp: "入植を開始する", de: "Niederlassung starten", zh: "开始办理入驻", ar: "بدء التأسيس" },
      ctaLink: { es: "https://wa.me/595993282213?text=Hola%20Lic.%20Olga%20Ihara.%20Me%20contacto%20desde%20la%20secci%C3%B3n%20de%20Servicios%20Corporativos.%20Me%20gustar%C3%ADa%20iniciar%20el%20esquema%20de%20radicaci%C3%B3n%20para%20Hub%20de%20Manufactura%20y%20R%C3%A9gimen%20de%20Maquila.", en: "https://wa.me/595993282213", pt: "https://wa.me/595993282213", jp: "https://wa.me/595993282213", de: "https://wa.me/595993282213", zh: "https://wa.me/595993282213", ar: "https://wa.me/595993282213" },
      modalTitle: { es: "Optimización OPEX mediante el Régimen de Maquila", en: "OPEX Optimization via the Maquila Regime", pt: "Otimização OPEX via Regime de Maquila", jp: "マキラ制度によるOPEXの最適化", de: "OPEX-Optimierung durch das Maquila-System", zh: "通过加工制度优化资本支出", ar: "تحسين OPEX من خلال نظام الماكويلا" },
      modalDesc: { es: "Reduzca drásticamente los costos operativos (OPEX) de su corporación trasladando o subcontratando sus procesos industriales en Paraguay. Facilitamos el matchmaking corporativo con plantas industriales preparadas para operar bajo el exitoso Régimen de Maquila, una de las ventajas fiscales más agresivas de la región.", en: "Drastically reduce your corporation's operational costs (OPEX) by relocating or subcontracting your industrial processes in Paraguay. We facilitate corporate matchmaking with industrial plants prepared to operate under the successful Maquila Regime, one of the most aggressive tax advantages in the region.", pt: "Reduza drasticamente os custos operacionais (OPEX) de sua corporação transferindo ou subcontratando seus processos industriais no Paraguai. Facilitamos o matchmaking corporativo com plantas industriais preparadas para operar pelo bem sucedido Regime de Maquila, uma das vantagens fiscais mais agressivas da região.", jp: "産業プロセスをパラグアイに移行または下請けに出すことにより、企業の運用コスト（OPEX）を大幅に削減します。この地域で最も攻撃的な税の利点の1つである、成功したマキラ体制の下で機能する産業プラントとの企業間マッチングを促進します。", de: "Reduzieren Sie die Betriebskosten (OPEX) Ihres Unternehmens drastisch, indem Sie Industrieabläufe nach Paraguay verlegen oder weitergeben. Wir ermöglichen das Corporate Matchmaking mit Industrieanlagen, die unter dem erfolgreichen Maquila-System agieren – einem der aggressivsten steuerlichen Vorteile in der Region.", zh: "通过将在巴拉圭转移或外包您的工业流程来大幅降低企业的运维成本（OPEX）。我们为准备按成功的加工制度运行的工业企业促进对接，该制度是该地区最有吸引力的税收优势之一。", ar: "قم بتخفيض التكاليف التشغيلية (OPEX) لشركتك إلى حد كبير عبر نقل أو تعهيد عملياتك الصناعية لباراغواي. نحن نسهل إجراء المعاملات التجارية للعمليات الصناعية التي ترغب للعمل بموجب نظام الماكويلا، الذي يعد من أقوى المزايا الضريبية في المنطقة." },
      img: "https://storage.googleapis.com/www.iharaoutsourcing.com/imagenes/Hub%20de%20Manufactura%20y%20R%C3%A9gimen%20de%20Maquila.webp",
      subItems: [
        {
          title: { es: "El Beneficio Fiscal", en: "The Tax Benefit", pt: "O Benefício Fiscal", jp: "税制上の優遇措置", de: "Der Steuervorteil", zh: "税收优惠", ar: "الاستفادة الضريبية" },
          desc: { es: "Le ayudamos a estructurar sus operaciones para importar materias primas, maquinarias e insumos con arancel cero, y exportar el producto terminado tributando un impuesto único del 1% sobre el valor agregado en territorio paraguayo.", en: "We help you structure your operations to import raw materials, machinery, and supplies with zero tariffs, and export the finished product paying a single tax of 1% on the value added in Paraguayan territory.", pt: "Ajudamos você a estruturar suas operações para importar matérias-primas, maquinários e insumos com alíquota zero, e exportar o produto final pagando um imposto único de 1% sobre o valor agregado no território paraguaio.", jp: "原材料、機械、物資を関税ゼロで輸入し、パラグアイ国内での付加価値に対して1％の単一税を支払って完成品を輸出するための運用構造の構築を支援します。", de: "Wir helfen Ihnen bei der Strukturierung Ihrer Betriebe, um Rohstoffe, Maschinen und Vorleistungen zollfrei zu importieren und das Endprodukt nach Zahlung einer einmaligen Steuer von 1 % auf die Wertschöpfung in Paraguay zu exportieren.", zh: "我们帮助您构建业务架构，以零关税进口原材料、机械和用品，并按巴拉圭境内增加值的1%的单一税收出口成品。", ar: "نساعدكم في تخطيط عملياتكم لاستيراد المواد الخام والآلات والإمدادات من دون تعرفة جمركية، وتصدير المنتج النهائي بتطبيق ضريبة واحدة بقيمة 1٪ على القيمة المضافة في الأراضي في باراغواي." },
          icon: "TrendingDown"
        },
        {
          title: { es: "Sectores Clave", en: "Key Sectors", pt: "Setores Chave", jp: "主要セクター", de: "Schlüsselsektoren", zh: "重点领域", ar: "القطاعات الرئيسية" },
          desc: { es: "Conectamos su empresa con líneas de producción eficientes en ensamblaje de autopartes, manufactura de plásticos industriales, electrónica de consumo y confección textil de alto volumen.", en: "We connect your company with efficient production lines in auto parts assembly, industrial plastics manufacturing, consumer electronics, and high-volume textile confection.", pt: "Conectamos sua empresa a linhas de produção eficientes na montagem de autopeças, fabricação de plásticos industriais, eletrônicos de consumo e confecção têxtil de alto volume.", jp: "自動車部品の組み立て、工業用プラスチック製造、家電、大量生産の繊維業界など、効率的な生産ラインと貴社を結びつけます。", de: "Wir bringen Ihr Unternehmen mit effizienten Produktionslinien in der Montage von Autoteilen, der Fertigung von Industriekunststoffen, Unterhaltungselektronik und großflächiger Textilherstellung zusammen.", zh: "我们将贵公司与汽车零部件的安装、工业塑料制造、消费类电子产品及大批量纺织服装等高效的生产线对接。", ar: "نقوم بربط شركتك بخطوط إنتاج ممتازة لتركيب أجزاء السيارات، وعمليات تصنيع البلاستيك الصناعي، والإلكترونيات الاستهلاكية، وصناعة المنسوجات والأقمشة والملابس بكميات هائلة." },
          icon: "Factory"
        },
        {
          title: { es: "Integración Regional", en: "Regional Integration", pt: "Integração Regional", jp: "地域統合", de: "Regionale Integration", zh: "区域整合", ar: "التكامل الإقليمي" },
          desc: { es: "Diseñamos el vehículo societario y gestionamos el cumplimiento normativo necesario para que su corporación se instale legalmente, obtenga los Certificados de Origen y acceda al bloque del Mercosur libre de aranceles.", en: "We design the corporate vehicle and manage the necessary regulatory compliance so your corporation can establish legally, obtain Certificates of Origin, and access the Mercosur block duty-free.", pt: "Desenhamos o veículo corporativo e gerimos a conformidade regulatória necessária para que a sua corporação se estabeleça legalmente, obtenha Certificados de Origem e aceda ao bloco Mercosul isento de impostos.", jp: "貴社が合法的に設立され、原産地証明書を取得し、免税でメルコスール圏にアクセスできるよう、法人の構築と必要な規制コンプライアンスを管理します。", de: "Wir planen das Unternehmensvehikel und kümmern uns um die nötigen regulatorischen Erfordernisse, damit Ihr Unternehmen rechtmäßig etabliert wird, Ursprungszeugnisse erwerben und zollfreien Zugang zum Mercosur-Gebiet hat.", zh: "我们规划法人实体并处理所有所需的监管法务，使您的公司得到合法建立、取得原产地证书，并且无税收地入市南方共同市场区域。", ar: "نقوم بتصميم الكيان المؤسسي المتكامل وإدارة الامتثال للوائح القانونية ليسمح للشركة أن تبدأ العمل بشكل شرعي، والحصول على شهادات المنشأ والوصول إلى السوق الحرة دون رسوم جمركية في السوق المشتركة في أمريكا اللاتينية." },
          icon: "Globe"
        }
      ]
    }
  ]
  };

  const getT = (obj: any) => obj[lang] || obj['es'];

  return (
    <>
      <section className="py-24 bg-stone-50 overflow-hidden relative">
          <div className="container mx-auto px-6 max-w-7xl">
              
              <header className="text-center mb-24 max-w-4xl mx-auto">
                  <h2 className="text-4xl md:text-5xl font-black text-ihara-dark mb-6 uppercase tracking-tight leading-none">
                      {getT(data.header.title)}
                  </h2>
                  <p className="text-stone-500 text-lg md:text-xl leading-relaxed">
                      {getT(data.header.desc)}
                  </p>
              </header>

              <div className="space-y-32 md:space-y-40">
                  {data.blocks.map((block: any, idx: number) => {
                    const isReverse = idx % 2 !== 0;
                    return (
                        <article key={idx} className={`flex flex-col ${isReverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center group`}>
                            <div className="w-full md:w-3/5 overflow-hidden rounded-2xl shadow-lg relative">
                                <img 
                                    src={block.img} 
                                    alt={getT(block.title)} 
                                    className="w-full h-[350px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105" 
                                />
                            </div>
                            <div className={`w-[92%] md:w-2/5 bg-white p-8 md:p-12 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] relative z-10 -mt-[30px] md:mt-0 ${isReverse ? 'md:-mr-16' : 'md:-ml-16'} mx-auto md:mx-0`}>
                                <span className="text-ihara-red text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-4 block">{getT(block.label)}</span>
                                <h3 className="text-2xl md:text-3xl font-black text-ihara-dark mb-4 leading-tight uppercase tracking-tight">{getT(block.title)}</h3>
                                <p className="text-stone-500 text-base md:text-lg mb-6 leading-relaxed">{getT(block.desc)}</p>
                                <button onClick={() => setOpenModalIndex(idx)} className="text-ihara-red font-bold uppercase text-xs tracking-widest mb-8 hover:text-ihara-dark transition-colors inline-flex items-center gap-2">{getT(block.readMore)}</button>
                                <br/>
                                <a href={getT(block.ctaLink)} target="_blank" rel="noopener noreferrer" className="inline-block bg-ihara-dark text-white px-8 py-4 rounded font-bold text-xs md:text-sm uppercase tracking-widest hover:bg-ihara-red hover:-translate-y-1 shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-auto text-center">{getT(block.cta)}</a>
                            </div>
                        </article>
                    );
                  })}
              </div>
          </div>
      </section>

      {openModalIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center py-10 px-4 sm:p-6 bg-stone-900/80 backdrop-blur-sm shadow-2xl transition-opacity">
          <div className="bg-white rounded-[2rem] shadow-2xl max-w-4xl w-full max-h-full overflow-y-auto relative animate-in fade-in zoom-in-95 duration-300 scrollbar-hide">
            <button 
              onClick={() => setOpenModalIndex(null)}
              className="sticky top-6 float-right mr-6 mt-6 p-3 text-stone-400 hover:text-ihara-dark transition-colors bg-stone-100/80 hover:bg-stone-200 rounded-full z-20 backdrop-blur-md"
            >
              <X size={24} />
            </button>
            <div className="p-8 md:p-16 pt-12 md:pt-16 clear-both">
              <h3 className="text-3xl md:text-4xl font-black text-ihara-dark mb-6 leading-tight tracking-tight uppercase">{getT(data.blocks[openModalIndex].modalTitle)}</h3>
              <p className="text-stone-600 text-lg md:text-xl leading-relaxed mb-12">{getT(data.blocks[openModalIndex].modalDesc)}</p>
              
              <div className="grid gap-6 md:gap-8">
                {data.blocks[openModalIndex].subItems.map((sub: any, subIdx: number) => (
                    <div key={subIdx} className="bg-slate-50 p-8 md:p-10 rounded-[1.5rem]">
                        <div className="flex items-center gap-5 mb-5 block sm:flex">
                            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm text-ihara-red shrink-0 mb-4 sm:mb-0">
                                {iconsData[sub.icon]}
                            </div>
                            <h4 className="font-black text-ihara-dark uppercase tracking-widest text-sm md:text-base">{getT(sub.title)}</h4>
                        </div>
                        <p className="text-stone-600 leading-relaxed md:text-lg sm:pl-16 md:pl-19">{getT(sub.desc)}</p>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
